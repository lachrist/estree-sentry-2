import { pass } from "../test.mjs";

pass("123;");
pass("123.456;");
pass("0x123;");

pass("123n;");

pass("'abc';");
pass('"abc";');

pass("null");

pass("true");
pass("false");

pass("/pattern/u;");

pass("import 'source';", "module");

pass("var x; export { x as 'specifier' };", "module");

pass("({ 'k': x });");
pass("({ 123: x });");
pass("({ 123n: x });");
