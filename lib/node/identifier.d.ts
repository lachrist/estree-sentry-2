import type { Keyword } from "../keyword";
import type { Brand } from "../util/brand";

export type Identifier<X, N extends string> = X & {
  type: "Identifier";
  name: N;
};

export type PrivateIdentifier<X, N extends string> = X & {
  type: "PrivateIdentifier";
  name: N;
};

// VariableIdentifier //

export type VariableName = Brand<string, "estree.VariableName">;

export type VariableIdentifier<X> = Identifier<X, VariableName>;

// LabelIdentifier //

export type LabelName = Brand<string, "estree.LabelName">;

export type LabelIdentifier<X> = Identifier<X, LabelName>;

// SpecifierIdentifier //

export type SpecifierName = Brand<string, "estree.SpecifierName">;

export type SpecifierIdentifier<X> = Identifier<X, SpecifierName>;

// PublicKeyIdentifier //

export type PublicKeyName = Brand<string, "estree.PublicKeyName">;

export type PublicKeyIdentifier<X> = Identifier<X, PublicKeyName>;

// PrivateKeyIdentifier //

export type PrivateKeyName = Brand<string, "estree.PrivateKeyName">;

export type PrivateKeyIdentifier<X> = PrivateIdentifier<X, PrivateKeyName>;

// KeywordIdentifier //

export type KeywordIdentifier<X> = Identifier<X, Keyword>;

// ConstructorIdentifier //

export type ConstructorIdentifier<X> = Identifier<X, "constructor">;
