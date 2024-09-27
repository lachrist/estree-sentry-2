import { EXPRESSION_TYPE_RECORD } from "./expression.mjs";

/**
 * @type {{[key in import("./chain").ChainableExpression<{}>["type"]]: null}}
 */
export const CHAINABLE_EXPRESSION_TYPE_RECORD = EXPRESSION_TYPE_RECORD;

/**
 * @type {{[key in import("./chain").OptionalExpression<{}>["type"]]: null}}
 */
export const OPTIONAL_EXPRESSION_TYPE_RECORD = {
  MemberExpression: null,
  CallExpression: null,
};
