/**
 * @type {{[key in import("./expression").Expression<{}>["type"]]: null}}
 */
export const EXPRESSION_TYPE_RECORD = {
  ArrayExpression: null,
  ArrowFunctionExpression: null,
  AssignmentExpression: null,
  AwaitExpression: null,
  BinaryExpression: null,
  CallExpression: null,
  ChainExpression: null,
  ClassExpression: null,
  ConditionalExpression: null,
  FunctionExpression: null,
  Identifier: null,
  ImportExpression: null,
  Literal: null,
  LogicalExpression: null,
  MemberExpression: null,
  MetaProperty: null,
  NewExpression: null,
  ObjectExpression: null,
  SequenceExpression: null,
  TaggedTemplateExpression: null,
  TemplateLiteral: null,
  ThisExpression: null,
  UnaryExpression: null,
  UpdateExpression: null,
  YieldExpression: null,
};

/**
 * @type {{[key in import("./expression").SpreadableExpression<{}>["type"]]: null}}
 */
export const SPREADABLE_EXPRESSION_TYPE_RECORD = {
  ...EXPRESSION_TYPE_RECORD,
  SpreadElement: null,
};

/**
 * @type {{[key in import("./expression").SuperableExpression<{}>["type"]]: null}}
 */
export const SUPERABLE_EXPRESSION_TYPE_RECORD = {
  ...EXPRESSION_TYPE_RECORD,
  Super: null,
};

/**
 * @type {{[key in import("./expression").DeclarableExpression<{}>["type"]]: null}}
 */
export const DECLARABLE_EXPRESSION_TYPE_RECORD = {
  ...EXPRESSION_TYPE_RECORD,
  VariableDeclaration: null,
};

/**
 * @type {{[key in import("./expression").PrivatableExpression<{}>["type"]]: null}}
 */
export const PRIVATABLE_EXPRESSION_TYPE_RECORD = {
  ...EXPRESSION_TYPE_RECORD,
  PrivateIdentifier: null,
};
