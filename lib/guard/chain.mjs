import { get, getObject, getRecord } from "../access.mjs";
import { EstreexTypeError } from "../error.mjs";
import { joinPath } from "../path.mjs";
import {
  CHAINABLE_EXPRESSION_TYPE_RECORD,
  OPTIONAL_EXPRESSION_TYPE_RECORD,
} from "../syntax/chain.mjs";
import {
  subguardCallExpression,
  subguardOptionalCallExpression,
} from "./call.mjs";
import { subguardExpression } from "./expression.mjs";
import {
  subguardMemberExpression,
  subguardOptionalMemberExpression,
} from "./member.mjs";

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax").ChainExpression<{}>
 * >}
 */
export const subguardChainExpression = (node, path, annotate, type, kind) => ({
  type,
  expression: guardOptionalExpression(
    getObject(node, "expression", path, kind),
    joinPath(path, "expression"),
    annotate,
  ),
  ...annotate(node, path, kind),
});

/**
 * @type {import("../guard").Guard<
 *   import("../syntax").ChainableExpression<{}>
 * >}
 */
export const guardChainableExpression = (node, path, annotate) => {
  const kind = "ChainableExpression";
  const type = getRecord(
    node,
    "type",
    path,
    kind,
    CHAINABLE_EXPRESSION_TYPE_RECORD,
  );
  switch (type) {
    case "MemberExpression": {
      if (get(node, "optional")) {
        return subguardOptionalMemberExpression(
          node,
          path,
          annotate,
          type,
          kind,
        );
      } else {
        return subguardMemberExpression(node, path, annotate, type, kind);
      }
    }
    case "CallExpression": {
      if (get(node, "optional")) {
        return subguardCallExpression(node, path, annotate, type, kind);
      } else {
        return subguardCallExpression(node, path, annotate, type, kind);
      }
    }
    default: {
      return subguardExpression(node, path, annotate, type, kind);
    }
  }
};

/**
 * @type {import("../guard").Guard<
 *   import("../syntax").OptionalExpression<{}>
 * >}
 */
export const guardOptionalExpression = (node, path, annotate) => {
  const kind = "OptionalExpression";
  const type = getRecord(
    node,
    "type",
    path,
    kind,
    OPTIONAL_EXPRESSION_TYPE_RECORD,
  );
  switch (type) {
    case "MemberExpression": {
      return subguardOptionalMemberExpression(node, path, annotate, type, kind);
    }
    case "CallExpression": {
      return subguardOptionalCallExpression(node, path, annotate, type, kind);
    }
    default: {
      throw new EstreexTypeError(type);
    }
  }
};
