import type { PrivateKeyIdentifier, PublicKeyIdentifier } from "./identifier";
import type { PublicKeyLiteral } from "./literal";

export type PublicKey<X> = PublicKeyIdentifier<X> | PublicKeyLiteral<X>;

export type Key<X> =
  | PrivateKeyIdentifier<X>
  | PublicKeyIdentifier<X>
  | PublicKeyLiteral<X>;

export type KeyIdentifier<X> = PrivateKeyIdentifier<X> | PublicKeyIdentifier<X>;
