import { pass } from "../../test/test.mjs";

pass("o.k;");
pass("(class { #k; static { o.#k; } });");

pass("import.meta;", "module");

pass("({ k: x });");
pass("({ 'k': x });");
pass("({ 123: x });");
pass("({ 123n: x });");

pass("(class { #k; });");
pass("(class { k; });");
pass("(class { 'k'; });");
pass("(class { 123; });");
pass("(class { 123n; });");
