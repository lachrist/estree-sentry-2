import { pass } from "../test.mjs";

pass("(async function* f(x, y, ...zs) {});");
pass("(function (x, y, ...zs) {});");

pass("function f(x, y, ...zs) {}");
pass("async function* f(x, y, ...zs) {}");

pass("export default function (x, y, ...zs) {}", "module");
pass("export default async function* (x, y, ...zs) {}", "module");

pass("({ get k () {} });");

pass("({ set k (x) {} });");

pass("((x, y, ...zs) => {});");
pass("(async (x, y, ...zs) => {});");

pass("((x, y, ...zs) => r);");
pass("(async (x, y, ...zs) => r);");

pass("(class { constructor (x, y, ...zs) {} });");

pass("({ m (x, y, ...zs) {} });");
