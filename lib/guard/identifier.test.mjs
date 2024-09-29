import { pass } from "../../test/test.mjs";

pass("x;");

pass("l: { break l; }");

pass("import { s } from 'm';", "module");

pass("import.meta;", "module");

pass("o.k;");

pass("(class { #p; });");

pass("(class { constructor () {} });");
