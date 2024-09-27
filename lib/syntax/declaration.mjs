/**
 * @type {{[key in import("./declaration").Declaration<{}>["type"]]: null}}
 */
export const DECLARATION_TYPE_RECORD = {
  FunctionDeclaration: null,
  VariableDeclaration: null,
  ClassDeclaration: null,
};

/**
 * @type {{[key in import("./declaration").VariableKind]: null}}
 */
export const VARIABLE_KIND_RECORD = {
  const: null,
  let: null,
  var: null,
};
