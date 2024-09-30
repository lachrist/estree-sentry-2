import type { PrivateKeyIdentifier, PublicKeyIdentifier } from "./identifier";
import type { BigIntLiteral, SimpleLiteral } from "./literal";

export type PublicKey<X> =
  | PublicKeyIdentifier<X>
  | BigIntLiteral<X>
  | SimpleLiteral<X>;

export type Key<X> =
  | PrivateKeyIdentifier<X>
  | PublicKeyIdentifier<X>
  | BigIntLiteral<X>
  | SimpleLiteral<X>;

export type KeyIdentifier<X> = PrivateKeyIdentifier<X> | PublicKeyIdentifier<X>;
