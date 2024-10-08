import { map } from "../util/index.mjs";
import {
  getObject,
  getObjectArray,
  getRecord,
  getSingleton,
  getTripleton,
  has,
} from "../access.mjs";
import { guardExpression } from "./expression.mjs";
import { joinDeepPath, joinPath } from "../path.mjs";
import { guardPattern } from "./pattern.mjs";
import { subguardFunctionDeclaration } from "./function.mjs";
import { subguardClassDeclaration } from "./class.mjs";
import { EstreeSentryTypeError } from "../error.mjs";

/**
 * @type {{[key in import("./declaration").Declaration<{}>["type"]]: null}}
 */
export const DECLARATION_TYPE_RECORD = {
  FunctionDeclaration: null,
  VariableDeclaration: null,
  ClassDeclaration: null,
};

/**
 * @type {{[key in import("./declaration").VariableKind]: null}}
 */
export const VARIABLE_KIND_RECORD = {
  const: null,
  let: null,
  var: null,
};

/**
 * @type {import("../guard").Guard<
 *   import("./declaration").Declaration<{}>
 * >}
 */
export const guardDeclaration = (node, path, annotate) => {
  const kind = "Declaration";
  const type = getRecord(node, "type", path, kind, DECLARATION_TYPE_RECORD);
  switch (type) {
    case "VariableDeclaration": {
      return subguardVariableDeclaration(node, path, annotate, type, kind);
    }
    case "FunctionDeclaration": {
      return subguardFunctionDeclaration(node, path, annotate, type, kind);
    }
    case "ClassDeclaration": {
      return subguardClassDeclaration(node, path, annotate, type, kind);
    }
    /* c8 ignore start */
    default: {
      throw new EstreeSentryTypeError(type);
    }
    /* c8 ignore stop */
  }
};

/**
 * @type {import("../guard").Subguard<
 *   import("./declaration").VariableDeclaration<{}>
 * >}
 */
export const subguardVariableDeclaration = (
  node,
  path,
  annotate,
  type,
  kind,
) => ({
  type,
  kind: getTripleton(node, "kind", path, kind, "var", "let", "const"),
  declarations: map(
    getObjectArray(node, "declarations", path, kind),
    (item, index) =>
      guardVariableDeclarator(
        item,
        joinDeepPath(path, "declarations", index),
        annotate,
      ),
  ),
  ...annotate(node, path, kind),
});

/**
 * @type {import("../guard").Guard<
 *   import("./declaration").VariableDeclarator<{}>
 * >}
 */
const guardVariableDeclarator = (node, path, annotate) => {
  const kind = "VariableDeclarator";
  return {
    type: getSingleton(node, "type", path, kind, "VariableDeclarator"),
    id: guardPattern(
      getObject(node, "id", path, kind),
      joinPath(path, "id"),
      annotate,
    ),
    init: has(node, "init")
      ? guardExpression(
          getObject(node, "init", path, kind),
          joinPath(path, "init"),
          annotate,
        )
      : null,
    ...annotate(node, path, kind),
  };
};
