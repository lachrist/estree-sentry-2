/* eslint-disable no-use-before-define */
import { EstreexTypeError } from "../error";
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
 *   import("../").ClassExpression<{}>
 * >}
 */
export const subguardClassExpression = (node, path, annotate, type, kind) => ({
  type,
  id: has(node, "id")
    ? guardVariableIdentifier(
        getObject(node, "id", kind, path),
        joinPath(path, "id"),
        annotate,
      )
    : null,
  superClass: has(node, "superClass")
    ? guardExpression(
        getObject(node, "superClass", kind, path),
        joinPath(path, "superClass"),
        annotate,
      )
    : null,
  body: guardClassBody(
    getObject(node, "body", kind, path),
    joinPath(path, "body"),
    annotate,
  ),
  ...annotate(node, kind, path),
});

/**
 * @type {import("../guard").Subguard<
 *   import("../").ClassDeclaration<{}>
 * >}
 */
export const subguardClassDeclaration = (node, path, annotate, type, kind) => ({
  type,
  id: guardVariableIdentifier(
    getObject(node, "id", kind, path),
    joinPath(path, "id"),
    annotate,
  ),
  superClass: has(node, "superClass")
    ? guardExpression(
        getObject(node, "superClass", kind, path),
        joinPath(path, "superClass"),
        annotate,
      )
    : null,
  body: guardClassBody(
    getObject(node, "body", kind, path),
    joinPath(path, "body"),
    annotate,
  ),
  ...annotate(node, kind, path),
});

/**
 * @type {import("../guard").Subguard<
 *   import("../").AnonymousClassDeclaration<{}>
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
  id: getNull(node, "id", kind, path),
  superClass: has(node, "superClass")
    ? guardExpression(
        getObject(node, "superClass", kind, path),
        joinPath(path, "superClass"),
        annotate,
      )
    : null,
  body: guardClassBody(
    getObject(node, "body", kind, path),
    joinPath(path, "body"),
    annotate,
  ),
  ...annotate(node, kind, path),
});

/**
 * @type {import("../guard").Guard<
 *   import("../").ClassBody<{}>
 * >}
 */
const guardClassBody = (node, path, annotate) => {
  const kind = "ClassBody";
  return {
    type: getSingleton(node, "type", kind, path, "ClassBody"),
    body: map(getObjectArray(node, "body", kind, path), (item, index) =>
      guardClassEntry(item, joinDeepPath(path, "body", index), annotate),
    ),
    ...annotate(node, kind, path),
  };
};

/**
 * @type {import("../guard").Guard<
 *   import("../syntax/class").ClassEntry<{}>
 * >}
 */
const guardClassEntry = (node, path, annotate) => {
  const kind = "ClassEntry";
  const type = getRecord(node, "type", kind, path, CLASS_ENTRY_TYPE_RECORD);
  switch (type) {
    case "MethodDefinition": {
      const access = getQuadrupleton(
        node,
        "access",
        kind,
        path,
        "method",
        "constructor",
        "get",
        "set",
      );
      if (access === "constructor") {
        return {
          type,
          kind: access,
          static: getFalse(node, "static", kind, path),
          computed: getFalse(node, "computed", kind, path),
          key: guardConstructorIdentifier(node, path, annotate),
          value: guardFunctionExpression(
            getObject(node, "value", kind, path),
            joinPath(path, "value"),
            annotate,
          ),
          ...annotate(node, kind, path),
        };
      } else {
        const computed = getBoolean(node, "computed", kind, path);
        if (computed) {
          return {
            type,
            kind: access,
            static: getBoolean(node, "static", kind, path),
            computed,
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
            kind: access,
            static: getBoolean(node, "static", kind, path),
            computed,
            key: guardKey(
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
      }
    }
    case "PropertyDefinition": {
      const computed = getBoolean(node, "computed", kind, path);
      if (computed) {
        return {
          type,
          static: getBoolean(node, "static", kind, path),
          computed,
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
          static: getBoolean(node, "static", kind, path),
          computed,
          key: guardKey(
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
    }
    case "StaticBlock": {
      return {
        type,
        body: map(getObjectArray(node, "body", kind, path), (item, index) =>
          guardStatement(item, joinDeepPath(path, "body", index), annotate),
        ),
        ...annotate(node, kind, path),
      };
    }
    default: {
      throw new EstreexTypeError(type);
    }
  }
};
