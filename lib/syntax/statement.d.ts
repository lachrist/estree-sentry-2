import type { ClassDeclaration } from "./class";
import { VariableDeclaration } from "./declaration";
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

export type SwitchCase<X> = (X extends null ? {} : X) & {
  type: "SwitchCase";
  test: Expression<X> | null;
  consequent: Statement<X>[];
};

export type CatchClause<X> = (X extends null ? {} : X) & {
  type: "CatchClause";
  param: Pattern<X> | null;
  body: BlockStatement<X>;
};

export type EmptyStatement<X> = (X extends null ? {} : X) & {
  type: "EmptyStatement";
};

export type BlockStatement<X> = (X extends null ? {} : X) & {
  type: "BlockStatement";
  body: Statement<X>[];
};

export type ExpressionStatement<X> = (X extends null ? {} : X) & {
  type: "ExpressionStatement";
  expression: Expression<X>;
  directive: string | null;
};

export type IfStatement<X> = (X extends null ? {} : X) & {
  type: "IfStatement";
  test: Expression<X>;
  consequent: Statement<X>;
  alternate: Statement<X> | null;
};

export type LabeledStatement<X> = (X extends null ? {} : X) & {
  type: "LabeledStatement";
  label: LabelIdentifier<X>;
  body: Statement<X>;
};

export type BreakStatement<X> = (X extends null ? {} : X) & {
  type: "BreakStatement";
  label: LabelIdentifier<X> | null;
};

export type ContinueStatement<X> = (X extends null ? {} : X) & {
  type: "ContinueStatement";
  label: LabelIdentifier<X> | null;
};

export type WithStatement<X> = (X extends null ? {} : X) & {
  type: "WithStatement";
  object: Expression<X>;
  body: Statement<X>;
};

export type SwitchStatement<X> = (X extends null ? {} : X) & {
  type: "SwitchStatement";
  discriminant: Expression<X>;
  cases: SwitchCase<X>[];
};

export type ReturnStatement<X> = (X extends null ? {} : X) & {
  type: "ReturnStatement";
  argument: Expression<X> | null;
};

export type ThrowStatement<X> = (X extends null ? {} : X) & {
  type: "ThrowStatement";
  argument: Expression<X>;
};

export type TryStatement<X> = (X extends null ? {} : X) & {
  type: "TryStatement";
  block: BlockStatement<X>;
  handler: CatchClause<X> | null;
  finalizer: BlockStatement<X> | null;
};

export type WhileStatement<X> = (X extends null ? {} : X) & {
  type: "WhileStatement";
  test: Expression<X>;
  body: Statement<X>;
};

export type DoWhileStatement<X> = (X extends null ? {} : X) & {
  type: "DoWhileStatement";
  body: Statement<X>;
  test: Expression<X>;
};

export type ForStatement<X> = (X extends null ? {} : X) & {
  type: "ForStatement";
  init: DeclarableExpression<X> | null;
  test: Expression<X> | null;
  update: Expression<X> | null;
  body: Statement<X>;
};

export type ForInStatement<X> = (X extends null ? {} : X) & {
  type: "ForInStatement";
  left: DeclarablePattern<X>;
  right: Expression<X>;
  body: Statement<X>;
};

export type ForOfStatement<X> = (X extends null ? {} : X) & {
  type: "ForOfStatement";
  await: boolean | null;
  left: DeclarablePattern<X>;
  right: Expression<X>;
  body: Statement<X>;
};

export type DebuggerStatement<X> = (X extends null ? {} : X) & {
  type: "DebuggerStatement";
};
