const {
  String,
  String: {
    prototype: { slice: sliceString },
  },
  Array,
  Array: { isArray },
  Object: { hasOwn },
  JSON: { stringify },
  Reflect: { apply, ownKeys: listKey },
  RegExp: {
    prototype: { test: testRegExp },
  },
} = globalThis;

/**
 * @type {<X, Y>(
 *   array: X[],
 *   transform: (
 *     item: X,
 *     index: number,
 *   ) => Y,
 * ) => Y[]};
 */
export const map = (array, transform) => {
  const { length } = array;
  const result = new Array(length);
  for (let index = 0; index < length; index++) {
    result[index] = transform(array[index], index);
  }
  return result;
};

/**
 * @type {<X, Y>(
 *   array: [X],
 *   transform: (
 *     item: X,
 *     index: number,
 *   ) => Y,
 * ) => [Y]};
 */
export const mapSingleton = (array, transform) => [transform(array[0], 0)];

/**
 * @type {<X, Y extends X>(
 *   array: X[],
 *   predicate: (
 *     item: X,
 *     index: number,
 *   ) => item is Y,
 * ) => Y[]};
 */
export const filter = (array, predicate) => {
  const { length } = array;
  const result = new Array(length);
  let current = 0;
  for (let index = 0; index < length; index++) {
    const item = array[index];
    if (predicate(item, index)) {
      result[current++] = item;
    }
  }
  result.length = current;
  return result;
};

/**
 * @type {<X>(
 *   x: X | null
 * ) => x is X}
 */
export const isNotNull = (x) => x !== null;

/**
 * @type {(
 *   string: string,
 *   max_length: number,
 * ) => string}
 */
export const truncate = (string, max_length) =>
  string.length <= max_length
    ? string
    : apply(sliceString, string, [0, max_length]) + "...";

/**
 * @type {(
 *   value: unknown,
 *   budget: number,
 * ) => string}
 */
export const show = (value, budget) => {
  if (typeof value === "string") {
    return truncate(stringify(value), budget);
  } else if (typeof value === "function") {
    if (
      hasOwn(value, "name") &&
      "name" in value &&
      typeof value.name === "string" &&
      apply(testRegExp, /^[a-zA-Z0-9_$]+$/, [value.name])
    ) {
      return `<function ${truncate(value.name, budget)}>`;
    } else {
      return "<function>";
    }
  } else if (typeof value === "object" && value !== null) {
    if (isArray(value)) {
      if (value.length === 0) {
        return "[]";
      } else if (value.length === 1) {
        return `[${show(value[0], budget)}]`;
      } else if (value.length === 2) {
        return `[${show(value[0], budget / 2)}, ${show(value[1], budget / 2)}]`;
      } else {
        return `[${show(value[0], budget / 2)}, ${show(value[1], budget / 2)}, ...]`;
      }
    } else {
      const keys = listKey(value);
      if (keys.length === 0) {
        return "{}";
      } else {
        const key = keys[0];
        const val = /** @type {any} */ (value)[key];
        if (keys.length === 1) {
          return `{${show(key, budget / 3)}: ${show(val, (2 * budget) / 3)}}`;
        } else {
          return `{${show(key, budget / 3)}: ${show(val, (2 * budget) / 3)}, ...}`;
        }
      }
    }
  } else {
    return String(value);
  }
};
