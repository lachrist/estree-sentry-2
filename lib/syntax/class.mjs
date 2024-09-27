/**
 * @type {{[key in import("./class").Class<{}>["type"]]: null}}
 */
export const CLASS_TYPE_RECORD = {
  ClassDeclaration: null,
  ClassExpression: null,
};

/**
 * @type {{[key in import("./class").ClassEntry<{}>["type"]]: null}}
 */
export const CLASS_ENTRY_TYPE_RECORD = {
  StaticBlock: null,
  MethodDefinition: null,
  PropertyDefinition: null,
};
