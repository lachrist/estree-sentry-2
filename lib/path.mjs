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
 *
 * Appends a segment to an existing path.
 *
 * @example
 * ```js
 * import { ROOT_PATH, joinPath } from "estree-sentry";
 * // returns: "$.body"
 * joinDeepPath(ROOT_PATH, "body");
 * ```
 *
 * @type {(
 *   path: import("./path").Path,
 *   segment: import("./path").Segment,
 * ) => import("./path").Path}
 */
export const joinPath = (path, segment) =>
  /** @type {import("./path").Path} */ (`${path}${SEP}${segment}`);

/**
 *
 * Appends two segments to an existing path.
 *
 * @example
 * ```js
 * import { ROOT_PATH, joinDeepPath } from "estree-sentry";
 * // returns: "$.body.0"
 * joinDeepPath(ROOT_PATH, "body", 0);
 * ```
 *
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

/**
 *
 * Splits a path relative to a base path. Returns null if the path is not
 * relative to the base path.
 *
 * @example
 * ```ts
 * import { splitPath, Path } from "estree-sentry";
 * // returns: ["left", "argument"]
 * splitPath(
 *   "$.body.0.expression.left.argument" as Path,
 *   "$.body.0.expression" as Path,
 * );
 * ```
 *
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

/**
 *
 * Fetches a node or an array of nodes from a root node or an array of root
 * nodes by following the segments of a path. Returns null if the target could
 * not be found.
 *
 * @example
 * ```ts
 * import { walkPath, VariableName } from "estree-sentry";
 * // returns: { type: 'Identifier', name: 'x' }
 * walkPath(["left", "argument"], {
 *   type: "LogicalExpression",
 *   operator: "&&",
 *   left: {
 *     type: "UnaryExpression",
 *     prefix: true,
 *     operator: "!",
 *     argument: {
 *       type: "Identifier",
 *       name: "x" as VariableName,
 *     },
 *   },
 *   right: {
 *     type: "Identifier",
 *     name:"y" as VariableName,
 *   },
 * });
 * ```
 *
 * @template A
 * Annotation type
 * @param {import("./path").Segment[]} segments
 * An array of segments which can be produced by `splitPath`.
 * @param {import("./node").Node<A> | import("./node").Node<A>[]} root
 * The root node or an array of root nodes from which to start walking the path.
 * @returns {null | import("./node").Node<A> | import("./node").Node<A>[]}
 * The target node or an array of target nodes if found, otherwise `null`.
 *
 */
export const walkPath = (segments, root) => {
  /** @type {any} */
  let node = root;
  const { length } = segments;
  for (let index = 0; index < length; index += 1) {
    const segment = segments[index];
    if (hasOwn(node, segment)) {
      node = node[segment];
      if (typeof node !== "object" || node === null) {
        return null;
      }
    } else {
      return null;
    }
  }
  return node;
};
