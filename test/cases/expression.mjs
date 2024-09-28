import { pass } from "../test.mjs";

pass("for (var x;;);");
pass("for (x;;);");

pass("({ m () { super.k; }});");

pass("(async () => { await x; });");

pass("(function* () { yield x; });");
pass("(function* () { yield* x; });");
pass("(function* () { yield; });");

pass("(class {});");

pass("123;");

pass("x;");

pass("x.y;");

pass("this;");

pass("(function () { new.target; });");

pass("import.meta;", "module");

pass("k in o;");
pass("(class { #p; static { #p in x } });");

pass("x + y;");

pass("!x;");

pass("import(x);");

pass("o?.k;");

pass("x++;");
pass("x--;");
pass("++x;");
pass("--x;");

pass("x = y;");
pass("x += y;");

pass("x ? y : z;");

pass("x && y;");
pass("x || y;");
pass("x ?? y;");

pass("`t`;");

pass("f`t`;");

pass("f();");

pass("new f(x, ...y, z);");

pass("[x,, ...y,, z];");

pass("({})");

pass("(x, y, z);");
