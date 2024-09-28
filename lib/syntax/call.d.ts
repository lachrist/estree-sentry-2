import { ChainableExpression } from "./chain";
import { SpreadableExpression, SuperableExpression } from "./expression";

export type CallExpression<X> = (X extends null ? {} : X) & {
  type: "CallExpression";
  optional: false;
  callee: SuperableExpression<X>;
  arguments: Array<SpreadableExpression<X>>;
};

export type OptionalCallExpression<X> = (X extends null ? {} : X) & {
  type: "CallExpression";
  optional: boolean;
  callee: ChainableExpression<X>;
  arguments: Array<SpreadableExpression<X>>;
};
