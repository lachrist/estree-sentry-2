import { EstreeSentrySyntaxError, EstreeSentryTypeError } from "./error.mjs";

/**
 * @type {(
 *   message: string
 * ) => void}
 */
const log = (message) => {
  // console.log(message);
};

new EstreeSentryTypeError(/** @type {never} */ (123));

const kind = /** @type {import("./kind").Kind} */ ("kind");

const path = /** @type {import("./path").Path} */ ("path");

log(
  new EstreeSentrySyntaxError({
    node: { loc: { start: { line: 123, column: 456 } } },
    prop: "prop",
    path,
    kind,
    actual: "actual",
    expect: "a string",
  }).message,
);

log(
  new EstreeSentrySyntaxError({
    node: {},
    prop: "prop",
    path,
    kind,
    actual: "actual",
    expect: [],
  }).message,
);

log(
  new EstreeSentrySyntaxError({
    node: {},
    prop: "prop",
    path,
    kind,
    actual: "actual",
    expect: ["expect"],
  }).message,
);

log(
  new EstreeSentrySyntaxError({
    node: {},
    prop: "prop",
    path,
    kind,
    actual: "actual",
    expect: ["expect1", "expect2"],
  }).message,
);

log(
  new EstreeSentrySyntaxError({
    node: {},
    prop: "prop",
    path,
    kind,
    actual: "actual",
    expect: ["expect1", "expect2", "expect3"],
  }).message,
);

log(
  new EstreeSentrySyntaxError({
    node: {},
    prop: "prop",
    path,
    kind,
    actual: "actual",
    expect: ["expect1", "expect2", "expect3", "expect4", "expect5", "expect6"],
  }).message,
);
