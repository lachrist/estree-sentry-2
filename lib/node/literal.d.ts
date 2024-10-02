import type { Brand } from "../util/brand";

// Literal //

type StringValue = Brand<string, "estree.StringValue">;

type BigIntRepresentation = Brand<string, "estree.BigIntRepresentation">;

export type Literal<X> =
  | NullLiteral<X>
  | TrueLiteral<X>
  | FalseLiteral<X>
  | NumberLiteral<X>
  | StringLiteral<X, StringValue>
  | BigIntLiteral<X, BigIntRepresentation>
  | RegExpLiteral<X>;

// Specifier //

export type SpecifierValue = Brand<string, "estree.SpecifierValue">;

export type SpecifierLiteral<X> = StringLiteral<X, SpecifierValue>;

// Source //

export type SourceValue = Brand<string, "estree.SourceValue">;

export type SourceLiteral<X> = StringLiteral<X, SourceValue>;

// PublicKey //

export type PublicKeyValue = Brand<string, "estree.PublicKeyValue">;

export type PublicKeyLiteral<X> =
  | NumberLiteral<X>
  | StringLiteral<X, PublicKeyValue>
  | BigIntLiteral<X, PublicKeyValue>;

// NullLiteral //

export type NullLiteral<X> = X & {
  type: "Literal";
  value: null;
  raw: null | "null";
  bigint: null;
  regex: null;
};

// BooleanLiteran //

export type TrueLiteral<X> = X & {
  type: "Literal";
  value: true;
  raw: null | "true";
  bigint: null;
  regex: null;
};

export type FalseLiteral<X> = X & {
  type: "Literal";
  value: false;
  raw: null | "false";
  bigint: null;
  regex: null;
};

// StringLiteral //

export type StringRawValue = Brand<string, "estree.StringRawValue">;

export type StringLiteral<X, V extends string> = X & {
  type: "Literal";
  value: V;
  raw: null | StringRawValue;
  bigint: null;
  regex: null;
};

// NumberLiteral //

export type NumberRawValue = Brand<string, "estree.NumberRawValue">;

export type NumberLiteral<X> = X & {
  type: "Literal";
  value: number;
  raw: null | NumberRawValue;
  bigint: null;
  regex: null;
};

// BigIntLiteral //

export type BigIntRawValue = Brand<string, "estree.BigIntRawValue">;

export type BigIntLiteral<X, B extends string> = X & {
  type: "Literal";
  value: null;
  raw: null | BigIntRawValue;
  bigint: B;
  regex: null;
};

// RegExpLiteral //

export type RegExpRawValue = Brand<string, "estree.RegExpRawValue">;

export type RegExpPattern = Brand<string, "estree.RegExpPattern">;

export type RegExpFlagList = Brand<string, "estree.RegExpFlagList">;

// export type RegExpFlag = "d" | "g" | "i" | "m" | "s" | "u" | "v" | "y";
// // Type alias 'RegExpFlagList' circularly references itself.ts(2456)
// export type RegExpFlagList = `${RegExpFlag}${RegExpFlagList}`;

export type RegExpLiteral<X> = X & {
  type: "Literal";
  value: null;
  raw: null | RegExpRawValue;
  bigint: null;
  regex: {
    pattern: RegExpPattern;
    flags: RegExpFlagList;
  };
};
