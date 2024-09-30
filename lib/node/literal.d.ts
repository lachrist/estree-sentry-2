import type { Brand } from "../util/brand";

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
  | StringLiteral<X>
  | NumberLiteral<X>
  | BooleanLiteral<X>
  | NullLiteral<X>
  | BigIntLiteral<X>;

// NulLiteral //

export type NullLiteral<X> = X & {
  type: "Literal";
  value: null;
  raw: null | "null";
  bigint: null;
  regex: null;
};

// BooleanLiteran //

export type BooleanLiteral<X> = TrueLiteral<X> | FalseLiteral<X>;

export type TrueLiteral<X> = X & {
  type: "Literal";
  value: true;
  raw: null | "true";
  bigint: null;
  regex: null;
};

export type FalseLiteral<X> = X & {
  type: "Literal";
  value: boolean;
  raw: null | "false";
  bigint: null;
  regex: null;
};

// StringLiteral //

export type StringValue = Brand<string, "estree.StringValue">;

export type StringRawValue = Brand<string, "estree.StringRawValue">;

export type StringLiteral<X> = X & {
  type: "Literal";
  value: StringValue;
  raw: null | StringRawValue;
  bigint: null;
  regex: null;
};

// NumberLiteral //

export type NumberValue = Brand<number, "estree.NumberValue">;

export type NumberRawValue = Brand<string, "estree.NumberRawValue">;

export type NumberLiteral<X> = X & {
  type: "Literal";
  value: NumberValue;
  raw: null | NumberRawValue;
  bigint: null;
  regex: null;
};

// BigIntLiteral //

export type BigIntRepresentation = Brand<string, "estree.BigIntValue">;

export type BigIntRawValue = Brand<string, "estree.BigIntRawValue">;

export type BigIntLiteral<X> = X & {
  type: "Literal";
  value: null;
  raw: null | BigIntRawValue;
  bigint: BigIntRepresentation;
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

// SourceLiteral //

export type SourceValue = Brand<string, "estree.SourceValue">;

export type SourceRawValue = Brand<string, "estree.SourceRawValue">;

export type SourceLiteral<X> = X & {
  type: "Literal";
  value: SourceValue;
  raw: null | SourceRawValue;
  bigint: null;
  regex: null;
};

// SpecifierLiteral //

export type SpecifierValue = Brand<string, "estree.SpecifierValue">;

export type SpecifierRawValue = Brand<string, "estree.SpecifierRawValue">;

export type SpecifierLiteral<X> = X & {
  type: "Literal";
  value: SpecifierValue;
  raw: null | SpecifierRawValue;
  bigint: null;
  regex: null;
};
