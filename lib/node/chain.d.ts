import type { OptionalCallExpression } from "./call";
import type { Expression } from "./expression";
import type { OptionalMemberExpression } from "./member";

export type ChainableExpression<X> =
  | OptionalCallExpression<X>
  | OptionalMemberExpression<X>
  | Expression<X>;

export type ChainExpression<X> = X & {
  type: "ChainExpression";
  expression: ChainableExpression<X>;
};
