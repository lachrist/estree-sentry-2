import { pass } from "../../test/test.mjs";

pass("import { 'specifier' as local } from 'source';", "module");

pass("import 'source';", "module");
pass("import * as namespace from 'source';", "module");
pass("import { specifier as local } from 'source';", "module");
pass("import def from 'source';", "module");

pass("export * from 'source';", "module");
pass("export * as namespace from 'source';", "module");

pass("export { specifier1 as specifier2 } from 'source';", "module");

pass("export default 123;", "module");
pass("export default function () {};", "module");
pass("export default function f () {};", "module");
pass("export default class {};", "module");
pass("export default class c {};", "module");

pass("var local; export { local as specifier };", "module");

pass("export var local;", "module");
pass("export class c {};", "module");
pass("export function f () {};", "module");
