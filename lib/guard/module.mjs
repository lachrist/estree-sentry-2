/* eslint-disable no-use-before-define */

import { EstreexTypeError } from "../error.mjs";
import { map } from "../util/index.mjs";
import {
  getDoubleton,
  getObject,
  getObjectArray,
  getRecord,
  getSingleton,
  getTripleton,
  has,
} from "../access.mjs";
import {
  subguardAnonymousClassDeclaration,
  subguardClassDeclaration,
} from "./class.mjs";
import {
  guardDeclaration,
  subguardVariableDeclaration,
} from "./declaration.mjs";
import { subguardExpression } from "./expression.mjs";
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
import { subguardStatement } from "./statement.mjs";
import {
  DEFAULT_DECLARATION_TYPE_RECORD,
  IMPORT_SPECIFIER_TYPE_RECORD,
  MODULE_STATEMENT_TYPE_RECORD,
  SPECIFIER_TYPE_RECORD,
  STATEMENT_TYPE_RECORD,
} from "../index.mjs";

/**
 * @type {import("../guard").Guard<
 *   import("../syntax").ModuleStatement<{}>
 * >}
 */
export const guardModuleStatement = (node, path, annotate) => {
  const kind = "ModuleStatement";
  const type = getRecord(
    node,
    "type",
    kind,
    path,
    MODULE_STATEMENT_TYPE_RECORD,
  );
  switch (type) {
    case "ImportDeclaration": {
      return {
        type,
        specifiers: map(
          getObjectArray(node, "specifiers", kind, path),
          (item, index) =>
            guardImportSpecifier(
              item,
              joinDeepPath(path, "specifiers", index),
              annotate,
            ),
        ),
        source: guardSourceLiteral(
          getObject(node, "source", kind, path),
          joinPath(path, "source"),
          annotate,
        ),
        ...annotate(node, kind, path),
      };
    }
    case "ExportAllDeclaration": {
      return {
        type,
        exported: has(node, "exported")
          ? guardSpecifier(
              getObject(node, "exported", kind, path),
              joinPath(path, "exported"),
              annotate,
            )
          : null,
        source: guardSourceLiteral(
          getObject(node, "source", kind, path),
          joinPath(path, "source"),
          annotate,
        ),
        ...annotate(node, kind, path),
      };
    }
    case "ExportDefaultDeclaration": {
      return {
        type,
        declaration: guardDefaultDeclaration(
          getObject(node, "declaration", kind, path),
          joinPath(path, "declaration"),
          annotate,
        ),
        ...annotate(node, kind, path),
      };
    }
    case "ExportNamedDeclaration": {
      if (has(node, "declaration")) {
        return {
          type,
          declaration: guardDeclaration(
            getObject(node, "declaration", kind, path),
            joinPath(path, "declaration"),
            annotate,
          ),
          specifiers: [],
          source: null,
          ...annotate(node, kind, path),
        };
      } else {
        if (has(node, "source")) {
          return {
            type,
            declaration: null,
            specifiers: map(
              getObjectArray(node, "specifiers", kind, path),
              (item, index) =>
                guardAggregateExportSpecifier(
                  item,
                  joinDeepPath(path, "specifiers", index),
                  annotate,
                ),
            ),
            source: guardSourceLiteral(
              getObject(node, "source", kind, path),
              joinPath(path, "source"),
              annotate,
            ),
            ...annotate(node, kind, path),
          };
        } else {
          return {
            type,
            declaration: null,
            specifiers: map(
              getObjectArray(node, "specifiers", kind, path),
              (item, index) =>
                guardExportSpecifier(
                  item,
                  joinDeepPath(path, "specifiers", index),
                  annotate,
                ),
            ),
            source: null,
            ...annotate(node, kind, path),
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
 * @type {import("../guard").Guard<
 *   import("../syntax").DefaultDeclaration<{}>
 * >}
 */
const guardDefaultDeclaration = (node, path, annotate) => {
  const kind = "Declaration";
  const type = getRecord(
    node,
    "type",
    kind,
    path,
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
 * @type {import("../guard").Guard<
 *   import("../syntax").ExportSpecifier<{}>
 * >}
 */
const guardExportSpecifier = (node, path, annotate) => {
  const kind = "ExportSpecifier";
  return {
    type: getSingleton(node, "type", kind, path, "ExportSpecifier"),
    local: guardVariableIdentifier(
      getObject(node, "local", kind, path),
      joinPath(path, "local"),
      annotate,
    ),
    exported: guardSpecifier(
      getObject(node, "exported", kind, path),
      joinPath(path, "exported"),
      annotate,
    ),
    ...annotate(node, kind, path),
  };
};

/**
 * @type {import("../guard").Guard<
 *   import("../syntax").AggregateExportSpecifier<{}>
 * >}
 */
const guardAggregateExportSpecifier = (node, path, annotate) => {
  const kind = "ExportSpecifier";
  return {
    type: getSingleton(node, "type", kind, path, "ExportSpecifier"),
    local: guardSpecifier(
      getObject(node, "local", kind, path),
      joinPath(path, "local"),
      annotate,
    ),
    exported: guardSpecifier(
      getObject(node, "exported", kind, path),
      joinPath(path, "exported"),
      annotate,
    ),
    ...annotate(node, kind, path),
  };
};

/**
 * @type {import("../guard").Guard<
 *   import("../syntax").Specifier<{}>
 * >}
 */
const guardSpecifier = (node, path, annotate) => {
  const kind = "Specifier";
  const type = getRecord(node, "type", kind, path, SPECIFIER_TYPE_RECORD);
  switch (type) {
    case "Literal": {
      return subguardSpecifierLiteral(node, path, annotate, type, kind);
    }
    case "Identifier": {
      return subguardSpecifierIdentifier(node, path, annotate, type, kind);
    }
    default: {
      throw new EstreexTypeError(type);
    }
  }
};

/**
 * @type {import("../guard").Guard<
 *   import("../syntax").ImportSpecifier<{}>
 * >}
 */
const guardImportSpecifier = (node, path, annotate) => {
  const kind = "ImportSpecifier";
  const type = getRecord(
    node,
    "type",
    kind,
    path,
    IMPORT_SPECIFIER_TYPE_RECORD,
  );
  switch (type) {
    case "ImportDefaultSpecifier": {
      return {
        type,
        local: guardVariableIdentifier(
          getObject(node, "local", kind, path),
          joinPath(path, "local"),
          annotate,
        ),
        ...annotate(node, kind, path),
      };
    }
    case "ImportSpecifier": {
      return {
        type,
        local: guardVariableIdentifier(
          getObject(node, "local", kind, path),
          joinPath(path, "local"),
          annotate,
        ),
        imported: guardSpecifier(
          getObject(node, "imported", kind, path),
          joinPath(path, "imported"),
          annotate,
        ),
        ...annotate(node, kind, path),
      };
    }
    case "ImportNamespaceSpecifier": {
      return {
        type,
        local: guardVariableIdentifier(
          getObject(node, "local", kind, path),
          joinPath(path, "local"),
          annotate,
        ),
        ...annotate(node, kind, path),
      };
    }
    default: {
      throw new EstreexTypeError(type);
    }
  }
};
