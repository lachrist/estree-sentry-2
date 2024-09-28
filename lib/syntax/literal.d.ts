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

export type SourceLiteral<X> = (X extends null ? {} : X) & {
  type: "Literal";
  value: SourceBrand;
  raw: null | string;
  bigint: null;
  regex: null;
};

export type SpecifierLiteral<X> = (X extends null ? {} : X) & {
  type: "Literal";
  value: SpecifierBrand;
  raw: null | string;
  bigint: null;
  regex: null;
};

export type PublicObjectKeyStringLiteral<X> = (X extends null ? {} : X) & {
  type: "Literal";
  value: PublicKeyBrand;
  raw: null | string;
  bigint: null;
  regex: null;
};

export type StringLiteral<X> = (X extends null ? {} : X) & {
  type: "Literal";
  value: string;
  raw: null | string;
  bigint: null;
  regex: null;
};

export type NumberLiteral<X> = (X extends null ? {} : X) & {
  type: "Literal";
  value: number;
  raw: null | string;
  bigint: null;
  regex: null;
};

export type NullLiteral<X> = (X extends null ? {} : X) & {
  type: "Literal";
  value: null;
  raw: null | string;
  bigint: null;
  regex: null;
};

export type BooleanLiteral<X> = (X extends null ? {} : X) & {
  type: "Literal";
  value: boolean;
  raw: null | string;
  bigint: null;
  regex: null;
};

export type BigIntLiteral<X> = (X extends null ? {} : X) & {
  type: "Literal";
  value: null;
  raw: null | string;
  bigint: string;
  regex: null;
};

export type RegExpLiteral<X> = (X extends null ? {} : X) & {
  type: "Literal";
  value: null;
  raw: null | string;
  bigint: null;
  regex: {
    pattern: string;
    flags: string;
  };
};
