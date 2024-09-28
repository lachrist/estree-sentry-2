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
    getObjectArray(node, "properties", path, kind),
    (item, index) =>
      guardSpreadableObjectProperty(
        item,
        joinDeepPath(path, "properties", index),
        annotate,
      ),
  ),
  ...annotate(node, path, kind),
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
    path,
    kind,
    SPREADABLE_OBJECT_PROPERTY_TYPE_RECORD,
  );
  switch (type) {
    case "Property": {
      const computed = getBoolean(node, "computed", path, kind);
      const method = getBoolean(node, "method", path, kind);
      if (method) {
        if (computed) {
          return {
            type,
            computed,
            method,
            shorthand: getFalse(node, "shorthand", path, kind),
            kind: getSingleton(node, "kind", path, kind, "init"),
            key: guardExpression(
              getObject(node, "key", path, kind),
              joinPath(path, "key"),
              annotate,
            ),
            value: guardFunctionExpression(
              getObject(node, "value", path, kind),
              joinPath(path, "value"),
              annotate,
            ),
            ...annotate(node, path, kind),
          };
        } else {
          return {
            type,
            computed,
            method,
            shorthand: getFalse(node, "shorthand", path, kind),
            kind: getSingleton(node, "kind", path, kind, "init"),
            key: guardPublicKey(
              getObject(node, "key", path, kind),
              joinPath(path, "key"),
              annotate,
            ),
            value: guardFunctionExpression(
              getObject(node, "value", path, kind),
              joinPath(path, "value"),
              annotate,
            ),
            ...annotate(node, path, kind),
          };
        }
      } else {
        const access = getTripleton(
          node,
          "kind",
          path,
          kind,
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
              shorthand: getFalse(node, "shorthand", path, kind),
              key: guardExpression(
                getObject(node, "key", path, kind),
                joinPath(path, "key"),
                annotate,
              ),
              value: guardExpression(
                getObject(node, "value", path, kind),
                joinPath(path, "value"),
                annotate,
              ),
              ...annotate(node, path, kind),
            };
          } else {
            return {
              type,
              computed,
              method,
              kind: access,
              shorthand: getBoolean(node, "shorthand", path, kind),
              key: guardPublicKey(
                getObject(node, "key", path, kind),
                joinPath(path, "key"),
                annotate,
              ),
              value: guardExpression(
                getObject(node, "value", path, kind),
                joinPath(path, "value"),
                annotate,
              ),
              ...annotate(node, path, kind),
            };
          }
        } else if (access === "get" || access === "set") {
          if (computed) {
            return {
              type,
              computed,
              method,
              shorthand: getFalse(node, "shorthand", path, kind),
              kind: access,
              key: guardExpression(
                getObject(node, "key", path, kind),
                joinPath(path, "key"),
                annotate,
              ),
              value: guardFunctionExpression(
                getObject(node, "value", path, kind),
                joinPath(path, "value"),
                annotate,
              ),
              ...annotate(node, path, kind),
            };
          } else {
            return {
              type,
              computed,
              method,
              shorthand: getFalse(node, "shorthand", path, kind),
              kind: access,
              key: guardPublicKey(
                getObject(node, "key", path, kind),
                joinPath(path, "key"),
                annotate,
              ),
              value: guardFunctionExpression(
                getObject(node, "value", path, kind),
                joinPath(path, "value"),
                annotate,
              ),
              ...annotate(node, path, kind),
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
