import { map, show } from "./util/index.mjs";

const {
  TypeError,
  SyntaxError,
  Array: {
    isArray,
    prototype: { join, slice },
  },
  Object: { hasOwn },
  Reflect: { apply },
} = globalThis;

const BUDGET = 70;

const MAX_LENGTH = 5;

/**
 * @type {typeof import("./error").EstreeSentryTypeError}
 */
export const EstreeSentryTypeError = class extends TypeError {
  constructor(/** @type {never} */ cause) {
    super("unsound type");
    this.name = "EstreeSentrySyntaxError";
    this.cause = /** @type {unknown} */ (cause);
  }
};

/**
 * @type {typeof import("./error").EstreeSentrySyntaxError}
 */
export const EstreeSentrySyntaxError = class extends SyntaxError {
  constructor(/** @type {import("./error").SyntaxErrorCause} */ cause) {
    super(formatSyntaxErrorMessage(cause));
    this.name = "EstreeSentrySyntaxError";
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
    throw new EstreeSentryTypeError(expect);
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
