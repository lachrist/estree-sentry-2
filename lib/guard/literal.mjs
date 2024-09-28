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
 *   import("../syntax").SourceLiteral<{}>
 * >}
 */
export const guardSourceLiteral = (node, path, annotate) => {
  const kind = "SourceLiteral";
  return {
    type: getSingleton(node, "type", path, kind, "Literal"),
    value: /** @type {import("../brand").SourceBrand} */ (
      getString(node, "value", path, kind)
    ),
    raw: has(node, "raw") ? getString(node, "raw", path, kind) : null,
    bigint: getNull(node, "bigint", path, kind),
    regex: getNull(node, "regex", path, kind),
    ...annotate(node, path, kind),
  };
};

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax").PublicKeyLiteral<{}>
 * >}
 */
export const subguardPublicKeyLiteral = (node, path, annotate, type, kind) => {
  if (has(node, "bigint")) {
    return {
      type,
      value: null,
      raw: has(node, "raw") ? getString(node, "raw", path, kind) : null,
      bigint: getString(node, "bigint", path, kind),
      regex: getNull(node, "regex", path, kind),
      ...annotate(node, path, kind),
    };
  } else {
    return {
      type,
      value: /** @type {import("../brand").PublicKeyBrand} */ (
        getString(node, "value", path, kind)
      ),
      raw: has(node, "raw") ? getString(node, "raw", path, kind) : null,
      bigint: getNull(node, "bigint", path, kind),
      regex: getNull(node, "regex", path, kind),
      ...annotate(node, path, kind),
    };
  }
};

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax").SpecifierLiteral<{}>
 * >}
 */
export const subguardSpecifierLiteral = (node, path, annotate, type, kind) => ({
  type,
  value: /** @type {import("../brand").SpecifierBrand} */ (
    getString(node, "value", path, kind)
  ),
  raw: has(node, "raw") ? getString(node, "raw", path, kind) : null,
  bigint: getNull(node, "bigint", path, kind),
  regex: getNull(node, "regex", path, kind),
  ...annotate(node, path, kind),
});

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax").ExpressionLiteral<{}>
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
      raw: has(node, "raw") ? getString(node, "raw", path, kind) : null,
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
      raw: has(node, "raw") ? getString(node, "raw", path, kind) : null,
      value: getJsonPrimitive(node, "value", path, kind),
      bigint: getNull(node, "bigint", path, kind),
      regex: getNull(node, "bigint", path, kind),
      ...annotate(node, path, kind),
    };
  }
};
