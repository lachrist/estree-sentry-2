import { pass } from "../test.mjs";

pass("(o?.k);");
pass("(o?.[k]);");

pass("(o.k);");
pass("(o[k]);");
