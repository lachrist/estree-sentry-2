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
