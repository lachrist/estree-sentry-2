const { Array } = globalThis;

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
