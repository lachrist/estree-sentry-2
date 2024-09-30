import {
  CatchClause,
  BlockStatement,
  Statement,
  SwitchCase,
} from "./syntax/statement";
import { ChainableExpression } from "./syntax/chain";
import {
  CallablePattern,
  CallableUpdatePattern,
  DeclarablePattern,
  Pattern,
  RestablePattern,
  RestablePatternProperty,
  UpdatePattern,
} from "./syntax/pattern";
import { ClassEntry, ClassBody } from "./syntax/class";
import {
  ConstructorFunctionExpression,
  MethodFunctionExpression,
  GetterFunctionExpression,
  SetterFunctionExpression,
} from "./syntax/function";
import { Declaration, VariableDeclarator } from "./syntax/declaration";
import {
  DefaultDeclaration,
  ExportSpecifier,
  ImportSpecifier,
  ModuleStatement,
  Specifier,
} from "./syntax/module";
import {
  DeclarableExpression,
  Expression,
  PrivatableExpression,
  SpreadableExpression,
  SuperableExpression,
} from "./syntax/expression";
import { Program } from "./syntax/program";
import { Key, KeyIdentifier, PublicKey } from "./syntax/key";
import { SourceLiteral } from "./syntax/literal";
import { SpreadableObjectProperty } from "./syntax/object";
import { TemplateElement, TemplateLiteral } from "./syntax/template";
import {
  ConstructorIdentifier,
  KeywordIdentifier,
  LabelIdentifier,
  PublicKeyIdentifier,
  VariableIdentifier,
} from "./syntax/identifier";

export type KindRecord<X> = {
  MethodFunctionExpression: MethodFunctionExpression<X>;
  ConstructorFunctionExpression: ConstructorFunctionExpression<X>;
  GetterFunctionExpression: GetterFunctionExpression<X>;
  SetterFunctionExpression: SetterFunctionExpression<X>;
  DeclarableExpression: DeclarableExpression<X>;
  Program: Program<X>;
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
