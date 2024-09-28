/* eslint-disable no-use-before-define */

import {
  getBoolean,
  getObject,
  getObjectArray,
  getRecord,
  getSingleton,
  getString,
  has,
} from "../access.mjs";
import { EstreexTypeError } from "../error";
import { STATEMENT_TYPE_RECORD } from "../index.mjs";
import { joinDeepPath, joinPath } from "../path.mjs";
import { map } from "../util/index.mjs";
import { subguardClassDeclaration } from "./class.mjs";
import { subguardVariableDeclaration } from "./declaration.mjs";
import { guardDeclarableExpression, guardExpression } from "./expression.mjs";
import { subguardFunctionDeclaration } from "./function.mjs";
import { guardLabelIdentifier } from "./identifier.mjs";
import { guardDeclarablePattern, guardPattern } from "./pattern.mjs";

/**
 * @type {import("../guard").Guard<
 *   import("../syntax").Statement<{}>
 * >}
 */
export const guardStatement = (node, path, annotate) => {
  const kind = "Statement";
  const type = getRecord(node, "type", kind, path, STATEMENT_TYPE_RECORD);
  return subguardStatement(node, path, annotate, type, kind);
};

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax").BlockStatement<{}>
 * >}
 */
const subguardBlockStatement = (node, path, annotate, type, kind) => ({
  type,
  body: map(getObjectArray(node, "body", kind, path), (item, index) =>
    guardStatement(item, joinDeepPath(path, "body", index), annotate),
  ),
  ...annotate(node, kind, path),
});

/**
 * @type {import("../guard").Guard<
 *   import("../syntax").BlockStatement<{}>
 * >}
 */
export const guardBlockStatement = (node, path, annotate) => {
  const kind = "BlockStatement";
  const type = getSingleton(node, "type", kind, path, "BlockStatement");
  return subguardBlockStatement(node, path, annotate, kind, type);
};

/**
 * @type {import("../guard").Guard<
 *   import("../syntax").CatchClause<{}>
 * >}
 */
export const guardCatchClause = (node, path, annotate) => {
  const kind = "CatchClause";
  return {
    type: getSingleton(node, "type", kind, path, "CatchClause"),
    param: has(node, "param")
      ? guardPattern(
          getObject(node, "param", kind, path),
          joinPath(path, "param"),
          annotate,
        )
      : null,
    body: guardBlockStatement(
      getObject(node, "body", kind, path),
      joinPath(path, "body"),
      annotate,
    ),
    ...annotate(node, kind, path),
  };
};

/**
 * @type {import("../guard").Guard<
 *   import("../syntax").SwitchCase<{}>
 * >}
 */
export const guardSwitchCase = (node, path, annotate) => {
  const kind = "SwitchCase";
  return {
    type: getSingleton(node, "type", kind, path, "SwitchCase"),
    test: has(node, "test")
      ? guardExpression(
          getObject(node, "test", kind, path),
          joinPath(path, "test"),
          annotate,
        )
      : null,
    consequent: map(
      getObjectArray(node, "consequent", kind, path),
      (item, index) =>
        guardStatement(item, joinDeepPath(path, "consequent", index), annotate),
    ),
    ...annotate(node, kind, path),
  };
};

/**
 * @type {import("../guard").Subguard<(
 *   import("../syntax").Statement<{}>
 * )>}
 */
export const subguardStatement = (node, path, annotate, type, kind) => {
  switch (type) {
    case "BlockStatement": {
      return subguardBlockStatement(node, path, annotate, type, kind);
    }
    case "BreakStatement": {
      return {
        type,
        label: has(node, "label")
          ? guardLabelIdentifier(
              getObject(node, "label", kind, path),
              joinPath(path, "label"),
              annotate,
            )
          : null,
        ...annotate(node, kind, path),
      };
    }
    case "ContinueStatement": {
      return {
        type,
        label: has(node, "label")
          ? guardLabelIdentifier(
              getObject(node, "label", kind, path),
              joinPath(path, "label"),
              annotate,
            )
          : null,
        ...annotate(node, kind, path),
      };
    }
    case "LabeledStatement": {
      return {
        type,
        label: guardLabelIdentifier(
          getObject(node, "label", kind, path),
          joinPath(path, "label"),
          annotate,
        ),
        body: guardStatement(
          getObject(node, "body", kind, path),
          joinPath(path, "body"),
          annotate,
        ),
        ...annotate(node, kind, path),
      };
    }
    case "ReturnStatement": {
      return {
        type,
        argument: has(node, "argument")
          ? guardExpression(
              getObject(node, "argument", kind, path),
              joinPath(path, "argument"),
              annotate,
            )
          : null,
        ...annotate(node, kind, path),
      };
    }
    case "ThrowStatement": {
      return {
        type,
        argument: guardExpression(
          getObject(node, "argument", kind, path),
          joinPath(path, "argument"),
          annotate,
        ),
        ...annotate(node, kind, path),
      };
    }
    case "ClassDeclaration": {
      return subguardClassDeclaration(node, path, annotate, type, kind);
    }
    case "FunctionDeclaration": {
      return subguardFunctionDeclaration(node, path, annotate, type, kind);
    }
    case "VariableDeclaration": {
      return subguardVariableDeclaration(node, path, annotate, type, kind);
    }
    case "DebuggerStatement": {
      return {
        type,
        ...annotate(node, kind, path),
      };
    }
    case "EmptyStatement": {
      return {
        type,
        ...annotate(node, kind, path),
      };
    }
    case "ExpressionStatement": {
      return {
        type,
        directive: has(node, "directive")
          ? getString(node, "directive", kind, path)
          : null,
        expression: guardExpression(
          getObject(node, "expression", kind, path),
          joinPath(path, "expression"),
          annotate,
        ),
        ...annotate(node, kind, path),
      };
    }
    case "IfStatement": {
      return {
        type,
        test: guardExpression(
          getObject(node, "test", kind, path),
          joinPath(path, "test"),
          annotate,
        ),
        consequent: guardStatement(
          getObject(node, "consequent", kind, path),
          joinPath(path, "consequent"),
          annotate,
        ),
        alternate: has(node, "alternate")
          ? guardStatement(
              getObject(node, "alternate", kind, path),
              joinPath(path, "alternate"),
              annotate,
            )
          : null,
        ...annotate(node, kind, path),
      };
    }
    case "SwitchStatement": {
      return {
        type,
        discriminant: guardExpression(
          getObject(node, "discriminant", kind, path),
          joinPath(path, "discriminant"),
          annotate,
        ),
        cases: map(getObjectArray(node, "cases", kind, path), (item, index) =>
          guardSwitchCase(item, joinDeepPath(path, "cases", index), annotate),
        ),
        ...annotate(node, kind, path),
      };
    }
    case "WhileStatement": {
      return {
        type,
        test: guardExpression(
          getObject(node, "test", kind, path),
          joinPath(path, "test"),
          annotate,
        ),
        body: guardStatement(
          getObject(node, "body", kind, path),
          joinPath(path, "body"),
          annotate,
        ),
        ...annotate(node, kind, path),
      };
    }
    case "DoWhileStatement": {
      return {
        type,
        test: guardExpression(
          getObject(node, "test", kind, path),
          joinPath(path, "test"),
          annotate,
        ),
        body: guardStatement(
          getObject(node, "body", kind, path),
          joinPath(path, "body"),
          annotate,
        ),
        ...annotate(node, kind, path),
      };
    }
    case "ForStatement": {
      return {
        type,
        init: has(node, "init")
          ? guardDeclarableExpression(
              getObject(node, "init", kind, path),
              joinPath(path, "init"),
              annotate,
            )
          : null,
        test: has(node, "test")
          ? guardExpression(
              getObject(node, "test", kind, path),
              joinPath(path, "test"),
              annotate,
            )
          : null,
        update: has(node, "update")
          ? guardExpression(
              getObject(node, "update", kind, path),
              joinPath(path, "update"),
              annotate,
            )
          : null,
        body: guardStatement(
          getObject(node, "body", kind, path),
          joinPath(path, "body"),
          annotate,
        ),
        ...annotate(node, kind, path),
      };
    }
    case "ForInStatement": {
      return {
        type,
        left: guardDeclarablePattern(
          getObject(node, "left", kind, path),
          joinPath(path, "left"),
          annotate,
        ),
        right: guardExpression(
          getObject(node, "right", kind, path),
          joinPath(path, "right"),
          annotate,
        ),
        body: guardStatement(
          getObject(node, "body", kind, path),
          joinPath(path, "body"),
          annotate,
        ),
        ...annotate(node, kind, path),
      };
    }
    case "ForOfStatement": {
      return {
        type,
        await: getBoolean(node, "await", kind, path),
        left: guardDeclarablePattern(
          getObject(node, "left", kind, path),
          joinPath(path, "left"),
          annotate,
        ),
        right: guardExpression(
          getObject(node, "right", kind, path),
          joinPath(path, "right"),
          annotate,
        ),
        body: guardStatement(
          getObject(node, "body", kind, path),
          joinPath(path, "body"),
          annotate,
        ),
        ...annotate(node, kind, path),
      };
    }
    case "TryStatement": {
      return {
        type,
        block: guardBlockStatement(
          getObject(node, "block", kind, path),
          joinPath(path, "block"),
          annotate,
        ),
        handler: has(node, "handler")
          ? guardCatchClause(
              getObject(node, "handler", kind, path),
              joinPath(path, "handler"),
              annotate,
            )
          : null,
        finalizer: has(node, "finalizer")
          ? guardBlockStatement(
              getObject(node, "finalizer", kind, path),
              joinPath(path, "finalizer"),
              annotate,
            )
          : null,
        ...annotate(node, kind, path),
      };
    }
    case "WithStatement": {
      return {
        type,
        object: guardExpression(
          getObject(node, "object", kind, path),
          joinPath(path, "object"),
          annotate,
        ),
        body: guardStatement(
          getObject(node, "body", kind, path),
          joinPath(path, "body"),
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
