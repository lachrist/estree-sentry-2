import {
  getJsonPrimitive,
  getNull,
  getObject,
  getSingleton,
  getString,
  has,
} from "../access.mjs";

/**
 * @type {import("../guard").Guard<
 *   import("../syntax/literal").SourceLiteral<{}>
 * >}
 */
export const guardSourceLiteral = (node, path, annotate) => {
  const kind = "SourceLiteral";
  return {
    type: getSingleton(node, "type", path, kind, "Literal"),
    value: /** @type {import("../brand").SourceBrand} */ (
      getString(node, "value", path, kind)
    ),
    /* c8 ignore start */
    raw: has(node, "raw") ? getString(node, "raw", path, kind) : null,
    /* c8 ignore stop */
    bigint: getNull(node, "bigint", path, kind),
    regex: getNull(node, "regex", path, kind),
    ...annotate(node, path, kind),
  };
};

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax/literal").PublicKeyLiteral<{}>
 * >}
 */
export const subguardPublicKeyLiteral = (node, path, annotate, type, kind) => {
  if (has(node, "bigint")) {
    return {
      type,
      value: null,
      /* c8 ignore start */
      raw: has(node, "raw") ? getString(node, "raw", path, kind) : null,
      /* c8 ignore stop */
      bigint: getString(node, "bigint", path, kind),
      regex: getNull(node, "regex", path, kind),
      ...annotate(node, path, kind),
    };
  } else {
    return {
      type,
      value: /** @type {import("../brand").PublicKeyBrand} */ (
        getJsonPrimitive(node, "value", path, kind)
      ),
      /* c8 ignore start */
      raw: has(node, "raw") ? getString(node, "raw", path, kind) : null,
      /* c8 ignore stop */
      bigint: getNull(node, "bigint", path, kind),
      regex: getNull(node, "regex", path, kind),
      ...annotate(node, path, kind),
    };
  }
};

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax/literal").SpecifierLiteral<{}>
 * >}
 */
export const subguardSpecifierLiteral = (node, path, annotate, type, kind) => ({
  type,
  value: /** @type {import("../brand").SpecifierBrand} */ (
    getString(node, "value", path, kind)
  ),
  /* c8 ignore start */
  raw: has(node, "raw") ? getString(node, "raw", path, kind) : null,
  /* c8 ignore start */
  bigint: getNull(node, "bigint", path, kind),
  regex: getNull(node, "regex", path, kind),
  ...annotate(node, path, kind),
});

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax/literal").ExpressionLiteral<{}>
 * >}
 */
export const subguardExpressionLiteral = (node, path, annotate, type, kind) => {
  if (has(node, "bigint")) {
    return {
      type,
      value: null,
      raw: has(node, "raw") ? getString(node, "raw", path, kind) : null,
      bigint: getString(node, "bigint", path, kind),
      regex: getNull(node, "regex", path, kind),
      ...annotate(node, path, kind),
    };
  } else if (has(node, "regex")) {
    const regex = getObject(node, "regex", path, kind);
    return {
      type,
      value: null,
      /* c8 ignore start */
      raw: has(node, "raw") ? getString(node, "raw", path, kind) : null,
      /* c8 ignore stop */
      bigint: getNull(node, "bigint", path, kind),
      regex: {
        pattern: getString(regex, "pattern", path, kind),
        flags: getString(regex, "flags", path, kind),
      },
      ...annotate(node, path, kind),
    };
  } else {
    return {
      type,
      /* c8 ignore start */
      raw: has(node, "raw") ? getString(node, "raw", path, kind) : null,
      /* c8 ignore stop */
      value: getJsonPrimitive(node, "value", path, kind),
      bigint: getNull(node, "bigint", path, kind),
      regex: getNull(node, "bigint", path, kind),
      ...annotate(node, path, kind),
    };
  }
};
