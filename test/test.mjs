import { generate } from "astring";
import { parse } from "acorn";
import {
  PreciseEstreeSyntaxError,
  guard,
  listChildren,
  ROOT_PATH,
  splitPath,
  walkPath,
} from "../lib/index.mjs";
import { TestError } from "./error.mjs";
import { compileAnnotate } from "./annotate.mjs";

/**
 * @type {(
 *   node: import("../lib").Node<{ path: import("../lib").Path }>,
 *   root: import("../lib").Program<{ path: import("../lib").Path }>,
 * ) => void}
 */
const checkNode = (node, root) => {
  const segments = splitPath(node.path, root.path);
  if (segments === null) {
    throw new TestError("could not split path", { node, root });
  }
  const walk_node = walkPath(segments, root);
  if (walk_node === null) {
    throw new TestError("could not walk path", { segments, root, node });
  }
  if (walk_node !== node) {
    throw new TestError("walk node mismatch", {
      segments,
      root,
      node,
      walk_node,
    });
  }
  for (const child of listChildren(node)) {
    checkNode(child, root);
  }
};

/**
 * @type {(
 *   code: string | import("estree").Program,
 *   type?: "module" | "script",
 * ) => void}
 */
export const pass = (code, type = "script") => {
  const root1 =
    typeof code === "string"
      ? parse(code, { ecmaVersion: 2024, sourceType: type })
      : code;
  const code1 = generate(root1);
  const root2 = guard(root1, ROOT_PATH, compileAnnotate());
  checkNode(root2, root2);
  const code2 = generate(root2);
  if (code1 !== code2) {
    throw new TestError("code mismatch", { code, code1, code2, root1, root2 });
  }
};

/**
 * @type {(
 *   root: string | import("estree").Program,
 * ) => void}
 */
export const fail = (code, type = "script") => {
  const root1 =
    typeof code === "string"
      ? parse(code, { ecmaVersion: 2024, sourceType: type })
      : code;
  try {
    guard(root1, ROOT_PATH, compileAnnotate());
  } catch (error) {
    if (!(error instanceof PreciseEstreeSyntaxError)) {
      throw error;
    }
    return undefined;
  }
  throw new TestError("missing error", { code, root1 });
};
