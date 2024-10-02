import { pass } from "../../test/test.mjs";

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

pass("({null:123});");
pass("({true:123});");
pass("({false:123});");
pass("({123:456});");
pass("({'foo':123});");
pass("({123n:456});");
