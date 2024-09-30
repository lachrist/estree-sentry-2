import { getRecord, getSingleton, getString } from "../access.mjs";
import { KEYWORD_RECORD } from "../keyword.mjs";

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax/identifier").VariableIdentifier<{}>
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
  name: /** @type {import("../syntax/identifier").VariableName} */ (
    getString(node, "name", path, kind)
  ),
  ...annotate(node, path, kind),
});

/**
 * @type {import("../guard").Guard<
 *   import("../syntax/identifier").ConstructorIdentifier<{}>
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
 *   import("../syntax/identifier").KeywordIdentifier<{}>
 * >}
 */
export const guardKeywordIdentifier = (node, path, annotate) => {
  const kind = "KeywordIdentifier";
  return {
    type: getSingleton(node, "type", path, kind, "Identifier"),
    name: getRecord(node, "name", path, kind, KEYWORD_RECORD),
    ...annotate(node, path, kind),
  };
};

/**
 * @type {import("../guard").Guard<
 *   import("../syntax/identifier").VariableIdentifier<{}>
 * >}
 */
export const guardVariableIdentifier = (node, path, annotate) => {
  const kind = "VariableIdentifier";
  const type = getSingleton(node, "type", path, kind, "Identifier");
  return subguardVariableIdentifier(node, path, annotate, type, kind);
};

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax/identifier").SpecifierIdentifier<{}>
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
  name: /** @type {import("../syntax/identifier").SpecifierName} */ (
    getString(node, "name", path, kind)
  ),
  ...annotate(node, path, kind),
});

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax/identifier").PublicKeyIdentifier<{}>
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
  name: /** @type {import("../syntax/identifier").PublicKeyName} */ (
    getString(node, "name", path, kind)
  ),
  ...annotate(node, path, kind),
});

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax/identifier").PrivateKeyIdentifier<{}>
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
  name: /** @type {import("../syntax/identifier").PrivateKeyName} */ (
    getString(node, "name", path, kind)
  ),
  ...annotate(node, path, kind),
});

/**
 * @type {import("../guard").Guard<
 *   import("../syntax/identifier").LabelIdentifier<{}>
 * >}
 */
export const guardLabelIdentifier = (node, path, annotate) => {
  const kind = "LabelIdentifier";
  return {
    type: getSingleton(node, "type", path, kind, "Identifier"),
    name: /** @type {import("../syntax/identifier").LabelName} */ (
      getString(node, "name", path, kind)
    ),
    ...annotate(node, path, kind),
  };
};
