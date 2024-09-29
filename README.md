# estree-sentry

More precise [estree](https://github.com/estree/estree) type with annotations.

![Relationship between estree and estree-sentry](doc/estree-sentry.png)

[estree](https://github.com/estree/estree) and its typescript type definition
[@types/estree](https://www.npmjs.com/package/@types/estree) are great but many
valid `estree.Program` are nonsensical and consumers do not benefit from the
typescript type system as much as they could. For instance, the key of a
non-computed member expression should only be an identifier or a private
identifier, but it can be an arbitrary expression. This forces consumers to add
ugly type assertions such as the `as Identifier` below:

```typescript
import { Identifier, MemberExpression } from "estree";
const getPublicKey = (node: MemberExpression): string | null =>
  node.computed || node.property.type === "PrivateIdentifier"
    ? null
    : (node.property as Identifier).name;
```

`estree-sentry` is a subset of `estree` (safe call expression in left-hand side
of assignments) which removes many nonsensical nodes at the price of more
complex type definitions. This makes nodes easier to consume but harder to
produce. `estree-sentry` offers two other features to further leverage the
typescript type system:

- Nodes are recursively parametrized by annotations. This makes it possible to
  enforce constraints on annotations such as code location. For instance, the
  JSON below is a valid `Expression<{foo:123}>`:
  ```json
  {
    "type": "UnaryExpression",
    "operator": "!",
    "prefix": true,
    "argument": {
      "type": "Identifier",
      "name": "x",
      "foo": 123
    },
    "foo": 123
  }
  ```
- Branded types for: variable, label, source, specifier, public key, and private
  key. Definitions [here]("lib/brand.d.ts"). Turning these data from generic
  string to their own brand, makes types more explicit and prevent some mix-ups.

## Nonsensical nodes removed by `estree-sentry`

- Module declarations cannot appear in script programs.
- Optional expressions cannot appear outside chain expressions.
- Rest elements is not an abritrary pattern, it can only appear in: array
  patterns, object patterns, or function parameters.
- The argument of update expression is not arbitrary patterns, it can only be:
  an identifier, a member expression.
- The left-hand side of assignment can only be an arbitrary pattern (or a call
  expression) if the operator is `=`. Else, it can only be: an identifier, a
  member expression, or a call expression. Yes call expressions in left-hand
  side are weird...
- Non-computed keys are indeed non-computed in: object property, member
  expression, class property definition, and class method definition.
- Methods, getters, and setters are always a function expression in object
  properties.
- Getters and setters:
  - cannot be generator
  - cannot be async
  - cannot have an id
  - have the correct arity (0 for getters and 1 for setters).
- Class constructors:
  - cannot be generator
  - cannot be async
  - cannot have an id
- The key of constructor definitions is always `constructor`.
- In binary expressions, the left operand can be a private identifier only if
  the operator is `in`.
- The literal of source and specifier in module declarations is always a string.
- Expression arrows have an expression as body and block arrows have a block as
  body.
