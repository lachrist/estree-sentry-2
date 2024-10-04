import type { Expression, SpreadElement } from "./expression";
import type {
  GetterFunctionExpression,
  MethodFunctionExpression,
  SetterFunctionExpression,
} from "./function";
import type { PublicKey } from "./key";

export type SpreadableObjectProperty<X> = SpreadElement<X> | ObjectProperty<X>;

export type ObjectProperty<X> =
  | ValueObjectProperty<X>
  | MethodObjectProperty<X>
  | GetterObjectProperty<X>
  | SetterObjectProperty<X>;

export type ValueObjectProperty<X> =
  | NonComputedValueObjectProperty<X>
  | ComputedValueObjectProperty<X>;

export type MethodObjectProperty<X> =
  | NonComputedMethodObjectProperty<X>
  | ComputedMethodObjectProperty<X>;

export type GetterObjectProperty<X> =
  | NonComputedGetterObjectProperty<X>
  | ComputedGetterObjectProperty<X>;

export type SetterObjectProperty<X> =
  | NonComputedSetterObjectProperty<X>
  | ComputedSetterObjectProperty<X>;

// object //

export type ObjectExpression<X> = X & {
  type: "ObjectExpression";
  properties: Array<SpreadableObjectProperty<X>>;
};

// value //

export type NonComputedValueObjectProperty<X> = X & {
  type: "Property";
  key: PublicKey<X>;
  value: Expression<X>;
  kind: "init";
  method: false;
  shorthand: boolean;
  computed: false;
};

export type ComputedValueObjectProperty<X> = X & {
  type: "Property";
  key: Expression<X>;
  value: Expression<X>;
  kind: "init";
  method: false;
  shorthand: false;
  computed: true;
};

// method //

export type NonComputedMethodObjectProperty<X> = X & {
  type: "Property";
  key: PublicKey<X>;
  value: MethodFunctionExpression<X>;
  kind: "init";
  method: true;
  shorthand: false;
  computed: false;
};

export type ComputedMethodObjectProperty<X> = X & {
  type: "Property";
  key: Expression<X>;
  value: MethodFunctionExpression<X>;
  kind: "init";
  method: true;
  shorthand: false;
  computed: true;
};

// getter //

export type NonComputedGetterObjectProperty<X> = X & {
  type: "Property";
  key: PublicKey<X>;
  value: GetterFunctionExpression<X>;
  kind: "get";
  method: false;
  shorthand: false;
  computed: false;
};

export type ComputedGetterObjectProperty<X> = X & {
  type: "Property";
  key: Expression<X>;
  value: GetterFunctionExpression<X>;
  kind: "get";
  method: false;
  shorthand: false;
  computed: true;
};

// setter //

export type NonComputedSetterObjectProperty<X> = X & {
  type: "Property";
  key: PublicKey<X>;
  value: SetterFunctionExpression<X>;
  kind: "set";
  method: false;
  shorthand: false;
  computed: false;
};

export type ComputedSetterObjectProperty<X> = X & {
  type: "Property";
  key: Expression<X>;
  value: SetterFunctionExpression<X>;
  kind: "set";
  method: false;
  shorthand: false;
  computed: true;
};
