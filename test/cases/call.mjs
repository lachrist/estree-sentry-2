import { fail, pass } from "../test.mjs";

pass("f(x, ...ys, z);");

pass(`
  (class c extends d {
    constructor () {
      super(x, ...ys, z);
    }
  });
`);

pass("f?.(x, ...ys, z);");

fail({
  type: "Program",
  sourceType: "script",
  body: [
    {
      type: "ExpressionStatement",
      expression: {
        type: "CallExpression",
        optional: true,
        callee: {
          type: "Super",
        },
        arguments: [
          {
            type: "Identifier",
            name: "x",
          },
        ],
      },
    },
  ],
});
