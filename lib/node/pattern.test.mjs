import { pass } from "../../test/test.mjs";

pass("([x,, y,, ...zs] = x);");

pass("({ k1: x, [k2]: y, ...o } = x);");

pass("([y = z] = x);");

pass("([o.k] = x);");

pass("x++;");
pass("o.k++;");

pass("(x = 123);");

pass("for (x in o);");
pass("for (let x in o);");

pass("(o.k += 123)");
pass("(x += 123)");

for (const operator of [/** @type {"="} */ ("="), /** @type {"+="} */ ("+=")]) {
  pass({
    type: "Program",
    sourceType: "script",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "AssignmentExpression",
          operator,
          left: /** @type {any} */ ({
            type: "CallExpression",
            optional: false,
            callee: {
              type: "Identifier",
              name: "f",
            },
            arguments: [],
          }),
          right: {
            type: "Literal",
            value: 123,
          },
        },
      },
    ],
  });
}
