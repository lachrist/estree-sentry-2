/* eslint-disable no-use-before-define */
import { EstreeSentryTypeError } from "../error.mjs";
import { map } from "../util/index.mjs";
import {
  getBoolean,
  getFalse,
  getNull,
  getObject,
  getObjectArray,
  getQuadrupleton,
  getRecord,
  getSingleton,
  getTripleton,
  has,
} from "../access.mjs";
import { guardExpression } from "./expression.mjs";
import { guardKey } from "./key.mjs";
import { joinDeepPath, joinPath } from "../path.mjs";
import { guardStatement } from "./statement.mjs";
import {
  guardConstructorIdentifier,
  guardVariableIdentifier,
} from "./identifier.mjs";
import {
  guardConstructorFunctionExpression,
  guardFunctionExpression,
  guardGetterFunctionExpression,
  guardSetterFunctionExpression,
} from "./function.mjs";
import { CLASS_ENTRY_TYPE_RECORD } from "../index.mjs";

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax/class").ClassExpression<{}>
 * >}
 */
export const subguardClassExpression = (node, path, annotate, type, kind) => ({
  type,
  id: has(node, "id")
    ? guardVariableIdentifier(
        getObject(node, "id", path, kind),
        joinPath(path, "id"),
        annotate,
      )
    : null,
  superClass: has(node, "superClass")
    ? guardExpression(
        getObject(node, "superClass", path, kind),
        joinPath(path, "superClass"),
        annotate,
      )
    : null,
  body: guardClassBody(
    getObject(node, "body", path, kind),
    joinPath(path, "body"),
    annotate,
  ),
  ...annotate(node, path, kind),
});

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax/class").ClassDeclaration<{}>
 * >}
 */
export const subguardClassDeclaration = (node, path, annotate, type, kind) => ({
  type,
  id: guardVariableIdentifier(
    getObject(node, "id", path, kind),
    joinPath(path, "id"),
    annotate,
  ),
  superClass: has(node, "superClass")
    ? guardExpression(
        getObject(node, "superClass", path, kind),
        joinPath(path, "superClass"),
        annotate,
      )
    : null,
  body: guardClassBody(
    getObject(node, "body", path, kind),
    joinPath(path, "body"),
    annotate,
  ),
  ...annotate(node, path, kind),
});

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax/class").AnonymousClassDeclaration<{}>
 * >}
 */
export const subguardAnonymousClassDeclaration = (
  node,
  path,
  annotate,
  type,
  kind,
) => ({
  type,
  id: getNull(node, "id", path, kind),
  superClass: has(node, "superClass")
    ? guardExpression(
        getObject(node, "superClass", path, kind),
        joinPath(path, "superClass"),
        annotate,
      )
    : null,
  body: guardClassBody(
    getObject(node, "body", path, kind),
    joinPath(path, "body"),
    annotate,
  ),
  ...annotate(node, path, kind),
});

/**
 * @type {import("../guard").Guard<
 *   import("../syntax/class").ClassBody<{}>
 * >}
 */
const guardClassBody = (node, path, annotate) => {
  const kind = "ClassBody";
  return {
    type: getSingleton(node, "type", path, kind, "ClassBody"),
    body: map(getObjectArray(node, "body", path, kind), (item, index) =>
      guardClassEntry(item, joinDeepPath(path, "body", index), annotate),
    ),
    ...annotate(node, path, kind),
  };
};

/**
 * @type {import("../guard").Guard<
 *   import("../syntax/class").ClassEntry<{}>
 * >}
 */
const guardClassEntry = (node, path, annotate) => {
  const kind = "ClassEntry";
  const type = getRecord(node, "type", path, kind, CLASS_ENTRY_TYPE_RECORD);
  switch (type) {
    case "MethodDefinition": {
      const method_kind = getQuadrupleton(
        node,
        "kind",
        path,
        kind,
        "method",
        "constructor",
        "get",
        "set",
      );
      switch (method_kind) {
        case "constructor": {
          return {
            type,
            kind: method_kind,
            static: getFalse(node, "static", path, kind),
            computed: getFalse(node, "computed", path, kind),
            key: guardConstructorIdentifier(
              getObject(node, "key", path, kind),
              joinPath(path, "key"),
              annotate,
            ),
            value: guardConstructorFunctionExpression(
              getObject(node, "value", path, kind),
              joinPath(path, "value"),
              annotate,
            ),
            ...annotate(node, path, kind),
          };
        }
        case "method": {
          const computed = getBoolean(node, "computed", path, kind);
          if (computed) {
            return {
              type,
              kind: method_kind,
              static: getBoolean(node, "static", path, kind),
              computed,
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
              kind: method_kind,
              static: getBoolean(node, "static", path, kind),
              computed,
              key: guardKey(
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
        }
        case "get": {
          const computed = getBoolean(node, "computed", path, kind);
          if (computed) {
            return {
              type,
              kind: method_kind,
              static: getBoolean(node, "static", path, kind),
              computed,
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
              kind: method_kind,
              static: getBoolean(node, "static", path, kind),
              computed,
              key: guardKey(
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
          const computed = getBoolean(node, "computed", path, kind);
          if (computed) {
            return {
              type,
              kind: method_kind,
              static: getBoolean(node, "static", path, kind),
              computed,
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
              kind: method_kind,
              static: getBoolean(node, "static", path, kind),
              computed,
              key: guardKey(
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
          throw new EstreeSentryTypeError(method_kind);
        }
        /* c8 ignore stop */
      }
    }
    case "PropertyDefinition": {
      const computed = getBoolean(node, "computed", path, kind);
      if (computed) {
        return {
          type,
          static: getBoolean(node, "static", path, kind),
          computed,
          key: guardExpression(
            getObject(node, "key", path, kind),
            joinPath(path, "key"),
            annotate,
          ),
          value: has(node, "value")
            ? guardExpression(
                getObject(node, "value", path, kind),
                joinPath(path, "value"),
                annotate,
              )
            : null,
          ...annotate(node, path, kind),
        };
      } else {
        return {
          type,
          static: getBoolean(node, "static", path, kind),
          computed,
          key: guardKey(
            getObject(node, "key", path, kind),
            joinPath(path, "key"),
            annotate,
          ),
          value: has(node, "value")
            ? guardExpression(
                getObject(node, "value", path, kind),
                joinPath(path, "value"),
                annotate,
              )
            : null,
          ...annotate(node, path, kind),
        };
      }
    }
    case "StaticBlock": {
      return {
        type,
        body: map(getObjectArray(node, "body", path, kind), (item, index) =>
          guardStatement(item, joinDeepPath(path, "body", index), annotate),
        ),
        ...annotate(node, path, kind),
      };
    }
    /* c8 ignore start */
    default: {
      throw new EstreeSentryTypeError(type);
    }
    /* c8 ignore stop */
  }
};
