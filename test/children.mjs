import { listChildren as listChildrenTestee } from "../lib/index.mjs";
import { SEGMENT_RECORD } from "../lib/index.mjs";
import { TestError } from "./error.mjs";

const {
  Array: { isArray },
  Object: { hasOwn, values: listValueArray },
  Reflect: { ownKeys },
} = globalThis;

/**
 * @type {(
 *   data: unknown
 * ) => data is import("../lib").Node<any>}
 */
const isNode = (data) =>
  typeof data === "object" &&
  data !== null &&
  hasOwn(data, "type") &&
  typeof (/** @type {{type: unknown}} */ (data).type) === "string";

/**
 * @type {<X>(
 *   node: import("../lib").Node<X>,
 * ) => import("../lib").Node<X>[]}
 */
const listChildrenOracle = (node) => {
  /** @type {import("../lib").Node<any>[]} */
  const children = [];
  let length = 0;
  for (const key of ownKeys(node)) {
    if (hasOwn(SEGMENT_RECORD, key)) {
      const data = /** @type {{[key in PropertyKey]: unknown}} */ (node)[key];
      if (isArray(data)) {
        for (const item of data) {
          if (isNode(item)) {
            children[length++] = item;
          }
        }
      } else {
        if (isNode(data)) {
          children[length++] = data;
        }
      }
    }
  }
  return children;
};

/**
 * @type {<X>(
 *   node: import("../lib").Node<X>
 * )=> import("../lib").Node<X>[]}
 */
const listChildren = (node) => {
  const children = listChildrenTestee(node);
  const set = new Set(children);
  for (const child of listValueArray(node)) {
    if (set.has(child)) {
      throw new TestError("listChildren should return a new array", {
        node,
        children,
        child,
      });
    }
  }
  for (const child of listChildrenOracle(node)) {
    if (!set.has(child)) {
      throw new TestError("missing child", { node, children, child });
    }
  }
  return children;
};
