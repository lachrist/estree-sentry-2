import type { SpecifierBrand, PublicKeyBrand, SourceBrand } from "../brand";

export type ExpressionLiteral<X> =
  | SimpleLiteral<X>
  | BigIntLiteral<X>
  | RegExpLiteral<X>;

export type SimpleLiteral<X> =
  | StringLiteral<X>
  | NumberLiteral<X>
  | BooleanLiteral<X>
  | NullLiteral<X>;

export type PublicKeyLiteral<X> =
  | PublicObjectKeyStringLiteral<X>
  | NumberLiteral<X>
  | BooleanLiteral<X>
  | NullLiteral<X>
  | BigIntLiteral<X>;

export type SourceLiteral<X> = X & {
  type: "Literal";
  value: SourceBrand;
  bigint: null;
  regex: null;
};

export type SpecifierLiteral<X> = X & {
  type: "Literal";
  value: SpecifierBrand;
  bigint: null;
  regex: null;
};

export type PublicObjectKeyStringLiteral<X> = X & {
  type: "Literal";
  value: PublicKeyBrand;
  bigint: null;
  regex: null;
};

export type StringLiteral<X> = X & {
  type: "Literal";
  value: string;
  bigint: null;
  regex: null;
};

export type NumberLiteral<X> = X & {
  type: "Literal";
  value: number;
  bigint: null;
  regex: null;
};

export type NullLiteral<X> = X & {
  type: "Literal";
  value: null;
  bigint: null;
  regex: null;
};

export type BooleanLiteral<X> = X & {
  type: "Literal";
  value: boolean;
  bigint: null;
  regex: null;
};

export type BigIntLiteral<X> = X & {
  type: "Literal";
  value: null;
  bigint: string;
  regex: null;
};

export type RegExpLiteral<X> = X & {
  type: "Literal";
  value: null;
  bigint: null;
  regex: {
    pattern: string;
    flags: string;
  };
};
