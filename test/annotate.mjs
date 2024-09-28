import { KIND_RECORD } from "../lib/index.mjs";

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
      throw new Error("missing node type");
    }
    const { type } = /** @type {{type: unknown}} */ (node);
    if (typeof type !== "string") {
      throw new Error("node type is not a string");
    }
    if (weakset.has(node)) {
      throw new Error("annotate called twice on same node");
    }
    weakset.add(node);
    if (!hasOwn(KIND_RECORD, kind)) {
      throw new Error("invalid kind");
    }
    if (!hasOwn(KIND_RECORD[kind], type)) {
      throw new Error("invalid type for kind");
    }
    return { path };
  };
};
