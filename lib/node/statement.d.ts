import type { Brand } from "../util/brand";
import type { ClassDeclaration } from "./class";
import type { VariableDeclaration } from "./declaration";
import type { DeclarableExpression, Expression } from "./expression";
import type { FunctionDeclaration } from "./function";
import type { LabelIdentifier } from "./identifier";
import type { DeclarablePattern, Pattern } from "./pattern";

export type Statement<X> =
  | ExpressionStatement<X>
  | BlockStatement<X>
  | EmptyStatement<X>
  | DebuggerStatement<X>
  | WithStatement<X>
  | ReturnStatement<X>
  | LabeledStatement<X>
  | BreakStatement<X>
  | ContinueStatement<X>
  | IfStatement<X>
  | SwitchStatement<X>
  | ThrowStatement<X>
  | TryStatement<X>
  | WhileStatement<X>
  | DoWhileStatement<X>
  | ForStatement<X>
  | ForInStatement<X>
  | ForOfStatement<X>
  | VariableDeclaration<X>
  | FunctionDeclaration<X>
  | ClassDeclaration<X>;

export type SwitchCase<X> = X & {
  type: "SwitchCase";
  test: Expression<X> | null;
  consequent: Statement<X>[];
};

export type CatchClause<X> = X & {
  type: "CatchClause";
  param: Pattern<X> | null;
  body: BlockStatement<X>;
};

export type EmptyStatement<X> = X & {
  type: "EmptyStatement";
};

export type BlockStatement<X> = X & {
  type: "BlockStatement";
  body: Statement<X>[];
};

export type Directive = Brand<string, "estree.Directive">;

export type ExpressionStatement<X> = X & {
  type: "ExpressionStatement";
  expression: Expression<X>;
  directive: Directive | null;
};

export type IfStatement<X> = X & {
  type: "IfStatement";
  test: Expression<X>;
  consequent: Statement<X>;
  alternate: Statement<X> | null;
};

export type LabeledStatement<X> = X & {
  type: "LabeledStatement";
  label: LabelIdentifier<X>;
  body: Statement<X>;
};

export type BreakStatement<X> = X & {
  type: "BreakStatement";
  label: LabelIdentifier<X> | null;
};

export type ContinueStatement<X> = X & {
  type: "ContinueStatement";
  label: LabelIdentifier<X> | null;
};

export type WithStatement<X> = X & {
  type: "WithStatement";
  object: Expression<X>;
  body: Statement<X>;
};

export type SwitchStatement<X> = X & {
  type: "SwitchStatement";
  discriminant: Expression<X>;
  cases: SwitchCase<X>[];
};

export type ReturnStatement<X> = X & {
  type: "ReturnStatement";
  argument: Expression<X> | null;
};

export type ThrowStatement<X> = X & {
  type: "ThrowStatement";
  argument: Expression<X>;
};

export type TryStatement<X> = X & {
  type: "TryStatement";
  block: BlockStatement<X>;
  handler: CatchClause<X> | null;
  finalizer: BlockStatement<X> | null;
};

export type WhileStatement<X> = X & {
  type: "WhileStatement";
  test: Expression<X>;
  body: Statement<X>;
};

export type DoWhileStatement<X> = X & {
  type: "DoWhileStatement";
  body: Statement<X>;
  test: Expression<X>;
};

export type ForStatement<X> = X & {
  type: "ForStatement";
  init: DeclarableExpression<X> | null;
  test: Expression<X> | null;
  update: Expression<X> | null;
  body: Statement<X>;
};

export type ForInStatement<X> = X & {
  type: "ForInStatement";
  left: DeclarablePattern<X>;
  right: Expression<X>;
  body: Statement<X>;
};

export type ForOfStatement<X> = X & {
  type: "ForOfStatement";
  await: boolean | null;
  left: DeclarablePattern<X>;
  right: Expression<X>;
  body: Statement<X>;
};

export type DebuggerStatement<X> = X & {
  type: "DebuggerStatement";
};
