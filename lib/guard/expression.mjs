/* eslint-disable no-use-before-define */

import {
  ASSIGNEMENT_OPERATOR_RECORD,
  BINARY_OPERATOR_RECORD,
  LOGICAL_OPERATOR_RECORD,
  UNARY_OPERATOR_RECORD,
  UPDATE_OPERATOR_RECORD,
} from "../operator.mjs";
import { EstreexTypeError } from "../error.mjs";
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
 *   import("../syntax").SuperableExpression<{}>
 * >}
 */
export const guardSuperableExpression = (node, path, annotate) => {
  const kind = "SuperableExpression";
  const type = getRecord(
    node,
    "type",
    kind,
    path,
    SUPERABLE_EXPRESSION_TYPE_RECORD,
  );
  switch (type) {
    case "Super": {
      return {
        type,
        ...annotate(node, kind, path),
      };
    }
    default: {
      return subguardExpression(node, path, annotate, type, kind);
    }
  }
};

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax").SpreadElement<{}>
 * >}
 */
export const subguardSpreadElement = (node, path, annotate, type, kind) => ({
  type,
  argument: guardExpression(
    getObject(node, "argument", kind, path),
    joinPath(path, "argument"),
    annotate,
  ),
  ...annotate(node, kind, path),
});

/**
 * @type {import("../guard").Guard<
 *   import("../syntax").SpreadableExpression<{}>
 * >}
 */
export const guardSpreadableExpression = (node, path, annotate) => {
  const kind = "SuperableExpression";
  const type = getRecord(
    node,
    "type",
    kind,
    path,
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
 *   import("../syntax").PrivatableExpression<{}>
 * >}
 */
const guardPrivatableExpression = (node, path, annotate) => {
  const kind = "PrivatableExpression";
  const type = getRecord(
    node,
    "type",
    kind,
    path,
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
 *   import("../syntax").DeclarableExpression<{}>
 * >}
 */
export const guardDeclarableExpression = (node, path, annotate) => {
  const kind = "PrivatableExpression";
  const type = getRecord(
    node,
    "type",
    kind,
    path,
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
 *   import("../syntax").Expression<{}>
 * >}
 */
export const guardExpression = (node, path, annotate) => {
  const kind = "Expression";
  const type = getRecord(node, "type", kind, path, EXPRESSION_TYPE_RECORD);
  return subguardExpression(node, path, annotate, type, kind);
};

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax").Expression<{}>
 * >}
 */
export const subguardExpression = (node, path, annotate, type, kind) => {
  switch (type) {
    case "ArrayExpression": {
      return {
        type,
        elements: map(
          getNullableObjectArray(node, "elements", kind, path),
          (item, index) =>
            item === null
              ? null
              : guardExpression(
                  item,
                  joinDeepPath(path, "elements", index),
                  annotate,
                ),
        ),
        ...annotate(node, kind, path),
      };
    }
    case "ArrowFunctionExpression": {
      return subguardArrowFunctionExpression(node, path, annotate, type, kind);
    }
    case "AssignmentExpression": {
      const operator = getRecord(
        node,
        "operator",
        kind,
        path,
        ASSIGNEMENT_OPERATOR_RECORD,
      );
      if (operator === "=") {
        return {
          type,
          operator,
          left: guardCallablePattern(
            getObject(node, "left", kind, path),
            joinPath(path, "left"),
            annotate,
          ),
          right: guardExpression(
            getObject(node, "right", kind, path),
            joinPath(path, "right"),
            annotate,
          ),
          ...annotate(node, kind, path),
        };
      } else {
        return {
          type,
          operator,
          left: guardCallableUpdatePattern(
            getObject(node, "left", kind, path),
            joinPath(path, "left"),
            annotate,
          ),
          right: guardExpression(
            getObject(node, "right", kind, path),
            joinPath(path, "right"),
            annotate,
          ),
          ...annotate(node, kind, path),
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
          getObject(node, "test", kind, path),
          joinPath(path, "test"),
          annotate,
        ),
        consequent: guardExpression(
          getObject(node, "consequent", kind, path),
          joinPath(path, "consequent"),
          annotate,
        ),
        alternate: guardExpression(
          getObject(node, "alternate", kind, path),
          joinPath(path, "alternate"),
          annotate,
        ),
        ...annotate(node, kind, path),
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
          getObject(node, "argument", kind, path),
          joinPath(path, "argument"),
          annotate,
        ),
        ...annotate(node, kind, path),
      };
    }
    case "MemberExpression": {
      return subguardMemberExpression(node, path, annotate, type, kind);
    }
    case "NewExpression": {
      return {
        type,
        callee: guardExpression(
          getObject(node, "callee", kind, path),
          joinPath(path, "callee"),
          annotate,
        ),
        arguments: map(
          getObjectArray(node, "arguments", kind, path),
          (item, index) =>
            guardSpreadableExpression(
              item,
              joinDeepPath(path, "arguments", index),
              annotate,
            ),
        ),
        ...annotate(node, kind, path),
      };
    }
    case "ObjectExpression": {
      return subguardObjectExpression(node, path, annotate, type, kind);
    }
    case "BinaryExpression": {
      const operator = getRecord(
        node,
        "operator",
        kind,
        path,
        BINARY_OPERATOR_RECORD,
      );
      if (operator === "in") {
        return {
          type,
          operator,
          left: guardPrivatableExpression(
            getObject(node, "left", kind, path),
            joinPath(path, "left"),
            annotate,
          ),
          right: guardExpression(
            getObject(node, "right", kind, path),
            joinPath(path, "right"),
            annotate,
          ),
          ...annotate(node, kind, path),
        };
      } else {
        return {
          type,
          operator,
          left: guardExpression(
            getObject(node, "left", kind, path),
            joinPath(path, "left"),
            annotate,
          ),
          right: guardExpression(
            getObject(node, "right", kind, path),
            joinPath(path, "right"),
            annotate,
          ),
          ...annotate(node, kind, path),
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
          kind,
          path,
          UNARY_OPERATOR_RECORD,
        ),
        argument: guardExpression(
          getObject(node, "argument", kind, path),
          joinPath(path, "argument"),
          annotate,
        ),
        prefix: getTrue(node, "prefix", kind, path),
        ...annotate(node, kind, path),
      };
    }
    case "ClassExpression": {
      return subguardClassExpression(node, path, annotate, type, kind);
    }
    case "ImportExpression": {
      return {
        type,
        source: guardExpression(
          getObject(node, "source", kind, path),
          joinPath(path, "source"),
          annotate,
        ),
        ...annotate(node, kind, path),
      };
    }
    case "LogicalExpression": {
      return {
        type,
        operator: getRecord(
          node,
          "operator",
          kind,
          path,
          LOGICAL_OPERATOR_RECORD,
        ),
        left: guardExpression(
          getObject(node, "left", kind, path),
          joinPath(path, "left"),
          annotate,
        ),
        right: guardExpression(
          getObject(node, "right", kind, path),
          joinPath(path, "right"),
          annotate,
        ),
        ...annotate(node, kind, path),
      };
    }
    case "MetaProperty": {
      return {
        type,
        meta: guardKeywordIdentifier(
          getObject(node, "meta", kind, path),
          joinPath(path, "meta"),
          annotate,
        ),
        property: guardPublicKeyIdentifier(
          getObject(node, "property", kind, path),
          joinPath(path, "property"),
          annotate,
        ),
        ...annotate(node, kind, path),
      };
    }
    case "SequenceExpression": {
      return {
        type,
        expressions: map(
          getObjectArray(node, "expressions", kind, path),
          (item, index) =>
            guardExpression(
              item,
              joinDeepPath(path, "expressions", index),
              annotate,
            ),
        ),
        ...annotate(node, kind, path),
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
        ...annotate(node, kind, path),
      };
    }
    case "UpdateExpression": {
      return {
        type,
        operator: getRecord(
          node,
          "operator",
          kind,
          path,
          UPDATE_OPERATOR_RECORD,
        ),
        argument: guardUpdatePattern(
          getObject(node, "argument", kind, path),
          joinPath(path, "argument"),
          annotate,
        ),
        prefix: getBoolean(node, "prefix", kind, path),
        ...annotate(node, kind, path),
      };
    }
    case "YieldExpression": {
      return {
        type,
        argument: has(node, "argument")
          ? guardExpression(
              getObject(node, "argument", kind, path),
              joinPath(path, "argument"),
              annotate,
            )
          : null,
        delegate: getBoolean(node, "delegate", kind, path),
        ...annotate(node, kind, path),
      };
    }
    default: {
      throw new EstreexTypeError(type);
    }
  }
};
