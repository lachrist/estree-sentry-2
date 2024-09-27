import { EstreexSyntaxError } from "./error.mjs";

const {
  undefined,
  String,
  Array: { isArray },
  Object: { hasOwn, getOwnPropertyNames },
  JSON: { stringify },
} = globalThis;

/**
 * @type {(
 *   primitive: import("./util/primitive").Primitive,
 * ) => string}
 */
const show = (primitive) =>
  typeof primitive === "string" ? stringify(primitive) : String(primitive);

/**
 * @type {(
 *   node: object,
 *   prop: string,
 * ) => boolean}
 */
export const has = (node, prop) =>
  hasOwn(node, prop) ? /** @type {any} */ (node)[prop] != null : false;

/**
 * @type {(
 *   node: object,
 *   prop: string,
 * ) => unknown}
 */
export const get = (node, prop) =>
  hasOwn(node, prop) ? /** @type {any} */ (node)[prop] : undefined;

/**
 * @type {(
 *   node: object,
 *   prop: string,
 *   kind: import("./kind").Kind,
 *   path: import("./path").Path,
 * ) => unknown[]}
 */
export const getArray = (node, prop, kind, path) => {
  const value = get(node, prop);
  if (isArray(value)) {
    return value;
  } else {
    throw new EstreexSyntaxError({
      node,
      prop,
      kind,
      path,
      expect: "an array",
      actual: value,
    });
  }
};

/* eslint-disable local/no-impure */
/**
 * @type {(
 *   node: object,
 *   prop: string,
 *   kind: import("./kind").Kind,
 *   path: import("./path").Path,
 * ) => object[]}
 */
export const getObjectArray = (node, prop, kind, path) => {
  const array = getArray(node, prop, kind, path);
  const { length } = array;
  for (let index = 0; index < length; index++) {
    if (typeof array[index] !== "object" || array[index] === null) {
      throw new EstreexSyntaxError({
        node,
        prop: `${prop}[${index}]`,
        kind,
        path,
        expect: "an object",
        actual: array[index],
      });
    }
  }
  return /** @type {object[]} */ (array);
};
/* eslint-enable local/no-impure */

/* eslint-disable local/no-impure */
/**
 * @type {(
 *   node: object,
 *   prop: string,
 *   kind: import("./kind").Kind,
 *    path: import("./path").Path,
 * ) => (object | null)[]}
 */
export const getNullableObjectArray = (node, prop, kind, path) => {
  const array = getArray(node, prop, kind, path);
  const { length } = array;
  for (let index = 0; index < length; index++) {
    if (typeof array[index] !== "object") {
      throw new EstreexSyntaxError({
        node,
        prop: `${prop}[${index}]`,
        path,
        kind,
        expect: "a nullable object",
        actual: array[index],
      });
    }
  }
  return /** @type {object[]} */ (array);
};
/* eslint-enable local/no-impure */

/**
 * @type {(
 *   node: object,
 *   prop: string,
 *   kind: import("./kind").Kind,
 *    path: import("./path").Path,
 * ) => object}
 */
export const getObject = (node, prop, kind, path) => {
  const value = get(node, prop);
  if (typeof value === "object" && value !== null) {
    return value;
  } else {
    throw new EstreexSyntaxError({
      node,
      prop,
      kind,
      path,
      expect: "an object",
      actual: value,
    });
  }
};

/**
 * @type {<K extends string>(
 *   node: object,
 *   prop: string,
 *   kind: import("./kind").Kind,
 *   path: import("./path").Path,
 *   record: { [key in K]: null },
 * ) => K}
 */
export const getRecord = (node, prop, kind, path, record) => {
  const value = get(node, prop);
  if (typeof value === "string" && hasOwn(record, value)) {
    return /** @type {any} */ (value);
  } else {
    throw new EstreexSyntaxError({
      node,
      prop,
      kind,
      path,
      expect: getOwnPropertyNames(record),
      actual: value,
    });
  }
};

/**
 * @type {(
 *   node: object,
 *   prop: string,
 *   kind: import("./kind").Kind,
 *   path: import("./path").Path,
 * ) => boolean}
 */
export const getBoolean = (node, prop, kind, path) => {
  const value = get(node, prop);
  if (typeof value === "boolean") {
    return value;
  } else if (value === undefined) {
    return false;
  } else {
    throw new EstreexSyntaxError({
      node,
      prop,
      kind,
      path,
      expect: "a boolean or undefined",
      actual: value,
    });
  }
};

/**
 * @type {(
 *   node: object,
 *   prop: string,
 *   kind: import("./kind").Kind,
 *   path: import("./path").Path,
 * ) => false}
 */
export const getFalse = (node, prop, kind, path) => {
  const value = get(node, prop);
  if (value === false || value === undefined) {
    return false;
  } else {
    throw new EstreexSyntaxError({
      node,
      prop,
      kind,
      path,
      expect: "false or undefined",
      actual: value,
    });
  }
};

/**
 * @type {(
 *   node: object,
 *   prop: string,
 *   kind: import("./kind").Kind,
 *   path: import("./path").Path,
 * ) => true}
 */
export const getTrue = (node, prop, kind, path) => {
  const value = get(node, prop);
  if (value === true) {
    return value;
  } else {
    throw new EstreexSyntaxError({
      node,
      prop,
      kind,
      path,
      expect: "true",
      actual: value,
    });
  }
};

/**
 * @type {(
 *   node: object,
 *   prop: string,
 *   kind: import("./kind").Kind,
 *   path: import("./path").Path,
 * ) => string}
 */
export const getString = (node, prop, kind, path) => {
  const value = get(node, prop);
  if (typeof value === "string") {
    return value;
  } else {
    throw new EstreexSyntaxError({
      node,
      prop,
      kind,
      path,
      expect: "a string",
      actual: value,
    });
  }
};

/**
 * @type {(
 *   node: object,
 *   prop: string,
 *   kind: import("./kind").Kind,
 *   path: import("./path").Path,
 * ) => string | number}
 */
export const getStringOrNumber = (node, prop, kind, path) => {
  const value = get(node, prop);
  if (typeof value === "string" || typeof value === "number") {
    return value;
  } else {
    throw new EstreexSyntaxError({
      node,
      prop,
      kind,
      path,
      expect: "a string or number",
      actual: value,
    });
  }
};

/**
 * @type {(
 *   node: object,
 *   prop: string,
 *   kind: import("./kind").Kind,
 *   path: import("./path").Path,
 * ) => string | number | boolean | null}
 */
export const getJsonPrimitive = (node, prop, kind, path) => {
  const value = get(node, prop);
  if (
    value === null ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return value;
  } else {
    throw new EstreexSyntaxError({
      node,
      prop,
      kind,
      path,
      expect: "a JSON primitive",
      actual: value,
    });
  }
};

/**
 * @type {(
 *   node: object,
 *   prop: string,
 *   kind: import("./kind").Kind,
 *   path: import("./path").Path,
 * ) => null}
 */
export const getNull = (node, prop, kind, path) => {
  const value = get(node, prop);
  if (value == null) {
    return null;
  } else {
    throw new EstreexSyntaxError({
      node,
      prop,
      kind,
      path,
      expect: "null or undefined",
      actual: value,
    });
  }
};

/**
 * @type {<
 *   X extends import("./util/primitive").Primitive,
 * >(
 *   node: object,
 *   prop: string,
 *   kind: import("./kind").Kind,
 *   path: import("./path").Path,
 *   elem: X,
 * ) => X}
 */
export const getSingleton = (node, prop, kind, path, elem) => {
  const value = get(node, prop);
  switch (value) {
    case elem: {
      return elem;
    }
    default: {
      throw new EstreexSyntaxError({
        node,
        prop,
        kind,
        path,
        expect: [elem],
        actual: value,
      });
    }
  }
};

/**
 * @type {<
 *   X1 extends import("./util/primitive").Primitive,
 *   X2 extends import("./util/primitive").Primitive,
 * >(
 *   node: object,
 *   prop: string,
 *   kind: import("./kind").Kind,
 *   path: import("./path").Path,
 *   elem1: X1,
 *   elem2: X2,
 * ) => X1 | X2}
 */
export const getDoubleton = (node, prop, kind, path, elem1, elem2) => {
  const value = get(node, prop);
  switch (value) {
    case elem1: {
      return elem1;
    }
    case elem2: {
      return elem2;
    }
    default: {
      throw new EstreexSyntaxError({
        node,
        prop,
        kind,
        path,
        expect: [elem1, elem2],
        actual: value,
      });
    }
  }
};

/**
 * @type {<
 *   X1 extends import("./util/primitive").Primitive,
 *   X2 extends import("./util/primitive").Primitive,
 *   X3 extends import("./util/primitive").Primitive,
 * >(
 *   node: object,
 *   prop: string,
 *   kind: import("./kind").Kind,
 *   path: import("./path").Path,
 *   elem1: X1,
 *   elem2: X2,
 *   elem3: X3,
 * ) => X1 | X2 | X3}
 */
export const getTripleton = (node, prop, kind, path, elem1, elem2, elem3) => {
  const value = get(node, prop);
  switch (value) {
    case elem1: {
      return elem1;
    }
    case elem2: {
      return elem2;
    }
    case elem3: {
      return elem3;
    }
    default: {
      throw new EstreexSyntaxError({
        node,
        prop,
        kind,
        path,
        expect: [elem1, elem2, elem3],
        actual: value,
      });
    }
  }
};

/**
 * @type {<
 *   X1 extends import("./util/primitive").Primitive,
 *   X2 extends import("./util/primitive").Primitive,
 *   X3 extends import("./util/primitive").Primitive,
 *   X4 extends import("./util/primitive").Primitive,
 * >(
 *   node: object,
 *   prop: string,
 *   kind: import("./kind").Kind,
 *   path: import("./path").Path,
 *   elem1: X1,
 *   elem2: X2,
 *   elem3: X3,
 *   elem4: X4,
 * ) => X1 | X2 | X3 | X4}
 */
export const getQuadrupleton = (
  node,
  prop,
  kind,
  path,
  elem1,
  elem2,
  elem3,
  elem4,
) => {
  const value = get(node, prop);
  switch (value) {
    case elem1: {
      return elem1;
    }
    case elem2: {
      return elem2;
    }
    case elem3: {
      return elem3;
    }
    case elem4: {
      return elem4;
    }
    default: {
      throw new EstreexSyntaxError({
        node,
        prop,
        kind,
        path,
        expect: [elem1, elem2, elem3, elem4],
        actual: value,
      });
    }
  }
};
