import { EstreexTypeError } from "../error.mjs";
import { getDoubleton, getRecord, getTripleton } from "../access.mjs";
import {
  subguardPrivateKeyIdentifier,
  subguardPublicKeyIdentifier,
} from "./identifier.mjs";
import { subguardPublicKeyLiteral } from "./literal.mjs";
import {
  KEY_IDENTIFIER_TYPE_RECORD,
  KEY_TYPE_RECORD,
  PUBLIC_KEY_TYPE_RECORD,
} from "../index.mjs";

/**
 * @type {import("../guard").Guard<
 *   import("../syntax").Key<{}>
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
    default: {
      throw new EstreexTypeError(type);
    }
  }
};

/**
 * @type {import("../guard").Guard<
 *   import("../syntax").PublicKey<{}>
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
    default: {
      throw new EstreexTypeError(type);
    }
  }
};

/**
 * @type {import("../guard").Guard<
 *   import("../syntax").PublicKeyIdentifier<{}>
 * >}
 */
export const guardPublicKeyIdentifier = (node, path, annotate) => {
  const kind = "PublicKeyIdentifier";
  return subguardPublicKeyIdentifier(node, path, annotate, "Identifier", kind);
};

/**
 * @type {import("../guard").Guard<
 *   import("../syntax").KeyIdentifier<{}>
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
    default: {
      throw new EstreexTypeError(type);
    }
  }
};
