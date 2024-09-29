import { pass } from "../../test/test.mjs";

pass("({ ...o });");

pass("({ k });");

pass("({ k: x });");
pass("({ [k]: x });");

pass("({ k () {} });");
pass("({ [k] () {} });");

pass("({ get k () {} });");
pass("({ get [k] () {} });");

pass("({ set k (x) {} });");
pass("({ set [k] (x) {} });");
