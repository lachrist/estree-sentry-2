import { getSingleton, getString } from "../access.mjs";

/**
 * @type {import("../guard").Subguard<
 *   import("../").VariableIdentifier<{}>
 * >}
 */
export const subguardVariableIdentifier = (
  node,
  path,
  annotate,
  type,
  kind,
) => ({
  type,
  name: /** @type {import("../").VariableBrand} */ (
    getString(node, "name", kind, path)
  ),
  ...annotate(node, kind, path),
});

/**
 * @type {import("../guard").Guard<
 *   import("../").ConstructorIdentifier<{}>
 * >}
 */
export const guardConstructorIdentifier = (node, path, annotate) => {
  const kind = "ConstructorIdentifier";
  return {
    type: getSingleton(node, "type", kind, path, "Identifier"),
    name: getSingleton(node, "name", kind, path, "constructor"),
    ...annotate(node, kind, path),
  };
};

/**
 * @type {import("../guard").Guard<
 *   import("../").KeywordIdentifier<{}>
 * >}
 */
export const guardKeywordIdentifier = (node, path, annotate) => {
  const kind = "KeywordIdentifier";
  return {
    type: getSingleton(node, "type", kind, path, "Identifier"),
    name: /** @type {import("../").Keyword} */ (
      getString(node, "name", kind, path)
    ),
    ...annotate(node, kind, path),
  };
};

/**
 * @type {import("../guard").Guard<
 *   import("../").VariableIdentifier<{}>
 * >}
 */
export const guardVariableIdentifier = (node, path, annotate) => {
  const kind = "VariableIdentifier";
  const type = getSingleton(node, "type", kind, path, "Identifier");
  return subguardVariableIdentifier(node, path, annotate, type, kind);
};

/**
 * @type {import("../guard").Subguard<
 *   import("../").SpecifierIdentifier<{}>
 * >}
 */
export const subguardSpecifierIdentifier = (
  node,
  path,
  annotate,
  type,
  kind,
) => ({
  type,
  name: /** @type {import("../").SpecifierBrand} */ (
    getString(node, "name", kind, path)
  ),
  ...annotate(node, kind, path),
});

/**
 * @type {import("../guard").Subguard<
 *   import("../").PublicKeyIdentifier<{}>
 * >}
 */
export const subguardPublicKeyIdentifier = (
  node,
  path,
  annotate,
  type,
  kind,
) => ({
  type,
  name: /** @type {import("../").PublicKeyBrand} */ (
    getString(node, "name", kind, path)
  ),
  ...annotate(node, kind, path),
});

/**
 * @type {import("../guard").Subguard<
 *   import("../").PrivateKeyIdentifier<{}>
 * >}
 */
export const subguardPrivateKeyIdentifier = (
  node,
  path,
  annotate,
  type,
  kind,
) => ({
  type,
  name: /** @type {import("../").PrivateKeyBrand} */ (
    getString(node, "name", kind, path)
  ),
  ...annotate(node, kind, path),
});

/**
 * @type {import("../guard").Guard<
 *   import("../").LabelIdentifier<{}>
 * >}
 */
export const guardLabelIdentifier = (node, path, annotate) => {
  const kind = "LabelIdentifier";
  return {
    type: getSingleton(node, "type", kind, path, "Identifier"),
    name: /** @type {import("../").LabelBrand} */ (
      getString(node, "name", kind, path)
    ),
    ...annotate(node, kind, path),
  };
};
