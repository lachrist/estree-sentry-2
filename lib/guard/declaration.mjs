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
import { DECLARATION_TYPE_RECORD } from "../syntax/declaration.mjs";
import { subguardFunctionDeclaration } from "./function.mjs";
import { subguardClassDeclaration } from "./class.mjs";
import { EstreexTypeError } from "../error";

/**
 * @type {import("../guard").Guard<
 *   import("../syntax").Declaration<{}>
 * >}
 */
export const guardDeclaration = (node, path, annotate) => {
  const kind = "Declaration";
  const type = getRecord(node, "type", kind, path, DECLARATION_TYPE_RECORD);
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
    default: {
      throw new EstreexTypeError(type);
    }
  }
};

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax").VariableDeclaration<{}>
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
  kind: getTripleton(node, "kind", kind, path, "var", "let", "const"),
  declarations: map(
    getObjectArray(node, "declarations", kind, path),
    (item, index) =>
      guardVariableDeclarator(
        item,
        joinDeepPath(path, "declarations", index),
        annotate,
      ),
  ),
  ...annotate(node, kind, path),
});

/**
 * @type {import("../guard").Guard<
 *   import("../syntax").VariableDeclarator<{}>
 * >}
 */
const guardVariableDeclarator = (node, path, annotate) => {
  const kind = "VariableDeclarator";
  return {
    type: getSingleton(node, "type", kind, path, "VariableDeclarator"),
    id: guardPattern(
      getObject(node, "id", kind, path),
      joinPath(path, "id"),
      annotate,
    ),
    init: has(node, "init")
      ? guardExpression(
          getObject(node, "init", kind, path),
          joinPath(path, "init"),
          annotate,
        )
      : null,
    ...annotate(node, kind, path),
  };
};
