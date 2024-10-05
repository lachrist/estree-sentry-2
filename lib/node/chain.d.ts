import type { ChainCallExpression } from "./call";
import type { Expression, Super } from "./expression";
import type { ChainMemberExpression } from "./member";

export type ChainableExpression<X> =
  | ChainCallExpression<X>
  | ChainMemberExpression<X>
  | Expression<X>;

export type SuperableChainableExpression<X> = Super<X> | ChainableExpression<X>;

export type ChainExpression<X> = X & {
  type: "ChainExpression";
  expression: ChainableExpression<X>;
};
