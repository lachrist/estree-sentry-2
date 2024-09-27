import type { Expression } from "./expression";
import type { VariableIdentifier } from "./identifier";
import type { RestablePattern } from "./pattern";
import type { BlockStatement } from "./statement";

export type Function<X> =
  | FunctionExpression<X>
  | ArrowFunctionExpression<X>
  | FunctionDeclaration<X>
  | AnonymousFunctionDeclaration<X>;

export type FunctionExpression<X> = X & {
  type: "FunctionExpression";
  id: VariableIdentifier<X> | null;
  async: boolean;
  generator: boolean;
  params: RestablePattern<X>[];
  body: BlockStatement<X>;
};

export type ArrowFunctionExpression<X> =
  | (X & {
      type: "ArrowFunctionExpression";
      async: boolean;
      generator: false;
      params: RestablePattern<X>[];
      expression: true;
      body: Expression<X>;
    })
  | (X & {
      type: "ArrowFunctionExpression";
      async: boolean;
      generator: false;
      params: RestablePattern<X>[];
      expression: false;
      body: BlockStatement<X>;
    });

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
