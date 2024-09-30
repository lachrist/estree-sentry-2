const { Error } = globalThis;

export class TestError extends Error {
  constructor(/** @type {string} */ message, /** @type {unknown} */ cause) {
    super(message);
    this.cause = cause;
  }
}
