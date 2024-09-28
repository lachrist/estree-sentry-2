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
  async: getBoolean(node, "async", path, kind),
  generator: getBoolean(node, "generator", path, kind),
  id: guardVariableIdentifier(
    getObject(node, "id", path, kind),
    joinPath(path, "id"),
    annotate,
  ),
  params: map(getObjectArray(node, "params", path, kind), (item, index) =>
    guardPattern(item, joinDeepPath(path, "params", index), annotate),
  ),
  body: guardBlockStatement(
    getObject(node, "body", path, kind),
    joinPath(path, "body"),
    annotate,
  ),
  ...annotate(node, path, kind),
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
  async: getBoolean(node, "async", path, kind),
  generator: getBoolean(node, "generator", path, kind),
  id: getNull(node, "id", path, kind),
  params: map(getObjectArray(node, "params", path, kind), (item, index) =>
    guardPattern(item, joinDeepPath(path, "params", index), annotate),
  ),
  body: guardBlockStatement(
    getObject(node, "body", path, kind),
    joinPath(path, "body"),
    annotate,
  ),
  ...annotate(node, path, kind),
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
  async: getBoolean(node, "async", path, kind),
  generator: getBoolean(node, "generator", path, kind),
  id: guardVariableIdentifier(
    getObject(node, "id", path, kind),
    joinPath(path, "id"),
    annotate,
  ),
  params: map(getObjectArray(node, "params", path, kind), (item, index) =>
    guardPattern(item, joinDeepPath(path, "params", index), annotate),
  ),
  body: guardBlockStatement(
    getObject(node, "body", path, kind),
    joinPath(path, "body"),
    annotate,
  ),
  ...annotate(node, path, kind),
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
  const expression = getBoolean(node, "expression", path, kind);
  if (expression) {
    return {
      type,
      async: getBoolean(node, "async", path, kind),
      generator: getFalse(node, "generator", path, kind),
      expression,
      params: map(getObjectArray(node, "params", path, kind), (item, index) =>
        guardPattern(item, joinDeepPath(path, "params", index), annotate),
      ),
      body: guardExpression(
        getObject(node, "body", path, kind),
        joinPath(path, "body"),
        annotate,
      ),
      ...annotate(node, path, kind),
    };
  } else {
    return {
      type,
      async: getBoolean(node, "async", path, kind),
      generator: getFalse(node, "generator", path, kind),
      expression,
      params: map(getObjectArray(node, "params", path, kind), (item, index) =>
        guardPattern(item, joinDeepPath(path, "params", index), annotate),
      ),
      body: guardBlockStatement(
        getObject(node, "body", path, kind),
        joinPath(path, "body"),
        annotate,
      ),
      ...annotate(node, path, kind),
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
  const type = getSingleton(node, "type", path, kind, "FunctionExpression");
  return subguardFunctionExpression(node, path, annotate, type, kind);
};
