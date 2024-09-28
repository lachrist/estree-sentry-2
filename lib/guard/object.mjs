import { EstreexTypeError } from "../error.mjs";
import { SPREADABLE_OBJECT_PROPERTY_TYPE_RECORD } from "../index.mjs";
import {
  getBoolean,
  getFalse,
  getObject,
  getObjectArray,
  getRecord,
  getSingleton,
  getTripleton,
} from "../access.mjs";
import { guardExpression, subguardSpreadElement } from "./expression.mjs";
import { guardFunctionExpression } from "./function.mjs";
import { guardPublicKey } from "./key.mjs";
import { joinDeepPath, joinPath } from "../path.mjs";
import { map } from "../util/index.mjs";

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax").ObjectExpression<{}>
 * >}
 */
export const subguardObjectExpression = (node, path, annotate, type, kind) => ({
  type,
  properties: map(
    getObjectArray(node, "properties", kind, path),
    (item, index) =>
      guardSpreadableObjectProperty(
        item,
        joinDeepPath(path, "properties", index),
        annotate,
      ),
  ),
  ...annotate(node, kind, path),
});

/**
 * @type {import("../guard").Guard<
 *   import("../syntax").SpreadableObjectProperty<{}>
 * >}
 */
const guardSpreadableObjectProperty = (node, path, annotate) => {
  const kind = "ObjectProperty";
  const type = getRecord(
    node,
    "type",
    kind,
    path,
    SPREADABLE_OBJECT_PROPERTY_TYPE_RECORD,
  );
  switch (type) {
    case "Property": {
      const computed = getBoolean(node, "computed", kind, path);
      const method = getBoolean(node, "method", kind, path);
      if (method) {
        if (computed) {
          return {
            type,
            computed,
            method,
            shorthand: getFalse(node, "shorthand", kind, path),
            kind: getSingleton(node, "kind", kind, path, "init"),
            key: guardExpression(
              getObject(node, "key", kind, path),
              joinPath(path, "key"),
              annotate,
            ),
            value: guardFunctionExpression(
              getObject(node, "value", kind, path),
              joinPath(path, "value"),
              annotate,
            ),
            ...annotate(node, kind, path),
          };
        } else {
          return {
            type,
            computed,
            method,
            shorthand: getFalse(node, "shorthand", kind, path),
            kind: getSingleton(node, "kind", kind, path, "init"),
            key: guardPublicKey(
              getObject(node, "key", kind, path),
              joinPath(path, "key"),
              annotate,
            ),
            value: guardFunctionExpression(
              getObject(node, "value", kind, path),
              joinPath(path, "value"),
              annotate,
            ),
            ...annotate(node, kind, path),
          };
        }
      } else {
        const access = getTripleton(
          node,
          "kind",
          kind,
          path,
          "init",
          "get",
          "set",
        );
        if (access === "init") {
          if (computed) {
            return {
              type,
              computed,
              method,
              kind: access,
              shorthand: getFalse(node, "shorthand", kind, path),
              key: guardExpression(
                getObject(node, "key", kind, path),
                joinPath(path, "key"),
                annotate,
              ),
              value: guardExpression(
                getObject(node, "value", kind, path),
                joinPath(path, "value"),
                annotate,
              ),
              ...annotate(node, kind, path),
            };
          } else {
            return {
              type,
              computed,
              method,
              kind: access,
              shorthand: getBoolean(node, "shorthand", kind, path),
              key: guardPublicKey(
                getObject(node, "key", kind, path),
                joinPath(path, "key"),
                annotate,
              ),
              value: guardExpression(
                getObject(node, "value", kind, path),
                joinPath(path, "value"),
                annotate,
              ),
              ...annotate(node, kind, path),
            };
          }
        } else if (access === "get" || access === "set") {
          if (computed) {
            return {
              type,
              computed,
              method,
              shorthand: getFalse(node, "shorthand", kind, path),
              kind: access,
              key: guardExpression(
                getObject(node, "key", kind, path),
                joinPath(path, "key"),
                annotate,
              ),
              value: guardFunctionExpression(
                getObject(node, "value", kind, path),
                joinPath(path, "value"),
                annotate,
              ),
              ...annotate(node, kind, path),
            };
          } else {
            return {
              type,
              computed,
              method,
              shorthand: getFalse(node, "shorthand", kind, path),
              kind: access,
              key: guardPublicKey(
                getObject(node, "key", kind, path),
                joinPath(path, "key"),
                annotate,
              ),
              value: guardFunctionExpression(
                getObject(node, "value", kind, path),
                joinPath(path, "value"),
                annotate,
              ),
              ...annotate(node, kind, path),
            };
          }
        } else {
          throw new EstreexTypeError(access);
        }
      }
    }
    case "SpreadElement": {
      return subguardSpreadElement(node, path, annotate, type, kind);
    }
    default: {
      throw new EstreexTypeError(type);
    }
  }
};
