/**
 * A `kind` is a union of node types that appears as a property value in any
 * node type. For instance, `KeyIdentifier` appears as the `property` of
 * `NonComputedMemberExpression` and can either an `Identifier` or a
 * `PrivateIdentifier`.
 *
 * @module
 */

import type {
  CatchClause,
  BlockStatement,
  Statement,
  SwitchCase,
} from "./node/statement";
import type {
  ChainableExpression,
  SuperableChainableExpression,
} from "./node/chain";
import type {
  CallablePattern,
  CallableUpdatePattern,
  DeclarablePattern,
  Pattern,
  RestablePattern,
  RestablePatternProperty,
  UpdatePattern,
} from "./node/pattern";
import type { ClassEntry, ClassBody } from "./node/class";
import type {
  ConstructorFunctionExpression,
  MethodFunctionExpression,
  GetterFunctionExpression,
  SetterFunctionExpression,
} from "./node/function";
import type { Declaration, VariableDeclarator } from "./node/declaration";
import type {
  DefaultDeclaration,
  ExportSpecifier,
  ImportSpecifier,
  ModuleStatement,
  Specifier,
} from "./node/module";
import type {
  DeclarableExpression,
  Expression,
  PrivatableExpression,
  SpreadableExpression,
  SuperableExpression,
} from "./node/expression";
import type { Program } from "./node/program";
import type { Key, KeyIdentifier, PublicKey } from "./node/key";
import type { SourceLiteral } from "./node/literal";
import type { SpreadableObjectProperty } from "./node/object";
import type { TemplateElement, TemplateLiteral } from "./node/template";
import type {
  ConstructorIdentifier,
  KeywordIdentifier,
  LabelIdentifier,
  PublicKeyIdentifier,
  VariableIdentifier,
} from "./node/identifier";

export type KindRecord<X> = {
  SuperableChainableExpression: SuperableChainableExpression<X>;
  MethodFunctionExpression: MethodFunctionExpression<X>;
  ConstructorFunctionExpression: ConstructorFunctionExpression<X>;
  GetterFunctionExpression: GetterFunctionExpression<X>;
  SetterFunctionExpression: SetterFunctionExpression<X>;
  DeclarableExpression: DeclarableExpression<X>;
  Program: Program<X>;
  ScriptProgram: Program<X>;
  ModuleProgram: Program<X>;
  Expression: Expression<X>;
  SpreadableExpression: SpreadableExpression<X>;
  SuperableExpression: SuperableExpression<X>;
  Statement: Statement<X>;
  ModuleStatement: ModuleStatement<X>;
  Pattern: Pattern<X>;
  RestablePattern: RestablePattern<X>;
  DefaultDeclaration: DefaultDeclaration<X>;
  RestablePatternProperty: RestablePatternProperty<X>;
  Key: Key<X>;
  KeyIdentifier: KeyIdentifier<X>;
  PublicKey: PublicKey<X>;
  SourceLiteral: SourceLiteral<X>;
  SpreadableObjectProperty: SpreadableObjectProperty<X>;
  TemplateElement: TemplateElement<X>;
  TemplateLiteral: TemplateLiteral<X>;
  CallableUpdatePattern: CallableUpdatePattern<X>;
  VariableDeclarator: VariableDeclarator<X>;
  DeclarablePattern: DeclarablePattern<X>;
  ConstructorIdentifier: ConstructorIdentifier<X>;
  PublicKeyIdentifier: PublicKeyIdentifier<X>;
  ChainableExpression: ChainableExpression<X>;
  CatchClause: CatchClause<X>;
  SwitchCase: SwitchCase<X>;
  Specifier: Specifier<X>;
  KeywordIdentifier: KeywordIdentifier<X>;
  ImportSpecifier: ImportSpecifier<X>;
  LabelIdentifier: LabelIdentifier<X>;
  VariableIdentifier: VariableIdentifier<X>;
  ExportSpecifier: ExportSpecifier<X>;
  CallablePattern: CallablePattern<X>;
  Declaration: Declaration<X>;
  BlockStatement: BlockStatement<X>;
  ClassBody: ClassBody<X>;
  PrivatableExpression: PrivatableExpression<X>;
  ClassEntry: ClassEntry<X>;
  UpdatePattern: UpdatePattern<X>;
};

export type Kind = keyof KindRecord<{}>;
