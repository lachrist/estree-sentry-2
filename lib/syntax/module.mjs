import { EXPRESSION_TYPE_RECORD } from "./expression.mjs";
import { STATEMENT_TYPE_RECORD } from "./statement.mjs";

/**
 * @type {{[key in import("./module").ModuleDeclaration<{}>["type"]]: null}}
 */
export const MODULE_DECLARATION_TYPE_RECORD = {
  ExportAllDeclaration: null,
  ExportDefaultDeclaration: null,
  ExportNamedDeclaration: null,
  ImportDeclaration: null,
};

/**
 * @type {{[key in import("./module").ModuleStatement<{}>["type"]]: null}}
 */
export const MODULE_STATEMENT_TYPE_RECORD = {
  ...MODULE_DECLARATION_TYPE_RECORD,
  ...STATEMENT_TYPE_RECORD,
};

/**
 * @type {{[key in import("./module").DefaultDeclaration<{}>["type"]]: null}}
 */
export const DEFAULT_DECLARATION_TYPE_RECORD = {
  ...EXPRESSION_TYPE_RECORD,
  FunctionDeclaration: null,
  ClassDeclaration: null,
};

/**
 * @type {{[key in import("./module").ImportSpecifier<{}>["type"]]: null}}
 */
export const IMPORT_SPECIFIER_TYPE_RECORD = {
  ImportDefaultSpecifier: null,
  ImportNamespaceSpecifier: null,
  ImportSpecifier: null,
};

/**
 * @type {{[key in import("./module").Specifier<{}>["type"]]: null}}
 */
export const SPECIFIER_TYPE_RECORD = {
  Identifier: null,
  Literal: null,
};
