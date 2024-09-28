import { CallExpression } from "./call";
import { VariableDeclaration } from "./declaration";
import type { Expression } from "./expression";
import type { VariableIdentifier } from "./identifier";
import type { Key } from "./key";
import { MemberExpression } from "./member";

export type Pattern<X> =
  | VariableIdentifier<X>
  | MemberExpression<X>
  | ObjectPattern<X>
  | ArrayPattern<X>
  | AssignmentPattern<X>;

export type DeclarablePattern<X> = Pattern<X> | VariableDeclaration<X>;

export type RestablePattern<X> = RestElement<X> | Pattern<X>;

export type UpdatePattern<X> = VariableIdentifier<X> | MemberExpression<X>;

export type CallablePattern<X> = CallExpression<X> | Pattern<X>;

export type CallableUpdatePattern<X> = CallExpression<X> | UpdatePattern<X>;

export type PatternProperty<X> =
  | NonComputedPatternProperty<X>
  | ComputedPatternProperty<X>;

export type RestablePatternProperty<X> = PatternProperty<X> | RestElement<X>;

export type NonComputedPatternProperty<X> = (X extends null ? {} : X) & {
  type: "Property";
  key: Key<X>;
  value: Pattern<X>;
  kind: "init";
  method: false;
  shorthand: boolean;
  computed: false;
};

export type ComputedPatternProperty<X> = (X extends null ? {} : X) & {
  type: "Property";
  key: Expression<X>;
  value: Pattern<X>;
  kind: "init";
  method: false;
  shorthand: boolean;
  computed: true;
};

export type RestElement<X> = (X extends null ? {} : X) & {
  type: "RestElement";
  argument: Pattern<X>;
};

export type ObjectPattern<X> = (X extends null ? {} : X) & {
  type: "ObjectPattern";
  properties: Array<RestablePatternProperty<X>>;
};

export type ArrayPattern<X> = (X extends null ? {} : X) & {
  type: "ArrayPattern";
  elements: Array<Pattern<X> | RestElement<X> | null>;
};

export type AssignmentPattern<X> = (X extends null ? {} : X) & {
  type: "AssignmentPattern";
  left: Pattern<X>;
  right: Expression<X>;
};
