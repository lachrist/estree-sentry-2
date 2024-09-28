import { pass } from "../test.mjs";

pass("o.k;");
pass("(class { #k; static { o.#k; } });");

pass("import.meta;", "module");

pass("({ k: x });");
pass("({ 'k': x });");

pass("(class { #k; });");
pass("(class { k; });");
pass("(class { 'k'; });");
