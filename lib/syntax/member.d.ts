import { ChainableExpression } from "./chain";
import { Expression, SuperableExpression } from "./expression";
import { KeyIdentifier } from "./key";

export type MemberExpression<X> =
  | ComputedMemberExpression<X>
  | NonComputedMemberExpression<X>;

export type OptionalMemberExpression<X> =
  | OptionalComputedMemberExpression<X>
  | OptionalNonComputedMemberExpression<X>;

export type ComputedMemberExpression<X> = (X extends null ? {} : X) & {
  type: "MemberExpression";
  object: SuperableExpression<X>;
  property: Expression<X>;
  computed: true;
  optional: false;
};

export type NonComputedMemberExpression<X> = (X extends null ? {} : X) & {
  type: "MemberExpression";
  object: SuperableExpression<X>;
  property: KeyIdentifier<X>;
  computed: false;
  optional: false;
};

export type OptionalComputedMemberExpression<X> = (X extends null ? {} : X) & {
  type: "MemberExpression";
  object: ChainableExpression<X>;
  property: Expression<X>;
  computed: true;
  optional: boolean;
};

export type OptionalNonComputedMemberExpression<X> = (X extends null
  ? {}
  : X) & {
  type: "MemberExpression";
  object: ChainableExpression<X>;
  property: KeyIdentifier<X>;
  computed: false;
  optional: boolean;
};
