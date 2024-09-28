import type { Expression } from "./expression";
import type {
  ConstructorFunctionExpression,
  FunctionExpression,
  GetterFunctionExpression,
  SetterFunctionExpression,
} from "./function";
import type { ConstructorIdentifier, VariableIdentifier } from "./identifier";
import type { Key } from "./key";
import type { Statement } from "./statement";

export type ClassEntry<X> =
  | MethodDefinition<X>
  | PropertyDefinition<X>
  | StaticBlock<X>;

export type ClassExpression<X> = (X extends null ? {} : X) & {
  type: "ClassExpression";
  id: VariableIdentifier<X> | null;
  superClass: Expression<X> | null;
  body: ClassBody<X>;
};

export type AnonymousClassDeclaration<X> = (X extends null ? {} : X) & {
  type: "ClassDeclaration";
  id: null;
  superClass: Expression<X> | null;
  body: ClassBody<X>;
};

export type ClassDeclaration<X> = (X extends null ? {} : X) & {
  type: "ClassDeclaration";
  id: VariableIdentifier<X>;
  superClass: Expression<X> | null;
  body: ClassBody<X>;
};

export type ClassBody<X> = (X extends null ? {} : X) & {
  type: "ClassBody";
  body: Array<ClassEntry<X>>;
};

// Method //

export type MethodDefinition<X> =
  | ConstructorMethodDefinition<X>
  | PlainMethodDefinition<X>
  | GetterMethodDefinition<X>
  | SetterMethodDefinition<X>;

// ConstructorMethod //

export type ConstructorMethodDefinition<X> = (X extends null ? {} : X) & {
  type: "MethodDefinition";
  key: ConstructorIdentifier<X>;
  value: ConstructorFunctionExpression<X>;
  kind: "constructor";
  computed: false;
  static: false;
};

// PlainMethod //

export type PlainMethodDefinition<X> =
  | ComputedPlainMethodDefinition<X>
  | NonComputedPlainMethodDefinition<X>;

export type ComputedPlainMethodDefinition<X> = (X extends null ? {} : X) & {
  type: "MethodDefinition";
  key: Expression<X>;
  value: FunctionExpression<X>;
  kind: "method";
  computed: true;
  static: boolean;
};

export type NonComputedPlainMethodDefinition<X> = (X extends null ? {} : X) & {
  type: "MethodDefinition";
  key: Key<X>;
  value: FunctionExpression<X>;
  kind: "method";
  computed: false;
  static: boolean;
};

// GetterMethod //

export type GetterMethodDefinition<X> =
  | ComputedGetterMethodDefinition<X>
  | NonComputedGetterMethodDefinition<X>;

export type ComputedGetterMethodDefinition<X> = (X extends null ? {} : X) & {
  type: "MethodDefinition";
  key: Expression<X>;
  value: GetterFunctionExpression<X>;
  kind: "get";
  computed: true;
  static: boolean;
};

export type NonComputedGetterMethodDefinition<X> = (X extends null ? {} : X) & {
  type: "MethodDefinition";
  key: Key<X>;
  value: GetterFunctionExpression<X>;
  kind: "get";
  computed: false;
  static: boolean;
};

// SetterMethod //

export type SetterMethodDefinition<X> =
  | ComputedSetterMethodDefinition<X>
  | NonComputedSetterMethodDefinition<X>;

export type ComputedSetterMethodDefinition<X> = (X extends null ? {} : X) & {
  type: "MethodDefinition";
  key: Expression<X>;
  value: SetterFunctionExpression<X>;
  kind: "set";
  computed: true;
  static: boolean;
};

export type NonComputedSetterMethodDefinition<X> = (X extends null ? {} : X) & {
  type: "MethodDefinition";
  key: Key<X>;
  value: SetterFunctionExpression<X>;
  kind: "set";
  computed: false;
  static: boolean;
};

// Property //

export type PropertyDefinition<X> =
  | ComputedPropertyDefinition<X>
  | NonComputedPropertyDefinition<X>;

export type ComputedPropertyDefinition<X> = (X extends null ? {} : X) & {
  type: "PropertyDefinition";
  key: Expression<X>;
  value: Expression<X> | null;
  computed: true;
  static: boolean;
};

export type NonComputedPropertyDefinition<X> = (X extends null ? {} : X) & {
  type: "PropertyDefinition";
  key: Key<X>;
  value: Expression<X> | null;
  computed: false;
  static: boolean;
};

// StaticBlock //

export type StaticBlock<X> = (X extends null ? {} : X) & {
  type: "StaticBlock";
  body: Statement<X>[];
};
