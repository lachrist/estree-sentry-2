import type { Expression, SpreadElement } from "./expression";
import type { FunctionExpression } from "./function";
import type { PublicKey } from "./key";

export type SpreadableObjectProperty<X> = SpreadElement<X> | ObjectProperty<X>;

export type ObjectProperty<X> =
  | PlainObjectProperty<X>
  | MethodObjectProperty<X>
  | AccessorObjectProperty<X>;

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

// accessor //

export type AccessorObjectProperty<X> =
  | NonComputedAccessorObjectProperty<X>
  | ComputedAccessorObjectProperty<X>;

export type NonComputedAccessorObjectProperty<X> = (X extends null ? {} : X) & {
  type: "Property";
  key: PublicKey<X>;
  value: FunctionExpression<X>;
  kind: "get" | "set";
  method: false;
  shorthand: false;
  computed: false;
};

export type ComputedAccessorObjectProperty<X> = (X extends null ? {} : X) & {
  type: "Property";
  key: Expression<X>;
  value: FunctionExpression<X>;
  kind: "get" | "set";
  method: false;
  shorthand: false;
  computed: true;
};
