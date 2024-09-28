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
    getString(node, "name", path, kind)
  ),
  ...annotate(node, path, kind),
});

/**
 * @type {import("../guard").Guard<
 *   import("../syntax").ConstructorIdentifier<{}>
 * >}
 */
export const guardConstructorIdentifier = (node, path, annotate) => {
  const kind = "ConstructorIdentifier";
  return {
    type: getSingleton(node, "type", path, kind, "Identifier"),
    name: getSingleton(node, "name", path, kind, "constructor"),
    ...annotate(node, path, kind),
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
    type: getSingleton(node, "type", path, kind, "Identifier"),
    name: /** @type {import("../keyword").Keyword} */ (
      getString(node, "name", path, kind)
    ),
    ...annotate(node, path, kind),
  };
};

/**
 * @type {import("../guard").Guard<
 *   import("../syntax").VariableIdentifier<{}>
 * >}
 */
export const guardVariableIdentifier = (node, path, annotate) => {
  const kind = "VariableIdentifier";
  const type = getSingleton(node, "type", path, kind, "Identifier");
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
    getString(node, "name", path, kind)
  ),
  ...annotate(node, path, kind),
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
    getString(node, "name", path, kind)
  ),
  ...annotate(node, path, kind),
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
    getString(node, "name", path, kind)
  ),
  ...annotate(node, path, kind),
});

/**
 * @type {import("../guard").Guard<
 *   import("../syntax").LabelIdentifier<{}>
 * >}
 */
export const guardLabelIdentifier = (node, path, annotate) => {
  const kind = "LabelIdentifier";
  return {
    type: getSingleton(node, "type", path, kind, "Identifier"),
    name: /** @type {import("../brand").LabelBrand} */ (
      getString(node, "name", path, kind)
    ),
    ...annotate(node, path, kind),
  };
};
