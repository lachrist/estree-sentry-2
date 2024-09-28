import { KIND_RECORD } from "../lib/index.mjs";
import { TestError } from "./error.mjs";

const {
  Set,
  Object: { hasOwn },
} = globalThis;

/**
 * @type {() => (
 *   node: object,
 *   path: import("../lib").Path,
 *   kind: import("../lib").Kind,
 * ) => { path: import("../lib").Path }}
 */
export const compileAnnotate = () => {
  // weakset on node does not works because:
  //   acorn may put the same node twice in
  //   the tree in presence of of shorthand.
  /**
   * @type {WeakSet<import("../lib").Path>}
   */
  const paths = new Set();
  return (node, path, kind) => {
    if (!hasOwn(node, "type")) {
      throw new TestError("missing node type", { node, path, kind });
    }
    const { type } = /** @type {{type: unknown}} */ (node);
    if (typeof type !== "string") {
      throw new TestError("node type is not a string", { node, path, kind });
    }
    if (paths.has(path)) {
      throw new TestError("annotate called twice on the same path", {
        node,
        path,
        kind,
      });
    }
    paths.add(path);
    if (!hasOwn(KIND_RECORD, kind)) {
      throw new TestError("invalid kind", { node, path, kind });
    }
    if (!hasOwn(KIND_RECORD[kind], type)) {
      throw new TestError("invalid type for kind", { node, path, kind });
    }
    return { path };
  };
};
