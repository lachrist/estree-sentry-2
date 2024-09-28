import { generate } from "astring";
import { parse } from "acorn";
import { guard, ROOT_PATH } from "../lib/index.mjs";

const {
  console: { log },
} = /** @type {{console: import("./console").Console}} */ (
  /** @type {unknown} */ (globalThis)
);

/**
 * @type {(
 *   node: object,
 *   path: import("../lib").Path,
 *   kind: import("../lib").Kind,
 * ) => { path: import("../lib").Path }}
 */
const annotate = (node, path, kind) => ({
  path,
});

/**
 * @type {(
 *   code: string,
 * ) => void}
 */
const test = (code) => {
  const root1 = parse(code, { ecmaVersion: 2024 });
  const code1 = generate(root1);
  const root2 = guard(root1, ROOT_PATH, annotate);
  const code2 = generate(root2);
  if (code1 !== code2) {
    log("\nExpect:\n======\n");
    log(code1);
    log("\nActual:\n======\n");
    log(code2);
    throw new Error("code mismatch");
  }
};

test("123;");
