import { pass, fail } from "../../test/test.mjs";

pass("(o?.k);");

pass("(f?.());");

pass("(class extends o { constructor () { super()?.k; } });");
pass("({ m () { super.k1?.k2; } });");

pass("(o?.k1?.k2);");
pass("(o.k1?.k2);");
pass("(o?.k1.k2);");

pass("(f?.()?.());");
pass("(f()?.());");
pass("(f?.()());");

pass("(f?.()?.k);");
pass("(f()?.k);");
pass("(f?.().k);");

pass("(o?.k?.());");
pass("(o.k?.());");
pass("(o?.k());");

fail({
  type: "Program",
  sourceType: "script",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "MemberExpression",
        optional: true,
        object: {
          type: "Identifier",
          name: "o",
        },
        property: {
          type: "Identifier",
          name: "k",
        },
        computed: false,
      },
    },
  ],
});
