import { get, getObject, getRecord } from "../access.mjs";
import { EstreeSentryTypeError } from "../error.mjs";
import { joinPath } from "../path.mjs";
import { EXPRESSION_TYPE_RECORD } from "./expression.mjs";
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
 * @type {{[key in import("./chain").ChainableExpression<{}>["type"]]: null}}
 */
export const CHAINABLE_EXPRESSION_TYPE_RECORD = EXPRESSION_TYPE_RECORD;

/**
 * @type {import("../guard").Subguard<
 *   import("./chain").ChainExpression<{}>
 * >}
 */
export const subguardChainExpression = (node, path, annotate, type, kind) => ({
  type,
  expression: guardChainableExpression(
    getObject(node, "expression", path, kind),
    joinPath(path, "expression"),
    annotate,
  ),
  ...annotate(node, path, kind),
});

/**
 * @type {import("../guard").Guard<
 *   import("./chain").ChainableExpression<{}>
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
      return subguardOptionalMemberExpression(node, path, annotate, type, kind);
    }
    case "CallExpression": {
      return subguardOptionalCallExpression(node, path, annotate, type, kind);
    }
    default: {
      return subguardExpression(node, path, annotate, type, kind);
    }
  }
};
