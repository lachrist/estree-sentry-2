import {
  BlockStatement,
  CallablePattern,
  CallableUpdatePattern,
  CatchClause,
  ChainableExpression,
  ClassBody,
  ClassEntry,
  ConstructorIdentifier,
  DeclarableExpression,
  DeclarablePattern,
  Declaration,
  DefaultDeclaration,
  ExportSpecifier,
  Expression,
  FunctionExpression,
  ImportSpecifier,
  Key,
  KeyIdentifier,
  KeywordIdentifier,
  LabelIdentifier,
  ModuleStatement,
  OptionalExpression,
  Pattern,
  PrivatableExpression,
  Program,
  PublicKey,
  PublicKeyIdentifier,
  RestablePattern,
  RestablePatternProperty,
  SourceLiteral,
  Specifier,
  SpreadableExpression,
  SpreadableObjectProperty,
  Statement,
  SuperableExpression,
  SwitchCase,
  TemplateElement,
  TemplateLiteral,
  UpdatePattern,
  VariableDeclarator,
  VariableIdentifier,
} from "./syntax";

export type KindRecord<X> = {
  FunctionExpression: FunctionExpression<X>;
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
  OptionalExpression: OptionalExpression<X>;
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
