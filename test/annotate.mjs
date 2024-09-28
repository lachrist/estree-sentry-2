import { KIND_RECORD } from "../lib/index.mjs";
import { TestError } from "./error.mjs";

const {
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
  /**
   * @type {WeakSet<object>}
   */
  const weakset = new WeakSet();
  return (node, path, kind) => {
    if (!hasOwn(node, "type")) {
      throw new TestError("missing node type", { node, path, kind });
    }
    const { type } = /** @type {{type: unknown}} */ (node);
    if (typeof type !== "string") {
      throw new TestError("node type is not a string", { node, path, kind });
    }
    if (weakset.has(node)) {
      throw new TestError("annotate called twice on same node", {
        node,
        path,
        kind,
      });
    }
    weakset.add(node);
    if (!hasOwn(KIND_RECORD, kind)) {
      throw new TestError("invalid kind", { node, path, kind });
    }
    if (!hasOwn(KIND_RECORD[kind], type)) {
      throw new TestError("invalid type for kind", { node, path, kind });
    }
    return { path };
  };
};
