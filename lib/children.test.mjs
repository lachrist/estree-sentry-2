import { assertEqual } from "../test/assert.mjs";
import { TestError } from "../test/error.mjs";
import { listChildren } from "./children.mjs";
import { parse } from "acorn";

const { Error, Infinity } = globalThis;

Error.stackTraceLimit = Infinity;

/**
 * @type {(
 *   code: string,
 *   type: "module" | "script",
 *   children: (string | number)[],
 * ) => void}
 */
const test = (code, type, children) => {
  const root = /** @type {object} */ (
    parse(code, { ecmaVersion: 2024, sourceType: type })
  );
  const todo = [root];
  let index = 0;
  while (todo.length > 0) {
    const node = /** @type {import("./node.js").Node<{}>} */ (todo.pop());
    if (index >= children.length) {
      throw new TestError("too many nodes", { code, node, children });
    }
    const child = children[index++];
    if (node.type === "Identifier") {
      assertEqual(node.name, child);
    } else if (node.type === "PrivateIdentifier") {
      assertEqual(`#${node.name}`, child);
    } else if (node.type === "Literal") {
      assertEqual(node.value, child);
    } else if (node.type === "TemplateElement") {
      assertEqual(node.value.raw, child);
    } else {
      assertEqual(node.type, child);
    }
    todo.push(...listChildren(node).reverse());
  }
};

// statement //

test(";", "script", ["Program", "EmptyStatement"]);

test("debugger;", "script", ["Program", "DebuggerStatement"]);

test("throw x;", "script", ["Program", "ThrowStatement", "x"]);

test("(() => { return x; })", "script", [
  "Program",
  "ExpressionStatement",
  "ArrowFunctionExpression",
  "BlockStatement",
  "ReturnStatement",
  "x",
]);
test("(() => { return; })", "script", [
  "Program",
  "ExpressionStatement",
  "ArrowFunctionExpression",
  "BlockStatement",
  "ReturnStatement",
]);

test("{}", "script", ["Program", "BlockStatement"]);

test("if (x) ;", "script", ["Program", "IfStatement", "x", "EmptyStatement"]);
test("if (x) ; else ;", "script", [
  "Program",
  "IfStatement",
  "x",
  "EmptyStatement",
  "EmptyStatement",
]);

test("while (x);", "script", [
  "Program",
  "WhileStatement",
  "x",
  "EmptyStatement",
]);

test("do ; while (x);", "script", [
  "Program",
  "DoWhileStatement",
  "EmptyStatement",
  "x",
]);

test("for (;;) ;", "script", ["Program", "ForStatement", "EmptyStatement"]);
test("for (x; y; z);", "script", [
  "Program",
  "ForStatement",
  "x",
  "y",
  "z",
  "EmptyStatement",
]);

test("for (x in y);", "script", [
  "Program",
  "ForInStatement",
  "x",
  "y",
  "EmptyStatement",
]);

test("for (x of y);", "script", [
  "Program",
  "ForOfStatement",
  "x",
  "y",
  "EmptyStatement",
]);

test("switch (x) { case y: ; }", "script", [
  "Program",
  "SwitchStatement",
  "x",
  "SwitchCase",
  "y",
  "EmptyStatement",
]);

test("try { } catch (x) { }", "script", [
  "Program",
  "TryStatement",
  "BlockStatement",
  "CatchClause",
  "x",
  "BlockStatement",
]);
test("try { } catch { }", "script", [
  "Program",
  "TryStatement",
  "BlockStatement",
  "CatchClause",
  "BlockStatement",
]);
test("try { } finally { }", "script", [
  "Program",
  "TryStatement",
  "BlockStatement",
  "BlockStatement",
]);

test("l: ;", "script", ["Program", "LabeledStatement", "l", "EmptyStatement"]);

test("l: break l;", "script", [
  "Program",
  "LabeledStatement",
  "l",
  "BreakStatement",
  "l",
]);
test("while (x) break;", "script", [
  "Program",
  "WhileStatement",
  "x",
  "BreakStatement",
]);

test("l: while (x) continue l;", "script", [
  "Program",
  "LabeledStatement",
  "l",
  "WhileStatement",
  "x",
  "ContinueStatement",
  "l",
]);
test("while (x) continue;", "script", [
  "Program",
  "WhileStatement",
  "x",
  "ContinueStatement",
]);

test("with (x) ;", "script", [
  "Program",
  "WithStatement",
  "x",
  "EmptyStatement",
]);

// function //

test("(() => x);", "script", [
  "Program",
  "ExpressionStatement",
  "ArrowFunctionExpression",
  "x",
]);

test("(function () {})", "script", [
  "Program",
  "ExpressionStatement",
  "FunctionExpression",
  "BlockStatement",
]);

test("export default function () {}", "module", [
  "Program",
  "ExportDefaultDeclaration",
  "FunctionDeclaration",
  "BlockStatement",
]);

test("(function f () {})", "script", [
  "Program",
  "ExpressionStatement",
  "FunctionExpression",
  "f",
  "BlockStatement",
]);

test(
  `
  async function* f () {
    await x;
    yield y;
    yield;
  }
`,
  "script",
  [
    "Program",
    "FunctionDeclaration",
    "f",
    "BlockStatement",
    "ExpressionStatement",
    "AwaitExpression",
    "x",
    "ExpressionStatement",
    "YieldExpression",
    "y",
    "ExpressionStatement",
    "YieldExpression",
  ],
);

// class //

test("(class {});", "script", [
  "Program",
  "ExpressionStatement",
  "ClassExpression",
  "ClassBody",
]);

test("(class c extends d {})", "script", [
  "Program",
  "ExpressionStatement",
  "ClassExpression",
  "c",
  "d",
  "ClassBody",
]);

test("class c extends d {}", "script", [
  "Program",
  "ClassDeclaration",
  "c",
  "d",
  "ClassBody",
]);

test("export default class {}", "module", [
  "Program",
  "ExportDefaultDeclaration",
  "ClassDeclaration",
  "ClassBody",
]);

test("class c { #k; k = 123; static {}; m () {} }", "script", [
  "Program",
  "ClassDeclaration",
  "c",
  "ClassBody",
  "PropertyDefinition",
  "#k",
  "PropertyDefinition",
  "k",
  123,
  "StaticBlock",
  "MethodDefinition",
  "m",
  "FunctionExpression",
  "BlockStatement",
]);

// declaration //

test("var x;", "script", [
  "Program",
  "VariableDeclaration",
  "VariableDeclarator",
  "x",
]);
test("var x = y;", "script", [
  "Program",
  "VariableDeclaration",
  "VariableDeclarator",
  "x",
  "y",
]);

test("export default x;", "module", [
  "Program",
  "ExportDefaultDeclaration",
  "x",
]);

test("let x; export { x as 'specifier' };", "module", [
  "Program",
  "VariableDeclaration",
  "VariableDeclarator",
  "x",
  "ExportNamedDeclaration",
  "ExportSpecifier",
  "x",
  "specifier",
]);

test("export var x;", "module", [
  "Program",
  "ExportNamedDeclaration",
  "VariableDeclaration",
  "VariableDeclarator",
  "x",
]);

test("export * from 'source';", "module", [
  "Program",
  "ExportAllDeclaration",
  "source",
]);
test("export * as 'specifier' from 'source';", "module", [
  "Program",
  "ExportAllDeclaration",
  "specifier",
  "source",
]);

test("import 'source';", "module", ["Program", "ImportDeclaration", "source"]);

test("import { 'specifier' as x } from 'source';", "module", [
  "Program",
  "ImportDeclaration",
  "ImportSpecifier",
  "specifier",
  "x",
  "source",
]);

test("import * as x from 'source';", "module", [
  "Program",
  "ImportDeclaration",
  "ImportNamespaceSpecifier",
  "x",
  "source",
]);

test("import x from 'source';", "module", [
  "Program",
  "ImportDeclaration",
  "ImportDefaultSpecifier",
  "x",
  "source",
]);

// expression //

test("x;", "script", ["Program", "ExpressionStatement", "x"]);

test("123;", "script", ["Program", "ExpressionStatement", 123]);

test("`foo${123}bar`;", "script", [
  "Program",
  "ExpressionStatement",
  "TemplateLiteral",
  "foo",
  "bar",
  "123",
]);

test("f`foo`;", "script", [
  "Program",
  "ExpressionStatement",
  "TaggedTemplateExpression",
  "f",
  "TemplateLiteral",
  "foo",
]);

test("x.y;", "script", [
  "Program",
  "ExpressionStatement",
  "MemberExpression",
  "x",
  "y",
]);

test("[x, ...y, z];", "script", [
  "Program",
  "ExpressionStatement",
  "ArrayExpression",
  "x",
  "SpreadElement",
  "y",
  "z",
]);

test("this;", "script", ["Program", "ExpressionStatement", "ThisExpression"]);

test("import.meta", "module", [
  "Program",
  "ExpressionStatement",
  "MetaProperty",
]);

test("import('source');", "module", [
  "Program",
  "ExpressionStatement",
  "ImportExpression",
  "source",
]);

test("new f(x);", "script", [
  "Program",
  "ExpressionStatement",
  "NewExpression",
  "f",
  "x",
]);

test("f(x);", "script", [
  "Program",
  "ExpressionStatement",
  "CallExpression",
  "f",
  "x",
]);

test("(x, y);", "script", [
  "Program",
  "ExpressionStatement",
  "SequenceExpression",
  "x",
  "y",
]);

test("!x;", "script", [
  "Program",
  "ExpressionStatement",
  "UnaryExpression",
  "x",
]);

test("x++;", "script", [
  "Program",
  "ExpressionStatement",
  "UpdateExpression",
  "x",
]);

test("x + y;", "script", [
  "Program",
  "ExpressionStatement",
  "BinaryExpression",
  "x",
  "y",
]);

test("x ? y : z;", "script", [
  "Program",
  "ExpressionStatement",
  "ConditionalExpression",
  "x",
  "y",
  "z",
]);

test("x || y;", "script", [
  "Program",
  "ExpressionStatement",
  "LogicalExpression",
  "x",
  "y",
]);

test("x = y;", "script", [
  "Program",
  "ExpressionStatement",
  "AssignmentExpression",
  "x",
  "y",
]);

test("x?.y;", "script", [
  "Program",
  "ExpressionStatement",
  "ChainExpression",
  "MemberExpression",
  "x",
  "y",
]);

test("({ m () { super.k; } });", "script", [
  "Program",
  "ExpressionStatement",
  "ObjectExpression",
  "Property",
  "m",
  "FunctionExpression",
  "BlockStatement",
  "ExpressionStatement",
  "MemberExpression",
  "Super",
  "k",
]);

// pattern //

test("let [...x] = 123;", "script", [
  "Program",
  "VariableDeclaration",
  "VariableDeclarator",
  "ArrayPattern",
  "RestElement",
  "x",
  123,
]);

test("let {k: x = 456} = 123;", "script", [
  "Program",
  "VariableDeclaration",
  "VariableDeclarator",
  "ObjectPattern",
  "Property",
  "k",
  "AssignmentPattern",
  "x",
  456,
  123,
]);
