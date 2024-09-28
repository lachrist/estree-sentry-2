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
    type: getSingleton(node, "type", kind, path, "Literal"),
    value: /** @type {import("../brand").SourceBrand} */ (
      getString(node, "value", kind, path)
    ),
    bigint: getNull(node, "bigint", kind, path),
    regex: getNull(node, "regex", kind, path),
    ...annotate(node, kind, path),
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
      bigint: getString(node, "bigint", kind, path),
      regex: getNull(node, "regex", kind, path),
      ...annotate(node, kind, path),
    };
  } else {
    return {
      type,
      value: /** @type {import("../brand").PublicKeyBrand} */ (
        getString(node, "value", kind, path)
      ),
      bigint: getNull(node, "bigint", kind, path),
      regex: getNull(node, "regex", kind, path),
      ...annotate(node, kind, path),
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
    getString(node, "value", kind, path)
  ),
  bigint: getNull(node, "bigint", kind, path),
  regex: getNull(node, "regex", kind, path),
  ...annotate(node, kind, path),
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
      bigint: getString(node, "bigint", kind, path),
      regex: getNull(node, "regex", kind, path),
      ...annotate(node, kind, path),
    };
  } else if (has(node, "regex")) {
    const regex = getObject(node, "regex", kind, path);
    return {
      type,
      value: null,
      bigint: getNull(node, "bigint", kind, path),
      regex: {
        pattern: getString(regex, "pattern", kind, path),
        flags: getString(regex, "flags", kind, path),
      },
      ...annotate(node, kind, path),
    };
  } else {
    return {
      type,
      value: getJsonPrimitive(node, "value", kind, path),
      bigint: getNull(node, "bigint", kind, path),
      regex: getNull(node, "bigint", kind, path),
      ...annotate(node, kind, path),
    };
  }
};
