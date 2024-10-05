import type {
  ChainableExpression,
  SuperableChainableExpression,
} from "./chain";
import type { SpreadableExpression, SuperableExpression } from "./expression";

export type CallExpression<X> = X & {
  type: "CallExpression";
  optional: false;
  callee: SuperableExpression<X>;
  arguments: Array<SpreadableExpression<X>>;
};

export type ChainCallExpression<X> =
  | OptionalChainCallExpression<X>
  | NonOptionalChainCallExpression<X>;

export type OptionalChainCallExpression<X> = X & {
  type: "CallExpression";
  optional: true;
  callee: ChainableExpression<X>;
  arguments: Array<SpreadableExpression<X>>;
};

export type NonOptionalChainCallExpression<X> = X & {
  type: "CallExpression";
  optional: false;
  callee: SuperableChainableExpression<X>;
  arguments: Array<SpreadableExpression<X>>;
};
