import { getObject, getRecord } from "../access.mjs";
import { joinPath } from "../path.mjs";
import {
  EXPRESSION_TYPE_RECORD,
  subguardExpression,
  subguardSuper,
} from "./expression.mjs";
import { subguardChainCallExpression } from "./call.mjs";
import { subguardChainMemberExpression } from "./member.mjs";

/**
 * @type {{[key in import("./chain").ChainableExpression<{}>["type"]]: null}}
 */
export const CHAINABLE_EXPRESSION_TYPE_RECORD = EXPRESSION_TYPE_RECORD;

/**
 * @type {{[key in import("./chain").SuperableChainableExpression<{}>["type"]]: null}}
 */
export const SUPERABLE_CHAINABLE_EXPRESSION_TYPE_RECORD = {
  Super: null,
  ...EXPRESSION_TYPE_RECORD,
};

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
  return subguardChainableExpression(node, path, annotate, type, kind);
};

/**
 * @type {import("../guard").Guard<
 *   import("./chain").SuperableChainableExpression<{}>
 * >}
 */
export const guardSuperableChainableExpression = (node, path, annotate) => {
  const kind = "SuperableChainableExpression";
  const type = getRecord(
    node,
    "type",
    path,
    kind,
    SUPERABLE_CHAINABLE_EXPRESSION_TYPE_RECORD,
  );
  switch (type) {
    case "Super": {
      return subguardSuper(node, path, annotate, type, kind);
    }
    default: {
      return subguardChainableExpression(node, path, annotate, type, kind);
    }
  }
};

/**
 * @type {import("../guard").Subguard<
 *   import("./chain").ChainableExpression<{}>
 * >}
 */
const subguardChainableExpression = (node, path, annotate, type, kind) => {
  switch (type) {
    case "MemberExpression": {
      return subguardChainMemberExpression(node, path, annotate, type, kind);
    }
    case "CallExpression": {
      return subguardChainCallExpression(node, path, annotate, type, kind);
    }
    default: {
      return subguardExpression(node, path, annotate, type, kind);
    }
  }
};
