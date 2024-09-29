import { pass } from "../../test/test.mjs";

pass("(o?.k);");
pass("(o?.[k]);");

pass("(o.k);");
pass("(o[k]);");
