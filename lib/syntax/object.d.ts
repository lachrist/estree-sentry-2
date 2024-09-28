import type { Expression, SpreadElement } from "./expression";
import type {
  FunctionExpression,
  GetterFunctionExpression,
  SetterFunctionExpression,
} from "./function";
import type { PublicKey } from "./key";

export type SpreadableObjectProperty<X> = SpreadElement<X> | ObjectProperty<X>;

export type ObjectProperty<X> =
  | PlainObjectProperty<X>
  | MethodObjectProperty<X>
  | SetterObjectProperty<X>
  | GetterObjectProperty<X>;

export type ObjectExpression<X> = (X extends null ? {} : X) & {
  type: "ObjectExpression";
  properties: Array<SpreadableObjectProperty<X>>;
};

// value //

export type PlainObjectProperty<X> =
  | NonComputedPlainObjectProperty<X>
  | ComputedPlainObjectProperty<X>;

export type NonComputedPlainObjectProperty<X> = (X extends null ? {} : X) & {
  type: "Property";
  key: PublicKey<X>;
  value: Expression<X>;
  kind: "init";
  method: false;
  shorthand: boolean;
  computed: false;
};

export type ComputedPlainObjectProperty<X> = (X extends null ? {} : X) & {
  type: "Property";
  key: Expression<X>;
  value: Expression<X>;
  kind: "init";
  method: false;
  shorthand: false;
  computed: true;
};

// method //

export type MethodObjectProperty<X> =
  | NonComputedMethodObjectProperty<X>
  | ComputedMethodObjectProperty<X>;

export type NonComputedMethodObjectProperty<X> = (X extends null ? {} : X) & {
  type: "Property";
  key: PublicKey<X>;
  value: FunctionExpression<X>;
  kind: "init";
  method: true;
  shorthand: false;
  computed: false;
};

export type ComputedMethodObjectProperty<X> = (X extends null ? {} : X) & {
  type: "Property";
  key: Expression<X>;
  value: FunctionExpression<X>;
  kind: "init";
  method: true;
  shorthand: false;
  computed: true;
};

// getter //

export type GetterObjectProperty<X> =
  | NonComputedGetterObjectProperty<X>
  | ComputedGetterObjectProperty<X>;

export type NonComputedGetterObjectProperty<X> = (X extends null ? {} : X) & {
  type: "Property";
  key: PublicKey<X>;
  value: GetterFunctionExpression<X>;
  kind: "get";
  method: false;
  shorthand: false;
  computed: false;
};

export type ComputedGetterObjectProperty<X> = (X extends null ? {} : X) & {
  type: "Property";
  key: Expression<X>;
  value: GetterFunctionExpression<X>;
  kind: "get";
  method: false;
  shorthand: false;
  computed: true;
};

// setter //

export type SetterObjectProperty<X> =
  | NonComputedSetterObjectProperty<X>
  | ComputedSetterObjectProperty<X>;

export type NonComputedSetterObjectProperty<X> = (X extends null ? {} : X) & {
  type: "Property";
  key: PublicKey<X>;
  value: SetterFunctionExpression<X>;
  kind: "set";
  method: false;
  shorthand: false;
  computed: false;
};

export type ComputedSetterObjectProperty<X> = (X extends null ? {} : X) & {
  type: "Property";
  key: Expression<X>;
  value: SetterFunctionExpression<X>;
  kind: "set";
  method: false;
  shorthand: false;
  computed: true;
};
