import { map } from "../util/index.mjs";
import {
  getBoolean,
  getFalse,
  getNull,
  getObject,
  getObjectArray,
  getSingleton,
} from "../access.mjs";
import { guardExpression } from "./expression.mjs";
import { guardVariableIdentifier } from "./identifier.mjs";
import { joinDeepPath, joinPath } from "../path.mjs";
import { guardPattern } from "./pattern.mjs";
import { guardBlockStatement } from "./statement.mjs";

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax").FunctionDeclaration<{}>
 * >}
 */
export const subguardFunctionDeclaration = (
  node,
  path,
  annotate,
  type,
  kind,
) => ({
  type,
  async: getBoolean(node, "async", kind, path),
  generator: getBoolean(node, "generator", kind, path),
  id: guardVariableIdentifier(
    getObject(node, "id", kind, path),
    joinPath(path, "id"),
    annotate,
  ),
  params: map(getObjectArray(node, "params", kind, path), (item, index) =>
    guardPattern(item, joinDeepPath(path, "params", index), annotate),
  ),
  body: guardBlockStatement(
    getObject(node, "body", kind, path),
    joinPath(path, "body"),
    annotate,
  ),
  ...annotate(node, kind, path),
});

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax").AnonymousFunctionDeclaration<{}>
 * >}
 */
export const subguardAnonymousFunctionDeclaration = (
  node,
  path,
  annotate,
  type,
  kind,
) => ({
  type,
  async: getBoolean(node, "async", kind, path),
  generator: getBoolean(node, "generator", kind, path),
  id: getNull(node, "id", kind, path),
  params: map(getObjectArray(node, "params", kind, path), (item, index) =>
    guardPattern(item, joinDeepPath(path, "params", index), annotate),
  ),
  body: guardBlockStatement(
    getObject(node, "body", kind, path),
    joinPath(path, "body"),
    annotate,
  ),
  ...annotate(node, kind, path),
});

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax").FunctionExpression<{}>
 * >}
 */
export const subguardFunctionExpression = (
  node,
  path,
  annotate,
  type,
  kind,
) => ({
  type,
  async: getBoolean(node, "async", kind, path),
  generator: getBoolean(node, "generator", kind, path),
  id: guardVariableIdentifier(
    getObject(node, "id", kind, path),
    joinPath(path, "id"),
    annotate,
  ),
  params: map(getObjectArray(node, "params", kind, path), (item, index) =>
    guardPattern(item, joinDeepPath(path, "params", index), annotate),
  ),
  body: guardBlockStatement(
    getObject(node, "body", kind, path),
    joinPath(path, "body"),
    annotate,
  ),
  ...annotate(node, kind, path),
});

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax").ArrowFunctionExpression<{}>
 * >}
 */
export const subguardArrowFunctionExpression = (
  node,
  path,
  annotate,
  type,
  kind,
) => {
  const expression = getBoolean(node, "expression", kind, path);
  if (expression) {
    return {
      type,
      async: getBoolean(node, "async", kind, path),
      generator: getFalse(node, "generator", kind, path),
      expression,
      params: map(getObjectArray(node, "params", kind, path), (item, index) =>
        guardPattern(item, joinDeepPath(path, "params", index), annotate),
      ),
      body: guardExpression(
        getObject(node, "body", kind, path),
        joinPath(path, "body"),
        annotate,
      ),
      ...annotate(node, kind, path),
    };
  } else {
    return {
      type,
      async: getBoolean(node, "async", kind, path),
      generator: getFalse(node, "generator", kind, path),
      expression,
      params: map(getObjectArray(node, "params", kind, path), (item, index) =>
        guardPattern(item, joinDeepPath(path, "params", index), annotate),
      ),
      body: guardBlockStatement(
        getObject(node, "body", kind, path),
        joinPath(path, "body"),
        annotate,
      ),
      ...annotate(node, kind, path),
    };
  }
};

/**
 * @type {import("../guard").Guard<
 *   import("../syntax").FunctionExpression<{}>
 * >}
 */
export const guardFunctionExpression = (node, path, annotate) => {
  const kind = "FunctionExpression";
  const type = getSingleton(node, "type", kind, path, "FunctionExpression");
  return subguardFunctionExpression(node, path, annotate, type, kind);
};
