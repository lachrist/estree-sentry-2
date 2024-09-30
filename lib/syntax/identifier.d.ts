import type {
  LabelBrand,
  SpecifierBrand,
  PrivateKeyBrand,
  PublicKeyBrand,
  VariableBrand,
} from "../brand";
import type { Keyword } from "../keyword";

export type PublicKeyIdentifier<X> = X & {
  type: "Identifier";
  name: PublicKeyBrand;
};

export type PrivateKeyIdentifier<X> = X & {
  type: "PrivateIdentifier";
  name: PrivateKeyBrand;
};

export type VariableIdentifier<X> = X & {
  type: "Identifier";
  name: VariableBrand;
};

export type LabelIdentifier<X> = X & {
  type: "Identifier";
  name: LabelBrand;
};

export type SpecifierIdentifier<X> = X & {
  type: "Identifier";
  name: SpecifierBrand;
};

export type KeywordIdentifier<X> = X & {
  type: "Identifier";
  name: Keyword;
};

export type ConstructorIdentifier<X> = X & {
  type: "Identifier";
  name: "constructor";
};
