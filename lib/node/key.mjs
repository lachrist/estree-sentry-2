import { EstreeSentryTypeError } from "../error.mjs";
import { getRecord } from "../access.mjs";
import {
  subguardPrivateKeyIdentifier,
  subguardPublicKeyIdentifier,
} from "./identifier.mjs";
import { subguardPublicKeyLiteral } from "./literal.mjs";

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

/**
 * @type {import("../guard.js").Guard<
 *   import("./key.js").Key<{}>
 * >}
 */
export const guardKey = (node, path, annotate) => {
  const kind = "Key";
  const type = getRecord(node, "type", path, kind, KEY_TYPE_RECORD);
  switch (type) {
    case "Identifier": {
      return subguardPublicKeyIdentifier(node, path, annotate, type, kind);
    }
    case "PrivateIdentifier": {
      return subguardPrivateKeyIdentifier(node, path, annotate, type, kind);
    }
    case "Literal": {
      return subguardPublicKeyLiteral(node, path, annotate, type, kind);
    }
    /* c8 ignore start */
    default: {
      throw new EstreeSentryTypeError(type);
    }
    /* c8 ignore stop */
  }
};

/**
 * @type {import("../guard.js").Guard<
 *   import("./key.js").PublicKey<{}>
 * >}
 */
export const guardPublicKey = (node, path, annotate) => {
  const kind = "PublicKey";
  const type = getRecord(node, "type", path, kind, PUBLIC_KEY_TYPE_RECORD);
  switch (type) {
    case "Identifier": {
      return subguardPublicKeyIdentifier(node, path, annotate, type, kind);
    }
    case "Literal": {
      return subguardPublicKeyLiteral(node, path, annotate, type, kind);
    }
    /* c8 ignore start */
    default: {
      throw new EstreeSentryTypeError(type);
    }
    /* c8 ignore stop */
  }
};

/**
 * @type {import("../guard.js").Guard<
 *   import("./identifier.js").PublicKeyIdentifier<{}>
 * >}
 */
export const guardPublicKeyIdentifier = (node, path, annotate) => {
  const kind = "PublicKeyIdentifier";
  return subguardPublicKeyIdentifier(node, path, annotate, "Identifier", kind);
};

/**
 * @type {import("../guard.js").Guard<
 *   import("./key.js").KeyIdentifier<{}>
 * >}
 */
export const guardKeyIdentifier = (node, path, annotate) => {
  const kind = "KeyIdentifier";
  const type = getRecord(node, "type", path, kind, KEY_IDENTIFIER_TYPE_RECORD);
  switch (type) {
    case "Identifier": {
      return subguardPublicKeyIdentifier(node, path, annotate, type, kind);
    }
    case "PrivateIdentifier": {
      return subguardPrivateKeyIdentifier(node, path, annotate, type, kind);
    }
    /* c8 ignore start */
    default: {
      throw new EstreeSentryTypeError(type);
    }
    /* c8 ignore stop */
  }
};
