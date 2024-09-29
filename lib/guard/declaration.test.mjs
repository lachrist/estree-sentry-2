import { pass } from "../../test/test.mjs";

pass(`var x = 123;`);

pass(`let x = 456;`);

pass(`const x = 789;`);

pass(`var x = 123, y; var z = 789;`);

pass("export var x;", "module");

pass("export function f () {}", "module");

pass("export class c {}", "module");
