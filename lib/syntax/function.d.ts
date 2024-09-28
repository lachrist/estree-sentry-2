import type { Expression } from "./expression";
import type { VariableIdentifier } from "./identifier";
import type { RestablePattern } from "./pattern";
import type { BlockStatement } from "./statement";

export type FunctionExpression<X> = (X extends null ? {} : X) & {
  type: "FunctionExpression";
  id: VariableIdentifier<X> | null;
  async: boolean;
  generator: boolean;
  params: RestablePattern<X>[];
  body: BlockStatement<X>;
};

export type ArrowFunctionExpression<X> =
  | ExpressionArrowFunctionExpression<X>
  | BlockArrowFunctionExpression<X>;

export type ExpressionArrowFunctionExpression<X> = (X extends null ? {} : X) & {
  type: "ArrowFunctionExpression";
  id: null;
  async: boolean;
  generator: false;
  params: RestablePattern<X>[];
  expression: true;
  body: Expression<X>;
};

export type BlockArrowFunctionExpression<X> = (X extends null ? {} : X) & {
  type: "ArrowFunctionExpression";
  id: null;
  async: boolean;
  generator: false;
  params: RestablePattern<X>[];
  expression: false;
  body: BlockStatement<X>;
};

export type FunctionDeclaration<X> = (X extends null ? {} : X) & {
  type: "FunctionDeclaration";
  params: RestablePattern<X>[];
  id: VariableIdentifier<X>;
  generator: boolean;
  async: boolean;
  body: BlockStatement<X>;
};

export type AnonymousFunctionDeclaration<X> = (X extends null ? {} : X) & {
  type: "FunctionDeclaration";
  params: RestablePattern<X>[];
  id: null;
  generator: boolean;
  async: boolean;
  body: BlockStatement<X>;
};
