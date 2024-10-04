import { EstreeSentryTypeError } from "../error.mjs";
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
import {
  guardMethodFunctionExpression,
  guardGetterFunctionExpression,
  guardSetterFunctionExpression,
} from "./function.mjs";
import { guardPublicKey } from "./key.mjs";
import { joinDeepPath, joinPath } from "../path.mjs";
import { map } from "../util/index.mjs";

/**
 * @type {{[key in import("./object").SpreadableObjectProperty<{}>["type"]]: null}}
 */
export const SPREADABLE_OBJECT_PROPERTY_TYPE_RECORD = {
  SpreadElement: null,
  Property: null,
};

/**
 * @type {import("../guard").Subguard<
 *   import("./object").ObjectExpression<{}>
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
 *   import("./object").SpreadableObjectProperty<{}>
 * >}
 */
const guardSpreadableObjectProperty = (node, path, annotate) => {
  const kind = "SpreadableObjectProperty";
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
            value: guardMethodFunctionExpression(
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
            value: guardMethodFunctionExpression(
              getObject(node, "value", path, kind),
              joinPath(path, "value"),
              annotate,
            ),
            ...annotate(node, path, kind),
          };
        }
      } else {
        const property_kind = getTripleton(
          node,
          "kind",
          path,
          kind,
          "init",
          "get",
          "set",
        );
        switch (property_kind) {
          case "init": {
            if (computed) {
              return {
                type,
                computed,
                method,
                kind: property_kind,
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
                kind: property_kind,
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
          }
          case "get": {
            if (computed) {
              return {
                type,
                computed,
                method,
                shorthand: getFalse(node, "shorthand", path, kind),
                kind: property_kind,
                key: guardExpression(
                  getObject(node, "key", path, kind),
                  joinPath(path, "key"),
                  annotate,
                ),
                value: guardGetterFunctionExpression(
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
                kind: property_kind,
                key: guardPublicKey(
                  getObject(node, "key", path, kind),
                  joinPath(path, "key"),
                  annotate,
                ),
                value: guardGetterFunctionExpression(
                  getObject(node, "value", path, kind),
                  joinPath(path, "value"),
                  annotate,
                ),
                ...annotate(node, path, kind),
              };
            }
          }
          case "set": {
            if (computed) {
              return {
                type,
                computed,
                method,
                shorthand: getFalse(node, "shorthand", path, kind),
                kind: property_kind,
                key: guardExpression(
                  getObject(node, "key", path, kind),
                  joinPath(path, "key"),
                  annotate,
                ),
                value: guardSetterFunctionExpression(
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
                kind: property_kind,
                key: guardPublicKey(
                  getObject(node, "key", path, kind),
                  joinPath(path, "key"),
                  annotate,
                ),
                value: guardSetterFunctionExpression(
                  getObject(node, "value", path, kind),
                  joinPath(path, "value"),
                  annotate,
                ),
                ...annotate(node, path, kind),
              };
            }
          }
          /* c8 ignore start */
          default: {
            throw new EstreeSentryTypeError(property_kind);
          }
          /* c8 ignore stop */
        }
      }
    }
    case "SpreadElement": {
      return subguardSpreadElement(node, path, annotate, type, kind);
    }
    /* c8 ignore start */
    default: {
      throw new EstreeSentryTypeError(type);
    }
    /* c8 ignore stop */
  }
};
