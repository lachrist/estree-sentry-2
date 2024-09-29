import { map, show } from "./util/index.mjs";

const {
  String,
  Array: {
    isArray,
    prototype: { join, slice },
  },
  Object: { hasOwn },
  JSON: { stringify },
  String: {
    prototype: { slice: sliceString },
  },
  Reflect: { apply, ownKeys: listKey },
  RegExp: {
    prototype: { test: testRegExp },
  },
} = globalThis;

const BUDGET = 70;

const MAX_LENGTH = 5;

export const PreciseEstreeTypeError = class extends TypeError {
  constructor(/** @type {never} */ cause) {
    super("unsound type");
    this.name = "PreciseEstreeSyntaxError";
    this.cause = /** @type {any} */ (cause);
  }
};

export const PreciseEstreeSyntaxError = class extends SyntaxError {
  constructor(/** @type {import("./error").SyntaxErrorCause} */ cause) {
    super(formatSyntaxErrorMessage(cause));
    this.name = "PreciseEstreeSyntaxError";
    this.cause = cause;
  }
};

/**
 * @type {(
 *   node: object,
 * ) => string}
 */
const locate = (node) => {
  if (hasOwn(node, "loc")) {
    const { loc } = /** @type {{loc:unknown}} */ (node);
    if (typeof loc === "object" && loc !== null && hasOwn(loc, "start")) {
      const { start } = /** @type {{start:unknown}} */ (loc);
      if (
        typeof start === "object" &&
        start !== null &&
        hasOwn(start, "line") &&
        hasOwn(start, "column")
      ) {
        const { line, column } =
          /** @type {{line: unknown, column: unknown}} */ (start);
        if (typeof line === "number" && typeof column === "number") {
          return `(${line}:${column}) `;
        }
      }
    }
  }
  return "";
};

/**
 * @type {(
 *   expect: string | import("./util/primitive").Primitive[],
 *   budget: number,
 * ) => string}
 */
const formatExpect = (expect, budget) => {
  if (typeof expect === "string") {
    return `a ${expect}`;
  } else if (isArray(expect)) {
    const { length } = expect;
    if (length === 0) {
      return "nothing";
    } else if (length === 1) {
      return `${show(expect[0], budget)}`;
    } else if (length === 2) {
      return `${show(expect[0], budget / 2)} or ${show(expect[1], budget / 2)}`;
    } else if (length <= MAX_LENGTH) {
      const item_budget = budget / length;
      return `one of: ${apply(
        join,
        map(expect, (item) => show(item, item_budget)),
        [", "],
      )}`;
    } else {
      const item_budget = budget / MAX_LENGTH;
      return `one of: ${apply(
        join,
        map(apply(slice, expect, [0, MAX_LENGTH]), (item) =>
          show(item, item_budget),
        ),
        [", "],
      )}, ...`;
    }
  } /* c8 ignore start */ else {
    throw new PreciseEstreeTypeError(expect);
  } /* c8 ignore stop */
};

/**
 * @type {(
 *   cause: import("./error").SyntaxErrorCause,
 * ) => string}
 */
const formatSyntaxErrorMessage = ({ node, path, kind, prop, expect, actual }) =>
  apply(
    join,
    [
      `${kind}.${prop} should be ${formatExpect(expect, BUDGET)}`,
      `got ${show(actual, BUDGET)}`,
      `at ${locate(node)}${path}`,
    ],
    ["\n  "],
  );
