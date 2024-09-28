import { getSingleton, getString } from "../access.mjs";

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax").VariableIdentifier<{}>
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
  name: /** @type {import("../brand").VariableBrand} */ (
    getString(node, "name", kind, path)
  ),
  ...annotate(node, kind, path),
});

/**
 * @type {import("../guard").Guard<
 *   import("../syntax").ConstructorIdentifier<{}>
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
 *   import("../syntax").KeywordIdentifier<{}>
 * >}
 */
export const guardKeywordIdentifier = (node, path, annotate) => {
  const kind = "KeywordIdentifier";
  return {
    type: getSingleton(node, "type", kind, path, "Identifier"),
    name: /** @type {import("../keyword").Keyword} */ (
      getString(node, "name", kind, path)
    ),
    ...annotate(node, kind, path),
  };
};

/**
 * @type {import("../guard").Guard<
 *   import("../syntax").VariableIdentifier<{}>
 * >}
 */
export const guardVariableIdentifier = (node, path, annotate) => {
  const kind = "VariableIdentifier";
  const type = getSingleton(node, "type", kind, path, "Identifier");
  return subguardVariableIdentifier(node, path, annotate, type, kind);
};

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax").SpecifierIdentifier<{}>
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
  name: /** @type {import("../brand").SpecifierBrand} */ (
    getString(node, "name", kind, path)
  ),
  ...annotate(node, kind, path),
});

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax").PublicKeyIdentifier<{}>
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
  name: /** @type {import("../brand").PublicKeyBrand} */ (
    getString(node, "name", kind, path)
  ),
  ...annotate(node, kind, path),
});

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax").PrivateKeyIdentifier<{}>
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
  name: /** @type {import("../brand").PrivateKeyBrand} */ (
    getString(node, "name", kind, path)
  ),
  ...annotate(node, kind, path),
});

/**
 * @type {import("../guard").Guard<
 *   import("../syntax").LabelIdentifier<{}>
 * >}
 */
export const guardLabelIdentifier = (node, path, annotate) => {
  const kind = "LabelIdentifier";
  return {
    type: getSingleton(node, "type", kind, path, "Identifier"),
    name: /** @type {import("../brand").LabelBrand} */ (
      getString(node, "name", kind, path)
    ),
    ...annotate(node, kind, path),
  };
};
