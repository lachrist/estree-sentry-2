import { CallExpression, OptionalCallExpression } from "./syntax/call";
import { ChainExpression } from "./syntax/chain";
import {
  ClassExpression,
  ClassDeclaration,
  ClassBody,
  ConstructorMethodDefinition,
  ComputedPlainMethodDefinition,
  NonComputedPlainMethodDefinition,
  ComputedGetterMethodDefinition,
  NonComputedGetterMethodDefinition,
  ComputedSetterMethodDefinition,
  NonComputedSetterMethodDefinition,
  ComputedPropertyDefinition,
  NonComputedPropertyDefinition,
  StaticBlock,
  AnonymousClassDeclaration,
} from "./syntax/class";
import { VariableDeclaration, VariableDeclarator } from "./syntax/declaration";
import {
  ThisExpression,
  ArrayExpression,
  SequenceExpression,
  UnaryExpression,
  InBinaryExpression,
  OtherBinaryExpression,
  UpdateAssignmentExpression,
  DirectAssignmentExpression,
  UpdateExpression,
  LogicalExpression,
  ConditionalExpression,
  NewExpression,
  Super,
  SpreadElement,
  YieldExpression,
  MetaProperty,
  ImportExpression,
  AwaitExpression,
} from "./syntax/expression";
import {
  FunctionExpression,
  ExpressionArrowFunctionExpression,
  BlockArrowFunctionExpression,
  FunctionDeclaration,
  AnonymousFunctionDeclaration,
} from "./syntax/function";
import {
  PublicKeyIdentifier,
  PrivateKeyIdentifier,
  VariableIdentifier,
  LabelIdentifier,
  SpecifierIdentifier,
  KeywordIdentifier,
  ConstructorIdentifier,
} from "./syntax/identifier";
import {
  SourceLiteral,
  SpecifierLiteral,
  PublicObjectKeyStringLiteral,
  StringLiteral,
  NumberLiteral,
  NullLiteral,
  BooleanLiteral,
  BigIntLiteral,
  RegExpLiteral,
} from "./syntax/literal";
import {
  ComputedMemberExpression,
  NonComputedMemberExpression,
  OptionalComputedMemberExpression,
  OptionalNonComputedMemberExpression,
} from "./syntax/member";
import {
  ImportDeclaration,
  RegularImportSpecifier,
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
  AggregateExportNamedDeclaration,
  IndirectExportNamedDeclaration,
  DirectExportNamedDeclaration,
  AggregateExportSpecifier,
  ExportSpecifier,
  ExportDefaultDeclaration,
  ExportAllDeclaration,
} from "./syntax/module";
import {
  ObjectExpression,
  NonComputedPlainObjectProperty,
  ComputedPlainObjectProperty,
  NonComputedMethodObjectProperty,
  ComputedMethodObjectProperty,
  ComputedGetterObjectProperty,
  NonComputedGetterObjectProperty,
  ComputedSetterObjectProperty,
  NonComputedSetterObjectProperty,
} from "./syntax/object";
import {
  NonComputedPatternProperty,
  ComputedPatternProperty,
  RestElement,
  ObjectPattern,
  ArrayPattern,
  AssignmentPattern,
} from "./syntax/pattern";
import { ModuleProgram, ScriptProgram } from "./syntax/program";
import {
  SwitchCase,
  CatchClause,
  EmptyStatement,
  BlockStatement,
  ExpressionStatement,
  IfStatement,
  LabeledStatement,
  BreakStatement,
  ContinueStatement,
  WithStatement,
  SwitchStatement,
  ReturnStatement,
  ThrowStatement,
  TryStatement,
  WhileStatement,
  DoWhileStatement,
  ForStatement,
  ForInStatement,
  ForOfStatement,
  DebuggerStatement,
} from "./syntax/statement";
import {
  TaggedTemplateExpression,
  TemplateLiteral,
  TemplateElement,
} from "./syntax/template";

export type Class<X> =
  | ClassExpression<X>
  | ClassDeclaration<X>
  | AnonymousClassDeclaration<X>;

export type Function<X> =
  | FunctionExpression<X>
  | ExpressionArrowFunctionExpression<X>
  | BlockArrowFunctionExpression<X>
  | FunctionDeclaration<X>
  | AnonymousFunctionDeclaration<X>;

export type Node<X> =
  | CallExpression<X>
  | OptionalCallExpression<X>
  | ChainExpression<X>
  | ClassExpression<X>
  | ClassDeclaration<X>
  | AnonymousClassDeclaration<X>
  | ClassBody<X>
  | ConstructorMethodDefinition<X>
  | ComputedPlainMethodDefinition<X>
  | NonComputedPlainMethodDefinition<X>
  | ComputedGetterMethodDefinition<X>
  | NonComputedGetterMethodDefinition<X>
  | ComputedSetterMethodDefinition<X>
  | NonComputedSetterMethodDefinition<X>
  | ComputedPropertyDefinition<X>
  | NonComputedPropertyDefinition<X>
  | StaticBlock<X>
  | VariableDeclaration<X>
  | VariableDeclarator<X>
  | ThisExpression<X>
  | ArrayExpression<X>
  | SequenceExpression<X>
  | UnaryExpression<X>
  | InBinaryExpression<X>
  | OtherBinaryExpression<X>
  | UpdateAssignmentExpression<X>
  | DirectAssignmentExpression<X>
  | UpdateExpression<X>
  | LogicalExpression<X>
  | ConditionalExpression<X>
  | NewExpression<X>
  | Super<X>
  | SpreadElement<X>
  | YieldExpression<X>
  | MetaProperty<X>
  | ImportExpression<X>
  | AwaitExpression<X>
  | FunctionExpression<X>
  | ExpressionArrowFunctionExpression<X>
  | BlockArrowFunctionExpression<X>
  | FunctionDeclaration<X>
  | AnonymousFunctionDeclaration<X>
  | PublicKeyIdentifier<X>
  | PrivateKeyIdentifier<X>
  | VariableIdentifier<X>
  | LabelIdentifier<X>
  | SpecifierIdentifier<X>
  | KeywordIdentifier<X>
  | ConstructorIdentifier<X>
  | SourceLiteral<X>
  | SpecifierLiteral<X>
  | PublicObjectKeyStringLiteral<X>
  | StringLiteral<X>
  | NumberLiteral<X>
  | NullLiteral<X>
  | BooleanLiteral<X>
  | BigIntLiteral<X>
  | RegExpLiteral<X>
  | ComputedMemberExpression<X>
  | NonComputedMemberExpression<X>
  | OptionalComputedMemberExpression<X>
  | OptionalNonComputedMemberExpression<X>
  | ImportDeclaration<X>
  | RegularImportSpecifier<X>
  | ImportDefaultSpecifier<X>
  | ImportNamespaceSpecifier<X>
  | AggregateExportNamedDeclaration<X>
  | IndirectExportNamedDeclaration<X>
  | DirectExportNamedDeclaration<X>
  | AggregateExportSpecifier<X>
  | ExportSpecifier<X>
  | ExportDefaultDeclaration<X>
  | ExportAllDeclaration<X>
  | ObjectExpression<X>
  | NonComputedPlainObjectProperty<X>
  | ComputedPlainObjectProperty<X>
  | NonComputedMethodObjectProperty<X>
  | ComputedMethodObjectProperty<X>
  | ComputedGetterObjectProperty<X>
  | NonComputedGetterObjectProperty<X>
  | ComputedSetterObjectProperty<X>
  | NonComputedSetterObjectProperty<X>
  | NonComputedPatternProperty<X>
  | ComputedPatternProperty<X>
  | RestElement<X>
  | ObjectPattern<X>
  | ArrayPattern<X>
  | AssignmentPattern<X>
  | ModuleProgram<X>
  | ScriptProgram<X>
  | SwitchCase<X>
  | CatchClause<X>
  | EmptyStatement<X>
  | BlockStatement<X>
  | ExpressionStatement<X>
  | IfStatement<X>
  | LabeledStatement<X>
  | BreakStatement<X>
  | ContinueStatement<X>
  | WithStatement<X>
  | SwitchStatement<X>
  | ReturnStatement<X>
  | ThrowStatement<X>
  | TryStatement<X>
  | WhileStatement<X>
  | DoWhileStatement<X>
  | ForStatement<X>
  | ForInStatement<X>
  | ForOfStatement<X>
  | DebuggerStatement<X>
  | TaggedTemplateExpression<X>
  | TemplateLiteral<X>
  | TemplateElement<X>;
