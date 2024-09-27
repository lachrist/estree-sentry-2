/* eslint-disable no-use-before-define */

import { EstreexTypeError } from "../error.mjs";
import { map } from "../util/index.mjs";
import {
  getBoolean,
  getDoubleton,
  getFalse,
  getNullableObjectArray,
  getObject,
  getObjectArray,
  getRecord,
  getSingleton,
  getTripleton,
} from "../access.mjs";
import { guardExpression } from "./expression.mjs";
import { subguardVariableIdentifier } from "./identifier.mjs";
import { guardKey } from "./key.mjs";
import { joinDeepPath, joinPath } from "../path.mjs";
import {
  CALLABLE_PATTERN_TYPE_RECORD,
  CALLABLE_UPDATE_PATTERN_TYPE_RECORD,
  DECLARABLE_PATTERN_TYPE_RECORD,
  PATTERN_TYPE_RECORD,
  RESTABLE_PATTERN_PROPERTY_TYPE_RECORD,
  RESTABLE_PATTERN_TYPE_RECORD,
  UPDATE_PATTERN_TYPE_RECORD,
} from "../index.mjs";
import { subguardMemberExpression } from "./member.mjs";
import { subguardCallExpression } from "./call.mjs";
import { subguardVariableDeclaration } from "./declaration.mjs";

const { undefined } = globalThis;

/**
 * @type {import("../guard").Subguard<
 *   import("../").RestElement<{}>
 * >}
 */
const subguardRestElement = (node, path, annotate, type, kind) => ({
  type,
  argument: guardPattern(
    getObject(node, "argument", kind, path),
    joinPath(path, "argument"),
    annotate,
  ),
  ...annotate(node, kind, path),
});

/**
 * @type {import("../guard").Guard<
 *   import("../syntax/pattern").RestablePatternProperty<{}>
 * >}
 */
const guardPatternProperty = (node, path, annotate) => {
  const kind = "PatternProperty";
  const type = getRecord(
    node,
    "type",
    kind,
    path,
    RESTABLE_PATTERN_PROPERTY_TYPE_RECORD,
  );
  switch (type) {
    case "Property": {
      const computed = getBoolean(node, "computed", kind, path);
      if (computed) {
        return {
          type,
          key: guardExpression(
            getObject(node, "key", kind, path),
            joinPath(path, "key"),
            annotate,
          ),
          value: guardPattern(
            getObject(node, "value", kind, path),
            joinPath(path, "value"),
            annotate,
          ),
          kind: getSingleton(node, "kind", kind, path, "init"),
          method: getFalse(node, "method", kind, path),
          shorthand: getFalse(node, "shorthand", kind, path),
          computed,
          ...annotate(node, kind, path),
        };
      } else {
        return {
          type,
          key: guardKey(
            getObject(node, "key", kind, path),
            joinPath(path, "key"),
            annotate,
          ),
          value: guardPattern(
            getObject(node, "value", kind, path),
            joinPath(path, "value"),
            annotate,
          ),
          kind: getSingleton(node, "kind", kind, path, "init"),
          method: getFalse(node, "method", kind, path),
          shorthand: getBoolean(node, "shorthand", kind, path),
          computed,
          ...annotate(node, kind, path),
        };
      }
    }
    case "RestElement": {
      return subguardRestElement(node, path, annotate, type, kind);
    }
    default: {
      throw new EstreexTypeError(type);
    }
  }
};

/**
 * @type {import("../guard").Subguard<
 *   import("../").Pattern<{}>,
 * >}
 */
const subguardPattern = (node, path, annotate, type, kind) => {
  switch (type) {
    case "AssignmentPattern": {
      return {
        type,
        left: guardPattern(
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
    case "Identifier": {
      return subguardVariableIdentifier(node, path, annotate, type, kind);
    }
    case "MemberExpression": {
      return subguardMemberExpression(node, path, annotate, type, kind);
    }
    case "ArrayPattern": {
      return {
        type,
        elements: map(
          getNullableObjectArray(node, "elements", kind, path),
          (item, index) =>
            item === null
              ? null
              : guardRestablePattern(
                  item,
                  joinDeepPath(path, "elements", index),
                  annotate,
                ),
        ),
        ...annotate(node, kind, path),
      };
    }
    case "ObjectPattern": {
      const properties = getObjectArray(node, "properties", kind, path);
      return {
        type,
        properties: map(
          getObjectArray(node, "properties", kind, path),
          (item, index) =>
            guardPatternProperty(
              item,
              joinDeepPath(path, "properties", index),
              annotate,
            ),
        ),
        ...annotate(node, kind, path),
      };
    }
    default: {
      throw new EstreexTypeError(type);
    }
  }
};

/**
 * @type {import("../guard").Guard<
 *   import("../").Pattern<{}>
 * >}
 */
export const guardPattern = (node, path, annotate) => {
  const kind = "Pattern";
  const type = getRecord(node, "type", kind, path, PATTERN_TYPE_RECORD);
  return subguardPattern(node, path, annotate, type, kind);
};

/**
 * @type {import("../guard").Guard<
 *   import("../syntax/pattern").RestablePattern<{}>
 * >}
 */
export const guardRestablePattern = (node, path, annotate) => {
  const kind = "RestablePattern";
  const type = getRecord(
    node,
    "type",
    kind,
    path,
    RESTABLE_PATTERN_TYPE_RECORD,
  );
  switch (type) {
    case "RestElement": {
      return subguardRestElement(node, path, annotate, type, kind);
    }
    default: {
      return subguardPattern(node, path, annotate, type, kind);
    }
  }
};

/**
 * @type {import("../guard").Guard<
 *   import("../syntax/pattern").UpdatePattern<{}>
 * >}
 */
export const guardUpdatePattern = (node, path, annotate) => {
  const kind = "UpdatePattern";
  const type = getRecord(node, "type", kind, path, UPDATE_PATTERN_TYPE_RECORD);
  switch (type) {
    case "Identifier": {
      return subguardVariableIdentifier(node, path, annotate, type, kind);
    }
    case "MemberExpression": {
      return subguardMemberExpression(node, path, annotate, type, kind);
    }
    default: {
      throw new EstreexTypeError(type);
    }
  }
};

/**
 * @type {import("../guard").Guard<
 *   import("../syntax/pattern").CallableUpdatePattern<{}>
 * >}
 */
export const guardCallableUpdatePattern = (node, path, annotate) => {
  const kind = "UpdatePattern";
  const type = getRecord(
    node,
    "type",
    kind,
    path,
    CALLABLE_UPDATE_PATTERN_TYPE_RECORD,
  );
  switch (type) {
    case "Identifier": {
      return subguardVariableIdentifier(node, path, annotate, type, kind);
    }
    case "MemberExpression": {
      return subguardMemberExpression(node, path, annotate, type, kind);
    }
    case "CallExpression": {
      return subguardCallExpression(node, path, annotate, type, kind);
    }
    default: {
      throw new EstreexTypeError(type);
    }
  }
};

/**
 * @type {import("../guard").Guard<
 *   import("../syntax/pattern").DeclarablePattern<{}>
 * >}
 */
export const guardDeclarablePattern = (node, path, annotate) => {
  const kind = "DeclarablePattern";
  const type = getRecord(
    node,
    "type",
    kind,
    path,
    DECLARABLE_PATTERN_TYPE_RECORD,
  );
  switch (type) {
    case "VariableDeclaration": {
      return subguardVariableDeclaration(node, path, annotate, type, kind);
    }
    default: {
      return subguardPattern(node, path, annotate, type, kind);
    }
  }
};

/**
 * @type {import("../guard").Guard<
 *   import("../syntax/pattern").CallablePattern<{}>
 * >}
 */
export const guardCallablePattern = (node, path, annotate) => {
  const kind = "CallablePattern";
  const type = getRecord(
    node,
    "type",
    kind,
    path,
    CALLABLE_PATTERN_TYPE_RECORD,
  );
  switch (type) {
    case "CallExpression": {
      return subguardCallExpression(node, path, annotate, type, kind);
    }
    default: {
      return subguardPattern(node, path, annotate, type, kind);
    }
  }
};
