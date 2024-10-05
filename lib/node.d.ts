import type {
  CallExpression,
  OptionalChainCallExpression,
  NonOptionalChainCallExpression,
} from "./node/call";
import type { ChainExpression } from "./node/chain";
import type {
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
} from "./node/class";
import type {
  VariableDeclaration,
  VariableDeclarator,
} from "./node/declaration";
import type {
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
} from "./node/expression";
import type {
  FunctionExpression,
  ExpressionArrowFunctionExpression,
  BlockArrowFunctionExpression,
  FunctionDeclaration,
  AnonymousFunctionDeclaration,
} from "./node/function";
import type { Identifier, PrivateIdentifier } from "./node/identifier";
import type {
  NullLiteral,
  TrueLiteral,
  FalseLiteral,
  NumberLiteral,
  StringLiteral,
  BigIntLiteral,
  RegExpLiteral,
} from "./node/literal";
import type {
  ComputedMemberExpression,
  NonComputedMemberExpression,
  ComputedOptionalChainMemberExpression,
  NonComputedOptionalChainMemberExpression,
  ComputedNonOptionalChainMemberExpression,
  NonComputedNonOptionalChainMemberExpression,
} from "./node/member";
import type {
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
} from "./node/module";
import type {
  ObjectExpression,
  NonComputedValueObjectProperty,
  ComputedValueObjectProperty,
  NonComputedMethodObjectProperty,
  ComputedMethodObjectProperty,
  ComputedGetterObjectProperty,
  NonComputedGetterObjectProperty,
  ComputedSetterObjectProperty,
  NonComputedSetterObjectProperty,
} from "./node/object";
import type {
  NonComputedPatternProperty,
  ComputedPatternProperty,
  RestElement,
  ObjectPattern,
  ArrayPattern,
  AssignmentPattern,
} from "./node/pattern";
import type { ModuleProgram, ScriptProgram } from "./node/program";
import type {
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
} from "./node/statement";
import type {
  TaggedTemplateExpression,
  TemplateLiteral,
  TemplateElement,
} from "./node/template";

export type Function<X> =
  | FunctionExpression<X>
  | ExpressionArrowFunctionExpression<X>
  | BlockArrowFunctionExpression<X>
  | FunctionDeclaration<X>
  | AnonymousFunctionDeclaration<X>;

export type Class<X> =
  | ClassExpression<X>
  | ClassDeclaration<X>
  | AnonymousClassDeclaration<X>;

export type Node<X> =
  | CallExpression<X>
  | OptionalChainCallExpression<X>
  | NonOptionalChainCallExpression<X>
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
  | Identifier<X, string>
  | PrivateIdentifier<X, string>
  | NullLiteral<X>
  | TrueLiteral<X>
  | FalseLiteral<X>
  | NumberLiteral<X>
  | StringLiteral<X, string>
  | BigIntLiteral<X, string>
  | RegExpLiteral<X>
  | ComputedMemberExpression<X>
  | NonComputedMemberExpression<X>
  | ComputedOptionalChainMemberExpression<X>
  | NonComputedOptionalChainMemberExpression<X>
  | ComputedNonOptionalChainMemberExpression<X>
  | NonComputedNonOptionalChainMemberExpression<X>
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
  | NonComputedValueObjectProperty<X>
  | ComputedValueObjectProperty<X>
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
