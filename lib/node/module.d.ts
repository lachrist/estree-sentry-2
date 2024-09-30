import type { AnonymousClassDeclaration, ClassDeclaration } from "./class";
import { Declaration, VariableDeclaration } from "./declaration";
import type { Expression } from "./expression";
import type {
  AnonymousFunctionDeclaration,
  FunctionDeclaration,
} from "./function";
import type { SpecifierIdentifier, VariableIdentifier } from "./identifier";
import type { SpecifierLiteral, SourceLiteral } from "./literal";
import type { Statement } from "./statement";

export type ModuleStatement<X> = Statement<X> | ModuleDeclaration<X>;

export type ModuleDeclaration<X> =
  | ImportDeclaration<X>
  | ExportNamedDeclaration<X>
  | ExportDefaultDeclaration<X>
  | ExportAllDeclaration<X>;

export type Specifier<X> = SpecifierIdentifier<X> | SpecifierLiteral<X>;

export type ImportSpecifier<X> =
  | RegularImportSpecifier<X>
  | ImportDefaultSpecifier<X>
  | ImportNamespaceSpecifier<X>;

export type ExportNamedDeclaration<X> =
  | AggregateExportNamedDeclaration<X>
  | IndirectExportNamedDeclaration<X>
  | DirectExportNamedDeclaration<X>;

export type DefaultDeclaration<X> =
  | AnonymousFunctionDeclaration<X>
  | FunctionDeclaration<X>
  | AnonymousClassDeclaration<X>
  | ClassDeclaration<X>
  | Expression<X>;

export type ImportDeclaration<X> = X & {
  type: "ImportDeclaration";
  specifiers: Array<ImportSpecifier<X>>;
  source: SourceLiteral<X>;
};

export type RegularImportSpecifier<X> = X & {
  type: "ImportSpecifier";
  imported: Specifier<X>;
  local: VariableIdentifier<X>;
};

export type ImportDefaultSpecifier<X> = X & {
  type: "ImportDefaultSpecifier";
  local: VariableIdentifier<X>;
};

export type ImportNamespaceSpecifier<X> = X & {
  type: "ImportNamespaceSpecifier";
  local: VariableIdentifier<X>;
};

export type AggregateExportNamedDeclaration<X> = X & {
  type: "ExportNamedDeclaration";
  declaration: null;
  specifiers: AggregateExportSpecifier<X>[];
  source: SourceLiteral<X>;
};

export type IndirectExportNamedDeclaration<X> = X & {
  type: "ExportNamedDeclaration";
  declaration: null;
  specifiers: ExportSpecifier<X>[];
  source: null;
};

export type DirectExportNamedDeclaration<X> = X & {
  type: "ExportNamedDeclaration";
  declaration: Declaration<X>;
  specifiers: [];
  source: null;
};

export type AggregateExportSpecifier<X> = X & {
  type: "ExportSpecifier";
  exported: Specifier<X>;
  local: Specifier<X>;
};

export type ExportSpecifier<X> = X & {
  type: "ExportSpecifier";
  exported: Specifier<X>;
  local: VariableIdentifier<X>;
};

export type ExportDefaultDeclaration<X> = X & {
  type: "ExportDefaultDeclaration";
  declaration: DefaultDeclaration<X>;
};

export type ExportAllDeclaration<X> = X & {
  type: "ExportAllDeclaration";
  exported: Specifier<X> | null;
  source: SourceLiteral<X>;
};
