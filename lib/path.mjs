const {
  Reflect: { apply },
  String: {
    prototype: { split, substring, startsWith },
  },
  Object: { hasOwn },
} = globalThis;

const SEP = ".";

const SEP_SINGLETON = [SEP];

export const ROOT_PATH = /** @type {import("./path").Path} */ ("$");

/**
 * @type {{[key in import("./path").Segment]: null}}
 */
export const SEGMENT_RECORD = {
  meta: null,
  label: null,
  exported: null,
  local: null,
  imported: null,
  cases: null,
  discriminant: null,
  update: null,
  key: null,
  value: null,
  properties: null,
  elements: null,
  id: null,
  params: null,
  callee: null,
  arguments: null,
  test: null,
  init: null,
  declarations: null,
  finalizer: null,
  expressions: null,
  source: null,
  expression: null,
  handler: null,
  consequent: null,
  alternate: null,
  declaration: null,
  specifiers: null,
  superClass: null,
  object: null,
  tag: null,
  property: null,
  argument: null,
  left: null,
  param: null,
  right: null,
  block: null,
  body: null,
  quasi: null,
  quasis: null,
};

/**
 * @type {(
 *   path: import("./path").Path,
 *   segment: import("./path").Segment,
 * ) => import("./path").Path}
 */
export const joinPath = (path, segment) =>
  /** @type {import("./path").Path} */ (`${path}${SEP}${segment}`);

/**
 * @type {(
 *   path: import("./path").Path,
 *   segment1: import("./path").Segment,
 *   segment2: import("./path").Segment,
 * ) => import("./path").Path}
 */
export const joinDeepPath = (path, segment1, segment2) =>
  /** @type {import("./path").Path} */ (
    `${path}${SEP}${segment1}${SEP}${segment2}`
  );

/* eslint-disable local/no-impure */
/**
 * @type {(
 *   path: import("./path").Path,
 * ) => number}
 */
export const getPathDeph = (path) => {
  let depth = 0;
  const { length } = path;
  for (let index = 0; index < length; index += 1) {
    if (path[index] === SEP) {
      depth += 1;
    }
  }
  return depth;
};
/* eslint-enable local/no-impure */

/**
 * @type {(
 *   path: import("./path").Path,
 *   base: import("./path").Path,
 * ) => null | import("./path").Segment[]}
 */
export const splitPath = (path, base) => {
  if (path === base) {
    return [];
  } else if (apply(startsWith, path, [`${base}${SEP}`])) {
    const segments = apply(
      split,
      apply(substring, path, [base.length + 1]),
      SEP_SINGLETON,
    );
    const { length } = segments;
    for (let index = 0; index < length; index++) {
      const integer = parseInt(segments[index], 10);
      if (!isNaN(integer)) {
        segments[index] = integer;
      }
    }
    return segments;
  } else {
    return null;
  }
};

/* eslint-disable local/no-impure */
/**
 * @type {<X>(
 *   segments: import("./path").Segment[],
 *   node: import("./node").Node<X> | import("./node").Node<X>[],
 * ) => null | import("./node").Node<X> | import("./node").Node<X>[]}
 */
export const walkPath = (segments, root) => {
  /** @type {any} */
  let node = root;
  // console.log("\nNEW WALK\n========\n\n", segments);
  const { length } = segments;
  for (let index = 0; index < length; index += 1) {
    const segment = segments[index];
    if (hasOwn(node, segment)) {
      node = node[segment];
      if (typeof node !== "object" || node === null) {
        // console.log({ segment, node });
        return null;
      }
    } else {
      // console.log({ segment, node });
      return null;
    }
  }
  return node;
};
/* eslint-enable local/no-impure */
