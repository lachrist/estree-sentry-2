import { generate } from "astring";
import { parse } from "acorn";
import {
  guard,
  listChildren,
  ROOT_PATH,
  splitPath,
  walkPath,
} from "../lib/index.mjs";
import { compileAnnotate } from "./annotate.mjs";

const {
  console: { log },
} = /** @type {{console: import("./console").Console}} */ (
  /** @type {unknown} */ (globalThis)
);

/**
 * @type {(
 *   node: import("../lib").Node<{ path: import("../lib").Path }>,
 *   root: import("../lib").Program<{ path: import("../lib").Path }>,
 * ) => void}
 */
const checkNode = (node, root) => {
  const segments = splitPath(node.path, root.path);
  if (segments === null) {
    throw new Error("Could not split path");
  }
  if (node !== walkPath(segments, root)) {
    throw new Error("Could not walk path");
  }
  for (const child of listChildren(node)) {
    checkNode(child, root);
  }
};

/**
 * @type {(
 *   code: string,
 * ) => void}
 */
export const test = (code) => {
  const root1 = parse(code, { ecmaVersion: 2024 });
  const code1 = generate(root1);
  const root2 = guard(root1, ROOT_PATH, compileAnnotate());
  checkNode(root2, root2);
  const code2 = generate(root2);
  if (code1 !== code2) {
    log("\nExpect:\n======\n");
    log(code1);
    log("\nActual:\n======\n");
    log(code2);
    throw new Error("code mismatch");
  }
};
