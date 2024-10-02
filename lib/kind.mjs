import { CHAINABLE_EXPRESSION_TYPE_RECORD } from "./node/chain.mjs";
import { CLASS_ENTRY_TYPE_RECORD } from "./node/class.mjs";
import { DECLARATION_TYPE_RECORD } from "./node/declaration.mjs";
import {
  DECLARABLE_EXPRESSION_TYPE_RECORD,
  EXPRESSION_TYPE_RECORD,
  PRIVATABLE_EXPRESSION_TYPE_RECORD,
  SPREADABLE_EXPRESSION_TYPE_RECORD,
  SUPERABLE_EXPRESSION_TYPE_RECORD,
} from "./node/expression.mjs";
import {
  KEY_IDENTIFIER_TYPE_RECORD,
  KEY_TYPE_RECORD,
  PUBLIC_KEY_TYPE_RECORD,
} from "./node/key.mjs";
import {
  DEFAULT_DECLARATION_TYPE_RECORD,
  IMPORT_SPECIFIER_TYPE_RECORD,
  MODULE_STATEMENT_TYPE_RECORD,
  SPECIFIER_TYPE_RECORD,
} from "./node/module.mjs";
import { SPREADABLE_OBJECT_PROPERTY_TYPE_RECORD } from "./node/object.mjs";
import {
  CALLABLE_PATTERN_TYPE_RECORD,
  CALLABLE_UPDATE_PATTERN_TYPE_RECORD,
  DECLARABLE_PATTERN_TYPE_RECORD,
  PATTERN_TYPE_RECORD,
  RESTABLE_PATTERN_PROPERTY_TYPE_RECORD,
  RESTABLE_PATTERN_TYPE_RECORD,
  UPDATE_PATTERN_TYPE_RECORD,
} from "./node/pattern.mjs";
import { STATEMENT_TYPE_RECORD } from "./node/statement.mjs";

/**
 * @type {{
 *   [kind in keyof import("./kind").KindRecord<{}>]
 *     : {
 *       [type in import("./kind").KindRecord<{}>[kind]["type"]]
 *         : null
 *     }
 * }}
 */
export const KIND_RECORD = {
  Program: { Program: null },
  ModuleProgram: { Program: null },
  ScriptProgram: { Program: null },
  DeclarableExpression: DECLARABLE_EXPRESSION_TYPE_RECORD,
  SpreadableObjectProperty: SPREADABLE_OBJECT_PROPERTY_TYPE_RECORD,
  MethodFunctionExpression: { FunctionExpression: null },
  ConstructorFunctionExpression: { FunctionExpression: null },
  GetterFunctionExpression: { FunctionExpression: null },
  SetterFunctionExpression: { FunctionExpression: null },
  Expression: EXPRESSION_TYPE_RECORD,
  SpreadableExpression: SPREADABLE_EXPRESSION_TYPE_RECORD,
  SuperableExpression: SUPERABLE_EXPRESSION_TYPE_RECORD,
  Statement: STATEMENT_TYPE_RECORD,
  ModuleStatement: MODULE_STATEMENT_TYPE_RECORD,
  Pattern: PATTERN_TYPE_RECORD,
  RestablePattern: RESTABLE_PATTERN_TYPE_RECORD,
  RestablePatternProperty: RESTABLE_PATTERN_PROPERTY_TYPE_RECORD,
  Key: KEY_TYPE_RECORD,
  PublicKey: PUBLIC_KEY_TYPE_RECORD,
  DefaultDeclaration: DEFAULT_DECLARATION_TYPE_RECORD,
  KeyIdentifier: KEY_IDENTIFIER_TYPE_RECORD,
  SourceLiteral: { Literal: null },
  TemplateElement: { TemplateElement: null },
  TemplateLiteral: { TemplateLiteral: null },
  VariableDeclarator: { VariableDeclarator: null },
  CallableUpdatePattern: CALLABLE_UPDATE_PATTERN_TYPE_RECORD,
  DeclarablePattern: DECLARABLE_PATTERN_TYPE_RECORD,
  ConstructorIdentifier: { Identifier: null },
  PublicKeyIdentifier: { Identifier: null },
  ChainableExpression: CHAINABLE_EXPRESSION_TYPE_RECORD,
  CatchClause: { CatchClause: null },
  SwitchCase: { SwitchCase: null },
  Specifier: SPECIFIER_TYPE_RECORD,
  KeywordIdentifier: { Identifier: null },
  ImportSpecifier: IMPORT_SPECIFIER_TYPE_RECORD,
  LabelIdentifier: { Identifier: null },
  VariableIdentifier: { Identifier: null },
  ExportSpecifier: { ExportSpecifier: null },
  CallablePattern: CALLABLE_PATTERN_TYPE_RECORD,
  Declaration: DECLARATION_TYPE_RECORD,
  BlockStatement: { BlockStatement: null },
  ClassBody: { ClassBody: null },
  PrivatableExpression: PRIVATABLE_EXPRESSION_TYPE_RECORD,
  ClassEntry: CLASS_ENTRY_TYPE_RECORD,
  UpdatePattern: UPDATE_PATTERN_TYPE_RECORD,
};
