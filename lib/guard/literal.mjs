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
 *   import("../syntax/literal").SimpleLiteral<{}>
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
      value: /** @type {import("../syntax/literal").NumberValue} */ (value),
      /* c8 ignore start */
      raw: has(node, "raw")
        ? /** @type {import("../syntax/literal").NumberRawValue} */ (
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
      value: /** @type {import("../syntax/literal").StringValue} */ (value),
      /* c8 ignore start */
      raw: has(node, "raw")
        ? /** @type {import("../syntax/literal").StringRawValue} */ (
            getString(node, "raw", path, kind)
          )
        : null,
      /* c8 ignore stop */
      bigint: getNull(node, "bigint", path, kind),
      regex: getNull(node, "regex", path, kind),
      ...annotate(node, path, kind),
    };
  } else {
    throw new EstreeSentrySyntaxError(value);
  }
};

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax/literal").BigIntLiteral<{}>
 * >}
 */
export const subguardBigIntLiteral = (node, path, annotate, type, kind) => ({
  type,
  value: null,
  raw: has(node, "raw")
    ? /** @type {import("../syntax/literal").BigIntRawValue} */ (
        getString(node, "raw", path, kind)
      )
    : null,
  bigint: /** @type {import("../syntax/literal").BigIntRepresentation} */ (
    getString(node, "bigint", path, kind)
  ),
  regex: getNull(node, "regex", path, kind),
  ...annotate(node, path, kind),
});

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax/literal").RegExpLiteral<{}>
 * >}
 */
export const subguardRegExpLiteral = (node, path, annotate, type, kind) => {
  const regex = getObject(node, "regex", path, kind);
  return {
    type,
    value: null,
    /* c8 ignore start */
    raw: has(node, "raw")
      ? /** @type {import("../syntax/literal").RegExpRawValue} */ (
          getString(node, "raw", path, kind)
        )
      : null,
    /* c8 ignore stop */
    bigint: getNull(node, "bigint", path, kind),
    regex: {
      pattern: /** @type {import("../syntax/literal").RegExpPattern} */ (
        getString(regex, "pattern", path, kind)
      ),
      flags: /** @type {import("../syntax/literal").RegExpFlagList} */ (
        getString(regex, "flags", path, kind)
      ),
    },
    ...annotate(node, path, kind),
  };
};

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax/literal").ExpressionLiteral<{}>
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
 *   import("../syntax/literal").SourceLiteral<{}>
 * >}
 */
export const guardSourceLiteral = (node, path, annotate) => {
  const kind = "SourceLiteral";
  return {
    type: getSingleton(node, "type", path, kind, "Literal"),
    value: /** @type {import("../syntax/literal").SourceValue} */ (
      getString(node, "value", path, kind)
    ),
    /* c8 ignore start */
    raw: has(node, "raw")
      ? /** @type {import("../syntax/literal").SourceRawValue } */ (
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
 *   import("../syntax/literal").SpecifierLiteral<{}>
 * >}
 */
export const subguardSpecifierLiteral = (node, path, annotate, type, kind) => ({
  type,
  value: /** @type {import("../syntax/literal").SpecifierValue} */ (
    getString(node, "value", path, kind)
  ),
  /* c8 ignore start */
  raw: has(node, "raw")
    ? /** @type {import("../syntax/literal").SpecifierRawValue} */ (
        getString(node, "raw", path, kind)
      )
    : null,
  /* c8 ignore start */
  bigint: getNull(node, "bigint", path, kind),
  regex: getNull(node, "regex", path, kind),
  ...annotate(node, path, kind),
});
