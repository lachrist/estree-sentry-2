import { Brand } from "./util/brand";

export type LabelBrand = Brand<string, "estree.Label">;

export type SourceBrand = Brand<string, "estree.Source">;

export type VariableBrand = Brand<string, "estree.Variable">;

export type PublicKeyBrand = Brand<string, "estree.PublicKey">;

export type PrivateKeyBrand = Brand<string, "estree.PrivateKey">;

export type SpecifierBrand = Brand<string, "estree.Specifier">;
