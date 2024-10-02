import { getRecord, getSingleton, getString } from "../access.mjs";
import { KEYWORD_RECORD } from "../keyword.mjs";

// Identifier //

/**
 * @type {import("../guard").Subguard<
 *   import("./identifier").Identifier<
 *     {},
 *     string & any,
 *   >,
 * >}
 */
const subguardIdentifier = (node, path, annotate, type, kind) => ({
  type,
  name: getString(node, "name", path, kind),
  ...annotate(node, path, kind),
});

/**
 * @type {import("../guard").Subguard<
 *   import("./identifier").VariableIdentifier<{}>
 * >}
 */
export const subguardVariableIdentifier = subguardIdentifier;

/**
 * @type {import("../guard").Guard<
 *   import("./identifier").VariableIdentifier<{}>
 * >}
 */
export const guardVariableIdentifier = (node, path, annotate) => {
  const kind = "VariableIdentifier";
  const type = getSingleton(node, "type", path, kind, "Identifier");
  return subguardVariableIdentifier(node, path, annotate, type, kind);
};

/**
 * @type {import("../guard").Subguard<
 *   import("./identifier").PublicKeyIdentifier<{}>
 * >}
 */
export const subguardPublicKeyIdentifier = subguardIdentifier;

/**
 * @type {import("../guard").Subguard<
 *   import("./identifier").SpecifierIdentifier<{}>
 * >}
 */
export const subguardSpecifierIdentifier = subguardIdentifier;

/**
 * @type {import("../guard").Guard<
 *   import("./identifier").LabelIdentifier<{}>
 * >}
 */
export const guardLabelIdentifier = (node, path, annotate) => {
  const kind = "LabelIdentifier";
  const type = getSingleton(node, "type", path, kind, "Identifier");
  return subguardIdentifier(node, path, annotate, type, kind);
};

// PrivateIdentifier //

/**
 * @type {import("../guard").Subguard<
 *   import("./identifier").PrivateIdentifier<
 *     {},
 *     string & any,
 *   >,
 * >}
 */
const subguardPrivateIdentifier = (node, path, annotate, type, kind) => ({
  type,
  name: getString(node, "name", path, kind),
  ...annotate(node, path, kind),
});

/**
 * @type {import("../guard").Subguard<
 *   import("./identifier").PrivateKeyIdentifier<{}>
 * >}
 */
export const subguardPrivateKeyIdentifier = subguardPrivateIdentifier;

// Constructor //

/**
 * @type {import("../guard").Guard<
 *   import("./identifier").ConstructorIdentifier<{}>
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

// KeywordIdentifier //

/**
 * @type {import("../guard").Guard<
 *   import("./identifier").KeywordIdentifier<{}>
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
