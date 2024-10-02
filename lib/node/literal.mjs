import {
  getJsonPrimitive,
  getNull,
  getNumber,
  getNumberOrString,
  getObject,
  getSingleton,
  getString,
  has,
} from "../access.mjs";
import { EstreeSentryTypeError } from "../error.mjs";

/**
 * @type {import("../guard").Subguard<
 *   import("./literal").NullLiteral<{}>
 * >}
 */
export const subguardNullLiteral = (node, path, annotate, type, kind) => ({
  type,
  value: getSingleton(node, "value", path, kind, null),
  /* c8 ignore start */
  raw: has(node, "raw") ? getSingleton(node, "raw", path, kind, "null") : null,
  /* c8 ignore stop */
  bigint: getNull(node, "bigint", path, kind),
  regex: getNull(node, "regex", path, kind),
  ...annotate(node, path, kind),
});

/**
 * @type {import("../guard").Subguard<
 *   import("./literal").TrueLiteral<{}>
 * >}
 */
export const subguardTrueLiteral = (node, path, annotate, type, kind) => ({
  type,
  value: getSingleton(node, "value", path, kind, true),
  /* c8 ignore start */
  raw: has(node, "raw") ? getSingleton(node, "raw", path, kind, "true") : null,
  /* c8 ignore stop */
  bigint: getNull(node, "bigint", path, kind),
  regex: getNull(node, "regex", path, kind),
  ...annotate(node, path, kind),
});

/**
 * @type {import("../guard").Subguard<
 *   import("./literal").FalseLiteral<{}>
 * >}
 */
export const subguardFalseLiteral = (node, path, annotate, type, kind) => ({
  type,
  value: getSingleton(node, "value", path, kind, false),
  /* c8 ignore start */
  raw: has(node, "raw") ? getSingleton(node, "raw", path, kind, "false") : null,
  /* c8 ignore stop */
  bigint: getNull(node, "bigint", path, kind),
  regex: getNull(node, "regex", path, kind),
  ...annotate(node, path, kind),
});

/**
 * @type {import("../guard").Subguard<
 *   import("./literal").NumberLiteral<{}>
 * >}
 */
export const subguardNumberLiteral = (node, path, annotate, type, kind) => ({
  type,
  value: getNumber(node, "value", path, kind),
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
});

/**
 * @type {import("../guard").Subguard<
 *   import("./literal").StringLiteral<{}, string & any>
 * >}
 */
export const subguardStringLiteral = (node, path, annotate, type, kind) => ({
  type,
  value: getString(node, "value", path, kind),
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
});

/**
 * @type {import("../guard").Subguard<
 *   import("./literal").BigIntLiteral<{}, string & any>
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
  bigint: getString(node, "bigint", path, kind),
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
 *   import("./literal").Literal<{}>
 * >}
 */
export const subguardLiteral = (node, path, annotate, type, kind) => {
  if (has(node, "bigint")) {
    return subguardBigIntLiteral(node, path, annotate, type, kind);
  } else if (has(node, "regex")) {
    return subguardRegExpLiteral(node, path, annotate, type, kind);
  } else {
    const value = getJsonPrimitive(node, "value", path, kind);
    if (value === null) {
      return subguardNullLiteral(node, path, annotate, type, kind);
    } else if (value === true) {
      return subguardTrueLiteral(node, path, annotate, type, kind);
    } else if (value === false) {
      return subguardFalseLiteral(node, path, annotate, type, kind);
    } else if (typeof value === "number") {
      return subguardNumberLiteral(node, path, annotate, type, kind);
    } else if (typeof value === "string") {
      return subguardStringLiteral(node, path, annotate, type, kind);
    } /* c8 ignore start */ else {
      throw new EstreeSentryTypeError(value);
    } /* c8 ignore stop */
  }
};

/**
 * @type {import("../guard").Guard<
 *   import("./literal").SourceLiteral<{}>
 * >}
 */
export const guardSourceLiteral = (node, path, annotate) => {
  const kind = "SourceLiteral";
  const type = getSingleton(node, "type", path, kind, "Literal");
  return subguardStringLiteral(node, path, annotate, type, kind);
};

/**
 * @type {import("../guard").Subguard<
 *   import("./literal").SpecifierLiteral<{}>
 * >}
 */
export const subguardSpecifierLiteral = subguardStringLiteral;

/**
 * @type {import("../guard").Subguard<
 *   import("./literal").PublicKeyLiteral<{}>
 * >}
 */
export const subguardPublicKeyLiteral = (node, path, annotate, type, kind) => {
  if (has(node, "bigint")) {
    return subguardBigIntLiteral(node, path, annotate, type, kind);
  } else {
    const value = getNumberOrString(node, "value", path, kind);
    if (typeof value === "number") {
      return subguardNumberLiteral(node, path, annotate, type, kind);
    } else if (typeof value === "string") {
      return subguardStringLiteral(node, path, annotate, type, kind);
    } /* c8 ignore start */ else {
      throw new EstreeSentryTypeError(value);
    } /* c8 ignore stop */
  }
};
