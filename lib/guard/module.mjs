/* eslint-disable no-use-before-define */

import { EstreeSentryTypeError } from "../error.mjs";
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
 * @type {import("../guard").Guard<
 *   import("../syntax").DefaultDeclaration<{}>
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
 * @type {import("../guard").Guard<
 *   import("../syntax").ExportSpecifier<{}>
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
 * @type {import("../guard").Guard<
 *   import("../syntax").AggregateExportSpecifier<{}>
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
 * @type {import("../guard").Guard<
 *   import("../syntax").Specifier<{}>
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
 * @type {import("../guard").Guard<
 *   import("../syntax").ImportSpecifier<{}>
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
