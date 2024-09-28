/* eslint-disable no-use-before-define */
import { PreciseEstreeTypeError } from "../error.mjs";
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
import { guardFunctionExpression } from "./function.mjs";
import { CLASS_ENTRY_TYPE_RECORD } from "../index.mjs";

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax").ClassExpression<{}>
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
 *   import("../syntax").ClassDeclaration<{}>
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
 *   import("../syntax").AnonymousClassDeclaration<{}>
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
 *   import("../syntax").ClassBody<{}>
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
 *   import("../syntax").ClassEntry<{}>
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
      if (method_kind === "constructor") {
        return {
          type,
          kind: method_kind,
          static: getFalse(node, "static", path, kind),
          computed: getFalse(node, "computed", path, kind),
          key: guardConstructorIdentifier(
            getObject(node, "key", path, kind),
            path,
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
          static: getBoolean(node, "static", path, kind),
          computed,
          key: guardKey(
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
    case "StaticBlock": {
      return {
        type,
        body: map(getObjectArray(node, "body", path, kind), (item, index) =>
          guardStatement(item, joinDeepPath(path, "body", index), annotate),
        ),
        ...annotate(node, path, kind),
      };
    }
    default: {
      throw new PreciseEstreeTypeError(type);
    }
  }
};
