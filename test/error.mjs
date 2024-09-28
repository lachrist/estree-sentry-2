const {
  console: { dir },
} = /** @type {{console: import("./console").Console}}*/ (globalThis);

export class TestError extends Error {
  constructor(/** @type {string} */ message, /** @type {unknown} */ cause) {
    super(message);
    // dir(cause, { depth: 5 });
    this.cause = cause;
  }
}
