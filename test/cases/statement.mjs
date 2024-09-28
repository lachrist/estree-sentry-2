import { pass } from "../test.mjs";

pass("for (let x of xs) y;");
pass("for (x of xs) y;");

pass("for (let x in xs) y;");
pass("for (x in xs) y;");

pass("for (;;) y;");
pass("for (x;;) y;");
pass("for (let x;;) y;");
pass("for (x;y;z) t;");

pass("while (x) y;");
pass("do y; while (x);");

pass("switch (x) { case y: z; }");
pass("switch (x) { default: z; }");

pass("try { x; } catch { y; }");
pass("try { x; } finally { z; }");
pass("try { x; } catch { y; } finally { z;}");
pass("try { x; } catch (e) { y;}");

pass("with (x) y;");

pass("l: x;");

pass("while (x) break;");
pass("l: break l;");

pass("while (x) continue;");
pass("l: while (x) continue l;");

pass("(() => { return x; });");
pass("(() => { return; });");

pass("throw x;");

pass("debugger;");

pass("if (x) y;");
pass("if (x) y; else z;");

pass(";");

pass("class c {}");

pass("function f () {}");

pass("(() => { 'use strict'; });");

pass("var x;");

pass("{ x; }");
