import { MODULE_DECLARATION_TYPE_RECORD } from "./module.mjs";

/**
 * @type {{[key in import("./statement").Statement<{}>["type"]]: null}}
 */
export const STATEMENT_TYPE_RECORD = {
  BlockStatement: null,
  BreakStatement: null,
  ClassDeclaration: null,
  ContinueStatement: null,
  DebuggerStatement: null,
  DoWhileStatement: null,
  EmptyStatement: null,
  ExpressionStatement: null,
  ForStatement: null,
  ForInStatement: null,
  ForOfStatement: null,
  FunctionDeclaration: null,
  IfStatement: null,
  LabeledStatement: null,
  ReturnStatement: null,
  SwitchStatement: null,
  ThrowStatement: null,
  TryStatement: null,
  VariableDeclaration: null,
  WhileStatement: null,
  WithStatement: null,
};

/**
 * @type {{[key in import("./module").ModuleDeclaration<{}>["type"]]: null}}
 */
export const MODULE_STATEMENY_TYPE_RECORD = {
  ...STATEMENT_TYPE_RECORD,
  ...MODULE_DECLARATION_TYPE_RECORD,
};
