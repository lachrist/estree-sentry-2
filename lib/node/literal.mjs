import {
  getJsonPrimitive,
  getNull,
  getObject,
  getSingleton,
  getString,
  has,
} from "../access.mjs";
import { EstreeSentrySyntaxError } from "../error.mjs";

/**
 * @type {import("../guard").Subguard<
 *   import("./literal").SimpleLiteral<{}>
 * >}
 */
export const subguardSimpleLiteral = (node, path, annotate, type, kind) => {
  const value = getJsonPrimitive(node, "value", path, kind);
  if (value === null) {
    return {
      type,
      value,
      /* c8 ignore start */
      raw: has(node, "raw")
        ? getSingleton(node, "raw", path, kind, "null")
        : null,
      /* c8 ignore stop */
      bigint: getNull(node, "bigint", path, kind),
      regex: getNull(node, "regex", path, kind),
      ...annotate(node, path, kind),
    };
  } else if (value === true) {
    return {
      type,
      value,
      /* c8 ignore start */
      raw: has(node, "raw")
        ? getSingleton(node, "raw", path, kind, "true")
        : null,
      /* c8 ignore stop */
      bigint: getNull(node, "bigint", path, kind),
      regex: getNull(node, "regex", path, kind),
      ...annotate(node, path, kind),
    };
  } else if (value === false) {
    return {
      type,
      value,
      /* c8 ignore start */
      raw: has(node, "raw")
        ? getSingleton(node, "raw", path, kind, "false")
        : null,
      /* c8 ignore stop */
      bigint: getNull(node, "bigint", path, kind),
      regex: getNull(node, "regex", path, kind),
      ...annotate(node, path, kind),
    };
  } else if (typeof value === "number") {
    return {
      type,
      value: /** @type {import("./literal").NumberValue} */ (value),
      /* c8 ignore start */
      raw: has(node, "raw")
        ? /** @type {import("./literal").NumberRawValue} */ (
            getString(node, "raw", path, kind)
          )
        : null,
      /* c8 ignore stop */
      bigint: getNull(node, "bigint", path, kind),
      regex: getNull(node, "regex", path, kind),
      ...annotate(node, path, kind),
    };
  } else if (typeof value === "string") {
    return {
      type,
      value: /** @type {import("./literal").StringValue} */ (value),
      /* c8 ignore start */
      raw: has(node, "raw")
        ? /** @type {import("./literal").StringRawValue} */ (
            getString(node, "raw", path, kind)
          )
        : null,
      /* c8 ignore stop */
      bigint: getNull(node, "bigint", path, kind),
      regex: getNull(node, "regex", path, kind),
      ...annotate(node, path, kind),
    };
  } /* c8 ignore start */ else {
    throw new EstreeSentrySyntaxError(value);
  } /* c8 ignore stop */
};

/**
 * @type {import("../guard").Subguard<
 *   import("./literal").BigIntLiteral<{}>
 * >}
 */
export const subguardBigIntLiteral = (node, path, annotate, type, kind) => ({
  type,
  value: null,
  /* c8 ignore start */
  raw: has(node, "raw")
    ? /** @type {import("./literal").BigIntRawValue} */ (
        getString(node, "raw", path, kind)
      )
    : null,
  /* c8 ignore stop */
  bigint: /** @type {import("./literal").BigIntRepresentation} */ (
    getString(node, "bigint", path, kind)
  ),
  regex: getNull(node, "regex", path, kind),
  ...annotate(node, path, kind),
});

/**
 * @type {import("../guard").Subguard<
 *   import("./literal").RegExpLiteral<{}>
 * >}
 */
export const subguardRegExpLiteral = (node, path, annotate, type, kind) => {
  const regex = getObject(node, "regex", path, kind);
  return {
    type,
    value: null,
    /* c8 ignore start */
    raw: has(node, "raw")
      ? /** @type {import("./literal").RegExpRawValue} */ (
          getString(node, "raw", path, kind)
        )
      : null,
    /* c8 ignore stop */
    bigint: getNull(node, "bigint", path, kind),
    regex: {
      pattern: /** @type {import("./literal").RegExpPattern} */ (
        getString(regex, "pattern", path, kind)
      ),
      flags: /** @type {import("./literal").RegExpFlagList} */ (
        getString(regex, "flags", path, kind)
      ),
    },
    ...annotate(node, path, kind),
  };
};

/**
 * @type {import("../guard").Subguard<
 *   import("./literal").ExpressionLiteral<{}>
 * >}
 */
export const subguardExpressionLiteral = (node, path, annotate, type, kind) => {
  if (has(node, "bigint")) {
    return subguardBigIntLiteral(node, path, annotate, type, kind);
  } else if (has(node, "regex")) {
    return subguardRegExpLiteral(node, path, annotate, type, kind);
  } else {
    return subguardSimpleLiteral(node, path, annotate, type, kind);
  }
};

/**
 * @type {import("../guard").Guard<
 *   import("./literal").SourceLiteral<{}>
 * >}
 */
export const guardSourceLiteral = (node, path, annotate) => {
  const kind = "SourceLiteral";
  return {
    type: getSingleton(node, "type", path, kind, "Literal"),
    value: /** @type {import("./literal").SourceValue} */ (
      getString(node, "value", path, kind)
    ),
    /* c8 ignore start */
    raw: has(node, "raw")
      ? /** @type {import("./literal").SourceRawValue } */ (
          getString(node, "raw", path, kind)
        )
      : null,
    /* c8 ignore stop */
    bigint: getNull(node, "bigint", path, kind),
    regex: getNull(node, "regex", path, kind),
    ...annotate(node, path, kind),
  };
};

/**
 * @type {import("../guard").Subguard<
 *   import("./literal").SpecifierLiteral<{}>
 * >}
 */
export const subguardSpecifierLiteral = (node, path, annotate, type, kind) => ({
  type,
  value: /** @type {import("./literal").SpecifierValue} */ (
    getString(node, "value", path, kind)
  ),
  /* c8 ignore start */
  raw: has(node, "raw")
    ? /** @type {import("./literal").SpecifierRawValue} */ (
        getString(node, "raw", path, kind)
      )
    : null,
  /* c8 ignore start */
  bigint: getNull(node, "bigint", path, kind),
  regex: getNull(node, "regex", path, kind),
  ...annotate(node, path, kind),
});
