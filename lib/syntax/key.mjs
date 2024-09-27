/**
 * @type {{[key in import("./key").PublicKey<{}>["type"]]: null}}
 */
export const PUBLIC_KEY_TYPE_RECORD = {
  Identifier: null,
  Literal: null,
};

/**
 * @type {{[key in import("./key").KeyIdentifier<{}>["type"]]: null}}
 */
export const KEY_IDENTIFIER_TYPE_RECORD = {
  Identifier: null,
  PrivateIdentifier: null,
};

/**
 * @type {{[key in import("./key").Key<{}>["type"]]: null}}
 */
export const KEY_TYPE_RECORD = {
  Identifier: null,
  Literal: null,
  PrivateIdentifier: null,
};
