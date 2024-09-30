import type { ChainableExpression } from "./chain";
import type { SpreadableExpression, SuperableExpression } from "./expression";

export type CallExpression<X> = X & {
  type: "CallExpression";
  optional: false;
  callee: SuperableExpression<X>;
  arguments: Array<SpreadableExpression<X>>;
};

export type OptionalCallExpression<X> = X & {
  type: "CallExpression";
  optional: boolean;
  callee: ChainableExpression<X>;
  arguments: Array<SpreadableExpression<X>>;
};
