/* eslint-disable no-use-before-define */

import {
  ASSIGNEMENT_OPERATOR_RECORD,
  BINARY_OPERATOR_RECORD,
  LOGICAL_OPERATOR_RECORD,
  UNARY_OPERATOR_RECORD,
  UPDATE_OPERATOR_RECORD,
} from "../operator.mjs";
import { EstreeSentryTypeError } from "../error.mjs";
import { map } from "../util/index.mjs";
import {
  getBoolean,
  getNullableObjectArray,
  getObject,
  getObjectArray,
  getRecord,
  getTrue,
  has,
} from "../access.mjs";
import {
  subguardArrowFunctionExpression,
  subguardFunctionExpression,
} from "./function.mjs";
import {
  guardKeywordIdentifier,
  subguardPrivateKeyIdentifier,
  subguardVariableIdentifier,
} from "./identifier.mjs";
import { guardPublicKeyIdentifier } from "./key.mjs";
import { subguardExpressionLiteral } from "./literal.mjs";
import { joinDeepPath, joinPath } from "../path.mjs";
import {
  guardCallablePattern,
  guardCallableUpdatePattern,
  guardUpdatePattern,
} from "./pattern.mjs";
import { subguardClassExpression } from "./class.mjs";
import {
  subguardTemplateLiteral,
  subguardTaggedTemplateExpression,
} from "./template.mjs";
import { subguardCallExpression } from "./call.mjs";
import { subguardMemberExpression } from "./member.mjs";
import { subguardObjectExpression } from "./object.mjs";
import { subguardChainExpression } from "./chain.mjs";
import { subguardVariableDeclaration } from "./declaration.mjs";
import {
  DECLARABLE_EXPRESSION_TYPE_RECORD,
  EXPRESSION_TYPE_RECORD,
  PRIVATABLE_EXPRESSION_TYPE_RECORD,
  SPREADABLE_EXPRESSION_TYPE_RECORD,
  SUPERABLE_EXPRESSION_TYPE_RECORD,
} from "../syntax.mjs";

/**
 * @type {import("../guard").Guard<
 *   import("../syntax/expression").SuperableExpression<{}>
 * >}
 */
export const guardSuperableExpression = (node, path, annotate) => {
  const kind = "SuperableExpression";
  const type = getRecord(
    node,
    "type",
    path,
    kind,
    SUPERABLE_EXPRESSION_TYPE_RECORD,
  );
  switch (type) {
    case "Super": {
      return {
        type,
        ...annotate(node, path, kind),
      };
    }
    default: {
      return subguardExpression(node, path, annotate, type, kind);
    }
  }
};

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax/expression").SpreadElement<{}>
 * >}
 */
export const subguardSpreadElement = (node, path, annotate, type, kind) => ({
  type,
  argument: guardExpression(
    getObject(node, "argument", path, kind),
    joinPath(path, "argument"),
    annotate,
  ),
  ...annotate(node, path, kind),
});

/**
 * @type {import("../guard").Guard<
 *   import("../syntax/expression").SpreadableExpression<{}>
 * >}
 */
export const guardSpreadableExpression = (node, path, annotate) => {
  const kind = "SpreadableExpression";
  const type = getRecord(
    node,
    "type",
    path,
    kind,
    SPREADABLE_EXPRESSION_TYPE_RECORD,
  );
  switch (type) {
    case "SpreadElement": {
      return subguardSpreadElement(node, path, annotate, type, kind);
    }
    default: {
      return subguardExpression(node, path, annotate, type, kind);
    }
  }
};

/**
 * @type {import("../guard").Guard<
 *   import("../syntax/expression").PrivatableExpression<{}>
 * >}
 */
const guardPrivatableExpression = (node, path, annotate) => {
  const kind = "PrivatableExpression";
  const type = getRecord(
    node,
    "type",
    path,
    kind,
    PRIVATABLE_EXPRESSION_TYPE_RECORD,
  );
  switch (type) {
    case "PrivateIdentifier": {
      return subguardPrivateKeyIdentifier(node, path, annotate, type, kind);
    }
    default: {
      return subguardExpression(node, path, annotate, type, kind);
    }
  }
};

/**
 * @type {import("../guard").Guard<
 *   import("../syntax/expression").DeclarableExpression<{}>
 * >}
 */
export const guardDeclarableExpression = (node, path, annotate) => {
  const kind = "DeclarableExpression";
  const type = getRecord(
    node,
    "type",
    path,
    kind,
    DECLARABLE_EXPRESSION_TYPE_RECORD,
  );
  switch (type) {
    case "VariableDeclaration": {
      return subguardVariableDeclaration(node, path, annotate, type, kind);
    }
    default: {
      return subguardExpression(node, path, annotate, type, kind);
    }
  }
};

/**
 * @type {import("../guard").Guard<
 *   import("../syntax/expression").Expression<{}>
 * >}
 */
export const guardExpression = (node, path, annotate) => {
  const kind = "Expression";
  const type = getRecord(node, "type", path, kind, EXPRESSION_TYPE_RECORD);
  return subguardExpression(node, path, annotate, type, kind);
};

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax/expression").Expression<{}>
 * >}
 */
export const subguardExpression = (node, path, annotate, type, kind) => {
  switch (type) {
    case "ArrayExpression": {
      return {
        type,
        elements: map(
          getNullableObjectArray(node, "elements", path, kind),
          (item, index) =>
            item === null
              ? null
              : guardSpreadableExpression(
                  item,
                  joinDeepPath(path, "elements", index),
                  annotate,
                ),
        ),
        ...annotate(node, path, kind),
      };
    }
    case "ArrowFunctionExpression": {
      return subguardArrowFunctionExpression(node, path, annotate, type, kind);
    }
    case "AssignmentExpression": {
      const operator = getRecord(
        node,
        "operator",
        path,
        kind,
        ASSIGNEMENT_OPERATOR_RECORD,
      );
      if (operator === "=") {
        return {
          type,
          operator,
          left: guardCallablePattern(
            getObject(node, "left", path, kind),
            joinPath(path, "left"),
            annotate,
          ),
          right: guardExpression(
            getObject(node, "right", path, kind),
            joinPath(path, "right"),
            annotate,
          ),
          ...annotate(node, path, kind),
        };
      } else {
        return {
          type,
          operator,
          left: guardCallableUpdatePattern(
            getObject(node, "left", path, kind),
            joinPath(path, "left"),
            annotate,
          ),
          right: guardExpression(
            getObject(node, "right", path, kind),
            joinPath(path, "right"),
            annotate,
          ),
          ...annotate(node, path, kind),
        };
      }
    }
    case "CallExpression": {
      return subguardCallExpression(node, path, annotate, type, kind);
    }
    case "ConditionalExpression": {
      return {
        type,
        test: guardExpression(
          getObject(node, "test", path, kind),
          joinPath(path, "test"),
          annotate,
        ),
        consequent: guardExpression(
          getObject(node, "consequent", path, kind),
          joinPath(path, "consequent"),
          annotate,
        ),
        alternate: guardExpression(
          getObject(node, "alternate", path, kind),
          joinPath(path, "alternate"),
          annotate,
        ),
        ...annotate(node, path, kind),
      };
    }
    case "FunctionExpression": {
      return subguardFunctionExpression(node, path, annotate, type, kind);
    }
    case "Identifier": {
      return subguardVariableIdentifier(node, path, annotate, type, kind);
    }
    case "Literal": {
      return subguardExpressionLiteral(node, path, annotate, type, kind);
    }
    case "AwaitExpression": {
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
    case "MemberExpression": {
      return subguardMemberExpression(node, path, annotate, type, kind);
    }
    case "NewExpression": {
      return {
        type,
        callee: guardExpression(
          getObject(node, "callee", path, kind),
          joinPath(path, "callee"),
          annotate,
        ),
        arguments: map(
          getObjectArray(node, "arguments", path, kind),
          (item, index) =>
            guardSpreadableExpression(
              item,
              joinDeepPath(path, "arguments", index),
              annotate,
            ),
        ),
        ...annotate(node, path, kind),
      };
    }
    case "ObjectExpression": {
      return subguardObjectExpression(node, path, annotate, type, kind);
    }
    case "BinaryExpression": {
      const operator = getRecord(
        node,
        "operator",
        path,
        kind,
        BINARY_OPERATOR_RECORD,
      );
      if (operator === "in") {
        return {
          type,
          operator,
          left: guardPrivatableExpression(
            getObject(node, "left", path, kind),
            joinPath(path, "left"),
            annotate,
          ),
          right: guardExpression(
            getObject(node, "right", path, kind),
            joinPath(path, "right"),
            annotate,
          ),
          ...annotate(node, path, kind),
        };
      } else {
        return {
          type,
          operator,
          left: guardExpression(
            getObject(node, "left", path, kind),
            joinPath(path, "left"),
            annotate,
          ),
          right: guardExpression(
            getObject(node, "right", path, kind),
            joinPath(path, "right"),
            annotate,
          ),
          ...annotate(node, path, kind),
        };
      }
    }
    case "ChainExpression": {
      return subguardChainExpression(node, path, annotate, type, kind);
    }
    case "UnaryExpression": {
      return {
        type,
        operator: getRecord(
          node,
          "operator",
          path,
          kind,
          UNARY_OPERATOR_RECORD,
        ),
        argument: guardExpression(
          getObject(node, "argument", path, kind),
          joinPath(path, "argument"),
          annotate,
        ),
        prefix: getTrue(node, "prefix", path, kind),
        ...annotate(node, path, kind),
      };
    }
    case "ClassExpression": {
      return subguardClassExpression(node, path, annotate, type, kind);
    }
    case "ImportExpression": {
      return {
        type,
        source: guardExpression(
          getObject(node, "source", path, kind),
          joinPath(path, "source"),
          annotate,
        ),
        ...annotate(node, path, kind),
      };
    }
    case "LogicalExpression": {
      return {
        type,
        operator: getRecord(
          node,
          "operator",
          path,
          kind,
          LOGICAL_OPERATOR_RECORD,
        ),
        left: guardExpression(
          getObject(node, "left", path, kind),
          joinPath(path, "left"),
          annotate,
        ),
        right: guardExpression(
          getObject(node, "right", path, kind),
          joinPath(path, "right"),
          annotate,
        ),
        ...annotate(node, path, kind),
      };
    }
    case "MetaProperty": {
      return {
        type,
        meta: guardKeywordIdentifier(
          getObject(node, "meta", path, kind),
          joinPath(path, "meta"),
          annotate,
        ),
        property: guardPublicKeyIdentifier(
          getObject(node, "property", path, kind),
          joinPath(path, "property"),
          annotate,
        ),
        ...annotate(node, path, kind),
      };
    }
    case "SequenceExpression": {
      return {
        type,
        expressions: map(
          getObjectArray(node, "expressions", path, kind),
          (item, index) =>
            guardExpression(
              item,
              joinDeepPath(path, "expressions", index),
              annotate,
            ),
        ),
        ...annotate(node, path, kind),
      };
    }
    case "TaggedTemplateExpression": {
      return subguardTaggedTemplateExpression(node, path, annotate, type, kind);
    }
    case "TemplateLiteral": {
      return subguardTemplateLiteral(node, path, annotate, type, kind);
    }
    case "ThisExpression": {
      return {
        type,
        ...annotate(node, path, kind),
      };
    }
    case "UpdateExpression": {
      return {
        type,
        operator: getRecord(
          node,
          "operator",
          path,
          kind,
          UPDATE_OPERATOR_RECORD,
        ),
        argument: guardUpdatePattern(
          getObject(node, "argument", path, kind),
          joinPath(path, "argument"),
          annotate,
        ),
        prefix: getBoolean(node, "prefix", path, kind),
        ...annotate(node, path, kind),
      };
    }
    case "YieldExpression": {
      return {
        type,
        argument: has(node, "argument")
          ? guardExpression(
              getObject(node, "argument", path, kind),
              joinPath(path, "argument"),
              annotate,
            )
          : null,
        delegate: getBoolean(node, "delegate", path, kind),
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
