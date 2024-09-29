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
import { EstreeSentryTypeError } from "../error.mjs";
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
  const type = getRecord(node, "type", path, kind, STATEMENT_TYPE_RECORD);
  return subguardStatement(node, path, annotate, type, kind);
};

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax").BlockStatement<{}>
 * >}
 */
const subguardBlockStatement = (node, path, annotate, type, kind) => ({
  type,
  body: map(getObjectArray(node, "body", path, kind), (item, index) =>
    guardStatement(item, joinDeepPath(path, "body", index), annotate),
  ),
  ...annotate(node, path, kind),
});

/**
 * @type {import("../guard").Guard<
 *   import("../syntax").BlockStatement<{}>
 * >}
 */
export const guardBlockStatement = (node, path, annotate) => {
  const kind = "BlockStatement";
  const type = getSingleton(node, "type", path, kind, "BlockStatement");
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
    type: getSingleton(node, "type", path, kind, "CatchClause"),
    param: has(node, "param")
      ? guardPattern(
          getObject(node, "param", path, kind),
          joinPath(path, "param"),
          annotate,
        )
      : null,
    body: guardBlockStatement(
      getObject(node, "body", path, kind),
      joinPath(path, "body"),
      annotate,
    ),
    ...annotate(node, path, kind),
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
    type: getSingleton(node, "type", path, kind, "SwitchCase"),
    test: has(node, "test")
      ? guardExpression(
          getObject(node, "test", path, kind),
          joinPath(path, "test"),
          annotate,
        )
      : null,
    consequent: map(
      getObjectArray(node, "consequent", path, kind),
      (item, index) =>
        guardStatement(item, joinDeepPath(path, "consequent", index), annotate),
    ),
    ...annotate(node, path, kind),
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
              getObject(node, "label", path, kind),
              joinPath(path, "label"),
              annotate,
            )
          : null,
        ...annotate(node, path, kind),
      };
    }
    case "ContinueStatement": {
      return {
        type,
        label: has(node, "label")
          ? guardLabelIdentifier(
              getObject(node, "label", path, kind),
              joinPath(path, "label"),
              annotate,
            )
          : null,
        ...annotate(node, path, kind),
      };
    }
    case "LabeledStatement": {
      return {
        type,
        label: guardLabelIdentifier(
          getObject(node, "label", path, kind),
          joinPath(path, "label"),
          annotate,
        ),
        body: guardStatement(
          getObject(node, "body", path, kind),
          joinPath(path, "body"),
          annotate,
        ),
        ...annotate(node, path, kind),
      };
    }
    case "ReturnStatement": {
      return {
        type,
        argument: has(node, "argument")
          ? guardExpression(
              getObject(node, "argument", path, kind),
              joinPath(path, "argument"),
              annotate,
            )
          : null,
        ...annotate(node, path, kind),
      };
    }
    case "ThrowStatement": {
      return {
        type,
        argument: guardExpression(
          getObject(node, "argument", path, kind),
          joinPath(path, "argument"),
          annotate,
        ),
        ...annotate(node, path, kind),
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
        ...annotate(node, path, kind),
      };
    }
    case "EmptyStatement": {
      return {
        type,
        ...annotate(node, path, kind),
      };
    }
    case "ExpressionStatement": {
      return {
        type,
        directive: has(node, "directive")
          ? getString(node, "directive", path, kind)
          : null,
        expression: guardExpression(
          getObject(node, "expression", path, kind),
          joinPath(path, "expression"),
          annotate,
        ),
        ...annotate(node, path, kind),
      };
    }
    case "IfStatement": {
      return {
        type,
        test: guardExpression(
          getObject(node, "test", path, kind),
          joinPath(path, "test"),
          annotate,
        ),
        consequent: guardStatement(
          getObject(node, "consequent", path, kind),
          joinPath(path, "consequent"),
          annotate,
        ),
        alternate: has(node, "alternate")
          ? guardStatement(
              getObject(node, "alternate", path, kind),
              joinPath(path, "alternate"),
              annotate,
            )
          : null,
        ...annotate(node, path, kind),
      };
    }
    case "SwitchStatement": {
      return {
        type,
        discriminant: guardExpression(
          getObject(node, "discriminant", path, kind),
          joinPath(path, "discriminant"),
          annotate,
        ),
        cases: map(getObjectArray(node, "cases", path, kind), (item, index) =>
          guardSwitchCase(item, joinDeepPath(path, "cases", index), annotate),
        ),
        ...annotate(node, path, kind),
      };
    }
    case "WhileStatement": {
      return {
        type,
        test: guardExpression(
          getObject(node, "test", path, kind),
          joinPath(path, "test"),
          annotate,
        ),
        body: guardStatement(
          getObject(node, "body", path, kind),
          joinPath(path, "body"),
          annotate,
        ),
        ...annotate(node, path, kind),
      };
    }
    case "DoWhileStatement": {
      return {
        type,
        test: guardExpression(
          getObject(node, "test", path, kind),
          joinPath(path, "test"),
          annotate,
        ),
        body: guardStatement(
          getObject(node, "body", path, kind),
          joinPath(path, "body"),
          annotate,
        ),
        ...annotate(node, path, kind),
      };
    }
    case "ForStatement": {
      return {
        type,
        init: has(node, "init")
          ? guardDeclarableExpression(
              getObject(node, "init", path, kind),
              joinPath(path, "init"),
              annotate,
            )
          : null,
        test: has(node, "test")
          ? guardExpression(
              getObject(node, "test", path, kind),
              joinPath(path, "test"),
              annotate,
            )
          : null,
        update: has(node, "update")
          ? guardExpression(
              getObject(node, "update", path, kind),
              joinPath(path, "update"),
              annotate,
            )
          : null,
        body: guardStatement(
          getObject(node, "body", path, kind),
          joinPath(path, "body"),
          annotate,
        ),
        ...annotate(node, path, kind),
      };
    }
    case "ForInStatement": {
      return {
        type,
        left: guardDeclarablePattern(
          getObject(node, "left", path, kind),
          joinPath(path, "left"),
          annotate,
        ),
        right: guardExpression(
          getObject(node, "right", path, kind),
          joinPath(path, "right"),
          annotate,
        ),
        body: guardStatement(
          getObject(node, "body", path, kind),
          joinPath(path, "body"),
          annotate,
        ),
        ...annotate(node, path, kind),
      };
    }
    case "ForOfStatement": {
      return {
        type,
        await: getBoolean(node, "await", path, kind),
        left: guardDeclarablePattern(
          getObject(node, "left", path, kind),
          joinPath(path, "left"),
          annotate,
        ),
        right: guardExpression(
          getObject(node, "right", path, kind),
          joinPath(path, "right"),
          annotate,
        ),
        body: guardStatement(
          getObject(node, "body", path, kind),
          joinPath(path, "body"),
          annotate,
        ),
        ...annotate(node, path, kind),
      };
    }
    case "TryStatement": {
      return {
        type,
        block: guardBlockStatement(
          getObject(node, "block", path, kind),
          joinPath(path, "block"),
          annotate,
        ),
        handler: has(node, "handler")
          ? guardCatchClause(
              getObject(node, "handler", path, kind),
              joinPath(path, "handler"),
              annotate,
            )
          : null,
        finalizer: has(node, "finalizer")
          ? guardBlockStatement(
              getObject(node, "finalizer", path, kind),
              joinPath(path, "finalizer"),
              annotate,
            )
          : null,
        ...annotate(node, path, kind),
      };
    }
    case "WithStatement": {
      return {
        type,
        object: guardExpression(
          getObject(node, "object", path, kind),
          joinPath(path, "object"),
          annotate,
        ),
        body: guardStatement(
          getObject(node, "body", path, kind),
          joinPath(path, "body"),
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
