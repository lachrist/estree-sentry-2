/**
 * @type {{[key in import("./pattern").Pattern<{}>["type"]]: null}}
 */
export const PATTERN_TYPE_RECORD = {
  ArrayPattern: null,
  AssignmentPattern: null,
  ObjectPattern: null,
  Identifier: null,
  MemberExpression: null,
};

/**
 * @type {{[key in import("./pattern").RestablePattern<{}>["type"]]: null}}
 */
export const RESTABLE_PATTERN_TYPE_RECORD = {
  ...PATTERN_TYPE_RECORD,
  RestElement: null,
};

/**
 * @type {{[key in import("./pattern").RestablePatternProperty<{}>["type"]]: null}}
 */
export const RESTABLE_PATTERN_PROPERTY_TYPE_RECORD = {
  Property: null,
  RestElement: null,
};

/**
 * @type {{[key in import("./pattern").DeclarablePattern<{}>["type"]]: null}}
 */
export const DECLARABLE_PATTERN_TYPE_RECORD = {
  ...PATTERN_TYPE_RECORD,
  VariableDeclaration: null,
};

/**
 * @type {{[key in import("./pattern").CallablePattern<{}>["type"]]: null}}
 */
export const CALLABLE_PATTERN_TYPE_RECORD = {
  ...PATTERN_TYPE_RECORD,
  CallExpression: null,
};

/**
 * @type {{[key in import("./pattern").UpdatePattern<{}>["type"]]: null}}
 */
export const UPDATE_PATTERN_TYPE_RECORD = {
  Identifier: null,
  MemberExpression: null,
};

/**
 * @type {{[key in import("./pattern").CallableUpdatePattern<{}>["type"]]: null}}
 */
export const CALLABLE_UPDATE_PATTERN_TYPE_RECORD = {
  ...UPDATE_PATTERN_TYPE_RECORD,
  CallExpression: null,
};
