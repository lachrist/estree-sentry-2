import type {
  ChainableExpression,
  SuperableChainableExpression,
} from "./chain";
import type { Expression, SuperableExpression } from "./expression";
import type { KeyIdentifier } from "./key";

export type ChainMemberExpression<X> =
  | OptionalChainMemberExpression<X>
  | NonOptionalChainMemberExpression<X>;

export type MemberExpression<X> =
  | ComputedMemberExpression<X>
  | NonComputedMemberExpression<X>;

export type ComputedMemberExpression<X> = X & {
  type: "MemberExpression";
  object: SuperableExpression<X>;
  property: Expression<X>;
  computed: true;
  optional: false;
};

export type NonComputedMemberExpression<X> = X & {
  type: "MemberExpression";
  object: SuperableExpression<X>;
  property: KeyIdentifier<X>;
  computed: false;
  optional: false;
};

// OptionalChainMemberExpression //

export type OptionalChainMemberExpression<X> =
  | ComputedOptionalChainMemberExpression<X>
  | NonComputedOptionalChainMemberExpression<X>;

export type ComputedOptionalChainMemberExpression<X> = X & {
  type: "MemberExpression";
  object: ChainableExpression<X>;
  property: Expression<X>;
  computed: true;
  optional: true;
};

export type NonComputedOptionalChainMemberExpression<X> = X & {
  type: "MemberExpression";
  object: ChainableExpression<X>;
  property: KeyIdentifier<X>;
  computed: false;
  optional: true;
};

export type NonOptionalChainMemberExpression<X> =
  | ComputedNonOptionalChainMemberExpression<X>
  | NonComputedNonOptionalChainMemberExpression<X>;

export type ComputedNonOptionalChainMemberExpression<X> = X & {
  type: "MemberExpression";
  object: SuperableChainableExpression<X>;
  property: Expression<X>;
  computed: true;
  optional: false;
};

export type NonComputedNonOptionalChainMemberExpression<X> = X & {
  type: "MemberExpression";
  object: SuperableChainableExpression<X>;
  property: KeyIdentifier<X>;
  computed: false;
  optional: false;
};
