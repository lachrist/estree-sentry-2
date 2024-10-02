import type { Expression } from "./expression";
import type { VariableIdentifier } from "./identifier";
import type { Pattern, RestablePattern } from "./pattern";
import type { BlockStatement } from "./statement";

export type FunctionExpression<X> = X & {
  type: "FunctionExpression";
  id: VariableIdentifier<X> | null;
  async: boolean;
  generator: boolean;
  params: RestablePattern<X>[];
  body: BlockStatement<X>;
};

export type ConstructorFunctionExpression<X> = FunctionExpression<X> & {
  id: null;
  async: false;
  generator: false;
};

export type MethodFunctionExpression<X> = FunctionExpression<X> & {
  id: null;
};

export type GetterFunctionExpression<X> = FunctionExpression<X> & {
  id: null;
  async: false;
  generator: false;
  params: [];
};

export type SetterFunctionExpression<X> = FunctionExpression<X> & {
  id: null;
  async: false;
  generator: false;
  params: [Pattern<X>];
};

export type ArrowFunctionExpression<X> =
  | ExpressionArrowFunctionExpression<X>
  | BlockArrowFunctionExpression<X>;

export type ExpressionArrowFunctionExpression<X> = X & {
  type: "ArrowFunctionExpression";
  id: null;
  async: boolean;
  generator: false;
  params: RestablePattern<X>[];
  expression: true;
  body: Expression<X>;
};

export type BlockArrowFunctionExpression<X> = X & {
  type: "ArrowFunctionExpression";
  id: null;
  async: boolean;
  generator: false;
  params: RestablePattern<X>[];
  expression: false;
  body: BlockStatement<X>;
};

export type FunctionDeclaration<X> = X & {
  type: "FunctionDeclaration";
  params: RestablePattern<X>[];
  id: VariableIdentifier<X>;
  generator: boolean;
  async: boolean;
  body: BlockStatement<X>;
};

export type AnonymousFunctionDeclaration<X> = X & {
  type: "FunctionDeclaration";
  params: RestablePattern<X>[];
  id: null;
  generator: boolean;
  async: boolean;
  body: BlockStatement<X>;
};
