import { EstreeSentryTypeError } from "../error.mjs";
import { map } from "../util/index.mjs";
import {
  getObject,
  getObjectArray,
  getRecord,
  getSingleton,
  has,
} from "../access.mjs";
import {
  subguardAnonymousClassDeclaration,
  subguardClassDeclaration,
} from "./class.mjs";
import { guardDeclaration } from "./declaration.mjs";
import { EXPRESSION_TYPE_RECORD, subguardExpression } from "./expression.mjs";
import {
  subguardAnonymousFunctionDeclaration,
  subguardFunctionDeclaration,
} from "./function.mjs";
import {
  guardVariableIdentifier,
  subguardSpecifierIdentifier,
} from "./identifier.mjs";
import { guardSourceLiteral, subguardSpecifierLiteral } from "./literal.mjs";
import { joinDeepPath, joinPath } from "../path.mjs";
import { subguardStatement, STATEMENT_TYPE_RECORD } from "./statement.mjs";

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

/**
 * @type {import("../guard.js").Guard<
 *   import("./module.js").ModuleStatement<{}>
 * >}
 */
export const guardModuleStatement = (node, path, annotate) => {
  const kind = "ModuleStatement";
  const type = getRecord(
    node,
    "type",
    path,
    kind,
    MODULE_STATEMENT_TYPE_RECORD,
  );
  switch (type) {
    case "ImportDeclaration": {
      return {
        type,
        specifiers: map(
          getObjectArray(node, "specifiers", path, kind),
          (item, index) =>
            guardImportSpecifier(
              item,
              joinDeepPath(path, "specifiers", index),
              annotate,
            ),
        ),
        source: guardSourceLiteral(
          getObject(node, "source", path, kind),
          joinPath(path, "source"),
          annotate,
        ),
        ...annotate(node, path, kind),
      };
    }
    case "ExportAllDeclaration": {
      return {
        type,
        exported: has(node, "exported")
          ? guardSpecifier(
              getObject(node, "exported", path, kind),
              joinPath(path, "exported"),
              annotate,
            )
          : null,
        source: guardSourceLiteral(
          getObject(node, "source", path, kind),
          joinPath(path, "source"),
          annotate,
        ),
        ...annotate(node, path, kind),
      };
    }
    case "ExportDefaultDeclaration": {
      return {
        type,
        declaration: guardDefaultDeclaration(
          getObject(node, "declaration", path, kind),
          joinPath(path, "declaration"),
          annotate,
        ),
        ...annotate(node, path, kind),
      };
    }
    case "ExportNamedDeclaration": {
      if (has(node, "declaration")) {
        return {
          type,
          declaration: guardDeclaration(
            getObject(node, "declaration", path, kind),
            joinPath(path, "declaration"),
            annotate,
          ),
          specifiers: [],
          source: null,
          ...annotate(node, path, kind),
        };
      } else {
        if (has(node, "source")) {
          return {
            type,
            declaration: null,
            specifiers: map(
              getObjectArray(node, "specifiers", path, kind),
              (item, index) =>
                guardAggregateExportSpecifier(
                  item,
                  joinDeepPath(path, "specifiers", index),
                  annotate,
                ),
            ),
            source: guardSourceLiteral(
              getObject(node, "source", path, kind),
              joinPath(path, "source"),
              annotate,
            ),
            ...annotate(node, path, kind),
          };
        } else {
          return {
            type,
            declaration: null,
            specifiers: map(
              getObjectArray(node, "specifiers", path, kind),
              (item, index) =>
                guardExportSpecifier(
                  item,
                  joinDeepPath(path, "specifiers", index),
                  annotate,
                ),
            ),
            source: null,
            ...annotate(node, path, kind),
          };
        }
      }
    }
    default: {
      return subguardStatement(node, path, annotate, type, kind);
    }
  }
};

/**
 * @type {import("../guard.js").Guard<
 *   import("./module.js").DefaultDeclaration<{}>
 * >}
 */
const guardDefaultDeclaration = (node, path, annotate) => {
  const kind = "DefaultDeclaration";
  const type = getRecord(
    node,
    "type",
    path,
    kind,
    DEFAULT_DECLARATION_TYPE_RECORD,
  );
  switch (type) {
    case "FunctionDeclaration": {
      if (has(node, "id")) {
        return subguardFunctionDeclaration(node, path, annotate, type, kind);
      } else {
        return subguardAnonymousFunctionDeclaration(
          node,
          path,
          annotate,
          type,
          kind,
        );
      }
    }
    case "ClassDeclaration": {
      if (has(node, "id")) {
        return subguardClassDeclaration(node, path, annotate, type, kind);
      } else {
        return subguardAnonymousClassDeclaration(
          node,
          path,
          annotate,
          type,
          kind,
        );
      }
    }
    default: {
      return subguardExpression(node, path, annotate, type, kind);
    }
  }
};

/**
 * @type {import("../guard.js").Guard<
 *   import("./module.js").ExportSpecifier<{}>
 * >}
 */
const guardExportSpecifier = (node, path, annotate) => {
  const kind = "ExportSpecifier";
  return {
    type: getSingleton(node, "type", path, kind, "ExportSpecifier"),
    local: guardVariableIdentifier(
      getObject(node, "local", path, kind),
      joinPath(path, "local"),
      annotate,
    ),
    exported: guardSpecifier(
      getObject(node, "exported", path, kind),
      joinPath(path, "exported"),
      annotate,
    ),
    ...annotate(node, path, kind),
  };
};

/**
 * @type {import("../guard.js").Guard<
 *   import("./module.js").AggregateExportSpecifier<{}>
 * >}
 */
const guardAggregateExportSpecifier = (node, path, annotate) => {
  const kind = "ExportSpecifier";
  return {
    type: getSingleton(node, "type", path, kind, "ExportSpecifier"),
    local: guardSpecifier(
      getObject(node, "local", path, kind),
      joinPath(path, "local"),
      annotate,
    ),
    exported: guardSpecifier(
      getObject(node, "exported", path, kind),
      joinPath(path, "exported"),
      annotate,
    ),
    ...annotate(node, path, kind),
  };
};

/**
 * @type {import("../guard.js").Guard<
 *   import("./module.js").Specifier<{}>
 * >}
 */
const guardSpecifier = (node, path, annotate) => {
  const kind = "Specifier";
  const type = getRecord(node, "type", path, kind, SPECIFIER_TYPE_RECORD);
  switch (type) {
    case "Literal": {
      return subguardSpecifierLiteral(node, path, annotate, type, kind);
    }
    case "Identifier": {
      return subguardSpecifierIdentifier(node, path, annotate, type, kind);
    }
    /* c8 ignore start */
    default: {
      throw new EstreeSentryTypeError(type);
    }
    /* c8 ignore stop */
  }
};

/**
 * @type {import("../guard.js").Guard<
 *   import("./module.js").ImportSpecifier<{}>
 * >}
 */
const guardImportSpecifier = (node, path, annotate) => {
  const kind = "ImportSpecifier";
  const type = getRecord(
    node,
    "type",
    path,
    kind,
    IMPORT_SPECIFIER_TYPE_RECORD,
  );
  switch (type) {
    case "ImportDefaultSpecifier": {
      return {
        type,
        local: guardVariableIdentifier(
          getObject(node, "local", path, kind),
          joinPath(path, "local"),
          annotate,
        ),
        ...annotate(node, path, kind),
      };
    }
    case "ImportSpecifier": {
      return {
        type,
        local: guardVariableIdentifier(
          getObject(node, "local", path, kind),
          joinPath(path, "local"),
          annotate,
        ),
        imported: guardSpecifier(
          getObject(node, "imported", path, kind),
          joinPath(path, "imported"),
          annotate,
        ),
        ...annotate(node, path, kind),
      };
    }
    case "ImportNamespaceSpecifier": {
      return {
        type,
        local: guardVariableIdentifier(
          getObject(node, "local", path, kind),
          joinPath(path, "local"),
          annotate,
        ),
        ...annotate(node, path, kind),
      };
    }
    /* c8 ignore start */
    default: {
      throw new EstreeSentryTypeError(type);
    }
    /* c8 ignore stop */
  }
};
