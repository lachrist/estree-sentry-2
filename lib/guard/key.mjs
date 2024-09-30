import { EstreeSentryTypeError } from "../error.mjs";
import { getDoubleton, getRecord, getTripleton, has } from "../access.mjs";
import {
  subguardPrivateKeyIdentifier,
  subguardPublicKeyIdentifier,
} from "./identifier.mjs";
import {
  KEY_IDENTIFIER_TYPE_RECORD,
  KEY_TYPE_RECORD,
  PUBLIC_KEY_TYPE_RECORD,
} from "../index.mjs";
import { subguardBigIntLiteral, subguardSimpleLiteral } from "./literal.mjs";

/**
 * @type {import("../guard").Guard<
 *   import("../syntax/key").Key<{}>
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
      if (has(node, "bigint")) {
        return subguardBigIntLiteral(node, path, annotate, type, kind);
      } else {
        return subguardSimpleLiteral(node, path, annotate, type, kind);
      }
    }
    /* c8 ignore start */
    default: {
      throw new EstreeSentryTypeError(type);
    }
    /* c8 ignore stop */
  }
};

/**
 * @type {import("../guard").Guard<
 *   import("../syntax/key").PublicKey<{}>
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
      if (has(node, "bigint")) {
        return subguardBigIntLiteral(node, path, annotate, type, kind);
      } else {
        return subguardSimpleLiteral(node, path, annotate, type, kind);
      }
    }
    /* c8 ignore start */
    default: {
      throw new EstreeSentryTypeError(type);
    }
    /* c8 ignore stop */
  }
};

/**
 * @type {import("../guard").Guard<
 *   import("../syntax/identifier").PublicKeyIdentifier<{}>
 * >}
 */
export const guardPublicKeyIdentifier = (node, path, annotate) => {
  const kind = "PublicKeyIdentifier";
  return subguardPublicKeyIdentifier(node, path, annotate, "Identifier", kind);
};

/**
 * @type {import("../guard").Guard<
 *   import("../syntax/key").KeyIdentifier<{}>
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
