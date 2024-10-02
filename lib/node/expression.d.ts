import type { ClassExpression } from "./class";
import type {
  KeywordIdentifier,
  PrivateKeyIdentifier,
  PublicKeyIdentifier,
  VariableIdentifier,
} from "./identifier";
import type { ArrowFunctionExpression, FunctionExpression } from "./function";
import type {
  AssignmentOperator,
  BinaryOperator,
  LogicalOperator,
  UnaryOperator,
  UpdateOperator,
} from "../operator";
import type {
  CallablePattern,
  CallableUpdatePattern,
  UpdatePattern,
} from "./pattern";
import type { Literal } from "./literal";
import type { ObjectExpression } from "./object";
import type { MemberExpression } from "./member";
import type { TaggedTemplateExpression, TemplateLiteral } from "./template";
import type { CallExpression } from "./call";
import type { ChainExpression } from "./chain";
import type { VariableDeclaration } from "./declaration";

export type Expression<X> =
  | ArrayExpression<X>
  | ArrowFunctionExpression<X>
  | AssignmentExpression<X>
  | AwaitExpression<X>
  | BinaryExpression<X>
  | CallExpression<X>
  | ChainExpression<X>
  | ClassExpression<X>
  | ConditionalExpression<X>
  | FunctionExpression<X>
  | VariableIdentifier<X>
  | ImportExpression<X>
  | Literal<X>
  | LogicalExpression<X>
  | MemberExpression<X>
  | MetaProperty<X>
  | NewExpression<X>
  | ObjectExpression<X>
  | SequenceExpression<X>
  | TaggedTemplateExpression<X>
  | TemplateLiteral<X>
  | ThisExpression<X>
  | UnaryExpression<X>
  | UpdateExpression<X>
  | YieldExpression<X>;

export type DeclarableExpression<X> = VariableDeclaration<X> | Expression<X>;

export type SpreadableExpression<X> = SpreadElement<X> | Expression<X>;

export type SuperableExpression<X> = Super<X> | Expression<X>;

export type PrivatableExpression<X> = PrivateKeyIdentifier<X> | Expression<X>;

export type ThisExpression<X> = X & {
  type: "ThisExpression";
};

export type ArrayExpression<X> = X & {
  type: "ArrayExpression";
  elements: Array<SpreadableExpression<X> | null>;
};

export type SequenceExpression<X> = X & {
  type: "SequenceExpression";
  expressions: Expression<X>[];
};

export type UnaryExpression<X> = X & {
  type: "UnaryExpression";
  operator: UnaryOperator;
  prefix: true;
  argument: Expression<X>;
};

export type InBinaryExpression<X> = X & {
  type: "BinaryExpression";
  operator: "in";
  left: PrivatableExpression<X>;
  right: Expression<X>;
};

export type OtherBinaryExpression<X> = X & {
  type: "BinaryExpression";
  operator: Exclude<BinaryOperator, "in">;
  left: Expression<X>;
  right: Expression<X>;
};

export type BinaryExpression<X> =
  | InBinaryExpression<X>
  | OtherBinaryExpression<X>;

export type UpdateAssignmentExpression<X> = X & {
  type: "AssignmentExpression";
  operator: Exclude<AssignmentOperator, "=">;
  left: CallableUpdatePattern<X>;
  right: Expression<X>;
};

export type DirectAssignmentExpression<X> = X & {
  type: "AssignmentExpression";
  operator: "=";
  left: CallablePattern<X>;
  right: Expression<X>;
};

export type AssignmentExpression<X> =
  | UpdateAssignmentExpression<X>
  | DirectAssignmentExpression<X>;

export type UpdateExpression<X> = X & {
  type: "UpdateExpression";
  operator: UpdateOperator;
  argument: UpdatePattern<X>;
  prefix: boolean;
};

export type LogicalExpression<X> = X & {
  type: "LogicalExpression";
  operator: LogicalOperator;
  left: Expression<X>;
  right: Expression<X>;
};

export type ConditionalExpression<X> = X & {
  type: "ConditionalExpression";
  test: Expression<X>;
  alternate: Expression<X>;
  consequent: Expression<X>;
};

export type NewExpression<X> = X & {
  type: "NewExpression";
  callee: Expression<X>;
  arguments: Array<SpreadableExpression<X>>;
};

export type Super<X> = X & {
  type: "Super";
};

export type SpreadElement<X> = X & {
  type: "SpreadElement";
  argument: Expression<X>;
};

export type YieldExpression<X> = X & {
  type: "YieldExpression";
  delegate: boolean;
  argument: Expression<X> | null;
};

export type MetaProperty<X> = X & {
  type: "MetaProperty";
  meta: KeywordIdentifier<X>;
  property: PublicKeyIdentifier<X>;
};

export type ImportExpression<X> = X & {
  type: "ImportExpression";
  source: Expression<X>;
};

export type AwaitExpression<X> = X & {
  type: "AwaitExpression";
  argument: Expression<X>;
};
