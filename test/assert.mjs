import { TestError } from "./error.mjs";

const {
  JSON: { stringify },
} = globalThis;

/**
 * @type {(
 *   actual: unknown,
 *   expect: unknown,
 * ) => void}
 */
export const assertEqual = (actual, expect) => {
  if (actual !== expect) {
    throw new TestError("not equal", { actual, expect });
  }
};

/**
 * @type {(
 *   actual: unknown,
 *   expect: unknown,
 * ) => void}
 */
export const assertDeepEqual = (actual, expect) => {
  const actual_hash = stringify(actual);
  const expect_hash = stringify(expect);
  if (actual_hash !== expect_hash) {
    throw new TestError("not deep equal", {
      actual,
      expect,
      actual_hash,
      expect_hash,
    });
  }
};

/**
 * @type {(
 *   callback: Function,
 *   Error: Function,
 * ) => void}
 */
export const assertThrow = (callback, Error) => {
  let thrown = false;
  try {
    callback();
  } catch (error) {
    if (error instanceof Error) {
      thrown = true;
    } else {
      throw error;
    }
  }
  if (!thrown) {
    throw new TestError("missing thrown error", { callback });
  }
};
