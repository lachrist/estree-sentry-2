import { map, mapSingleton } from "../util/index.mjs";
import {
  getBoolean,
  getEmpty,
  getFalse,
  getNull,
  getObject,
  getObjectArray,
  getObjectSingleton,
  getSingleton,
  has,
} from "../access.mjs";
import { guardExpression } from "./expression.mjs";
import { guardVariableIdentifier } from "./identifier.mjs";
import { joinDeepPath, joinPath } from "../path.mjs";
import { guardPattern, guardRestablePattern } from "./pattern.mjs";
import { guardBlockStatement } from "./statement.mjs";

/**
 * @type {import("../guard").Subguard<
 *   import("./function").FunctionDeclaration<{}>
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
    guardRestablePattern(item, joinDeepPath(path, "params", index), annotate),
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
 *   import("./function").AnonymousFunctionDeclaration<{}>
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
    guardRestablePattern(item, joinDeepPath(path, "params", index), annotate),
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
 *   import("./function").FunctionExpression<{}>
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
  id: has(node, "id")
    ? guardVariableIdentifier(
        getObject(node, "id", path, kind),
        joinPath(path, "id"),
        annotate,
      )
    : null,
  params: map(getObjectArray(node, "params", path, kind), (item, index) =>
    guardRestablePattern(item, joinDeepPath(path, "params", index), annotate),
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
 *   import("./function").ArrowFunctionExpression<{}>
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
      id: getNull(node, "id", path, kind),
      async: getBoolean(node, "async", path, kind),
      generator: getFalse(node, "generator", path, kind),
      expression,
      params: map(getObjectArray(node, "params", path, kind), (item, index) =>
        guardRestablePattern(
          item,
          joinDeepPath(path, "params", index),
          annotate,
        ),
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
      id: getNull(node, "id", path, kind),
      async: getBoolean(node, "async", path, kind),
      generator: getFalse(node, "generator", path, kind),
      expression,
      params: map(getObjectArray(node, "params", path, kind), (item, index) =>
        guardRestablePattern(
          item,
          joinDeepPath(path, "params", index),
          annotate,
        ),
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
 *   import("./function").ConstructorFunctionExpression<{}>
 * >}
 */
export const guardConstructorFunctionExpression = (node, path, annotate) => {
  const kind = "ConstructorFunctionExpression";
  return {
    type: getSingleton(node, "type", path, kind, "FunctionExpression"),
    async: getFalse(node, "async", path, kind),
    generator: getFalse(node, "generator", path, kind),
    id: getNull(node, "id", path, kind),
    params: map(getObjectArray(node, "params", path, kind), (item, index) =>
      guardRestablePattern(item, joinDeepPath(path, "params", index), annotate),
    ),
    body: guardBlockStatement(
      getObject(node, "body", path, kind),
      joinPath(path, "body"),
      annotate,
    ),
    ...annotate(node, path, kind),
  };
};

/**
 * @type {import("../guard").Guard<
 *   import("./function").MethodFunctionExpression<{}>
 * >}
 */
export const guardMethodFunctionExpression = (node, path, annotate) => {
  const kind = "MethodFunctionExpression";
  return {
    type: getSingleton(node, "type", path, kind, "FunctionExpression"),
    async: getBoolean(node, "async", path, kind),
    generator: getBoolean(node, "generator", path, kind),
    id: getNull(node, "id", path, kind),
    params: map(getObjectArray(node, "params", path, kind), (item, index) =>
      guardRestablePattern(item, joinDeepPath(path, "params", index), annotate),
    ),
    body: guardBlockStatement(
      getObject(node, "body", path, kind),
      joinPath(path, "body"),
      annotate,
    ),
    ...annotate(node, path, kind),
  };
};

/**
 * @type {import("../guard").Guard<
 *   import("./function").GetterFunctionExpression<{}>
 * >}
 */
export const guardGetterFunctionExpression = (node, path, annotate) => {
  const kind = "GetterFunctionExpression";
  return {
    type: getSingleton(node, "type", path, kind, "FunctionExpression"),
    async: getFalse(node, "async", path, kind),
    generator: getFalse(node, "generator", path, kind),
    id: getNull(node, "id", path, kind),
    params: getEmpty(node, "params", path, kind),
    body: guardBlockStatement(
      getObject(node, "body", path, kind),
      joinPath(path, "body"),
      annotate,
    ),
    ...annotate(node, path, kind),
  };
};

/**
 * @type {import("../guard").Guard<
 *   import("./function").SetterFunctionExpression<{}>
 * >}
 */
export const guardSetterFunctionExpression = (node, path, annotate) => {
  const kind = "SetterFunctionExpression";
  return {
    type: getSingleton(node, "type", path, kind, "FunctionExpression"),
    async: getFalse(node, "async", path, kind),
    generator: getFalse(node, "generator", path, kind),
    id: getNull(node, "id", path, kind),
    params: mapSingleton(
      getObjectSingleton(node, "params", path, kind),
      (item, index) =>
        guardPattern(item, joinDeepPath(path, "params", index), annotate),
    ),
    body: guardBlockStatement(
      getObject(node, "body", path, kind),
      joinPath(path, "body"),
      annotate,
    ),
    ...annotate(node, path, kind),
  };
};
