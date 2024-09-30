import type { Keyword } from "../keyword";
import type { Brand } from "../util/brand";

// VariableIdentifier //

export type VariableName = Brand<string, "estree.VariableName">;

export type VariableIdentifier<X> = X & {
  type: "Identifier";
  name: VariableName;
};

// LabelIdentifier //

export type LabelName = Brand<string, "estree.LabelName">;

export type LabelIdentifier<X> = X & {
  type: "Identifier";
  name: LabelName;
};

// SpecifierIdentifier //

export type SpecifierName = Brand<string, "estree.SpecifierName">;

export type SpecifierIdentifier<X> = X & {
  type: "Identifier";
  name: SpecifierName;
};

// PublicKeyIdentifier //

export type PublicKeyName = Brand<string, "estree.PublicKeyName">;

export type PublicKeyIdentifier<X> = X & {
  type: "Identifier";
  name: PublicKeyName;
};

// PrivateKeyIdentifier //

export type PrivateKeyName = Brand<string, "estree.PrivateKeyName">;

export type PrivateKeyIdentifier<X> = X & {
  type: "PrivateIdentifier";
  name: PrivateKeyName;
};

// KeywordIdentifier //

export type KeywordIdentifier<X> = X & {
  type: "Identifier";
  name: Keyword;
};

// ConstructorIdentifier //

export type ConstructorIdentifier<X> = X & {
  type: "Identifier";
  name: "constructor";
};
