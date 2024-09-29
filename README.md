# estree-sentry

More precise [estree](https://github.com/estree/estree) type with annotations.

![Relationship between estree and estree-sentry](doc/estree-sentry.png)

[estree](https://github.com/estree/estree) and its typescript type definition
[@types/estree](https://www.npmjs.com/package/@types/estree) are great but many
valid `estree.Program` are nonsensical. Hence, consumers of `estree` nodes do
not benefit from the typescript type system as much as they could. For instance,
non-computed key of `MemberExpression` should only be `Identifier` or
`PrivateIdentifier`, but it can actually be any `Expression`. So, we have to add
the ugly type assertion `as Identifier` below:

```typescript
import { Identifier, MemberExpression } from "estree";
const getPublicKey = (node: MemberExpression): string | null =>
  node.computed || node.property.type === "PrivateIdentifier"
    ? null
    : (node.property as Identifier).name;
```

`estree-sentry` is a subset of `estree` which removes many nonsensical nodes at
the price of more complex type definitions. The makes nodes easier to consume by
harder to generate. For instance, in the snippet below, the type assertion would
not be needed. `estree-sentry` offers two other features to further leverage the
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
  key. Definitions [here]("./lib/brand.d.ts"). By turning these data from a
  generic `string` to their own brand, we make types more explicit and prevent
  some mix-ups.

## Nonsensical nodes removed by `estree-sentry`

- Module declarations cannot appear outside module.
- Optional expressions cannot appear outside chain expression.
- Rest element can only appear in: array pattern, object pattern, or function
  parameter.
- The argument of update expression can only be: an identifier, a member
  expression. It cannot be an arbitrary pattern.
- The left-hand side of assignment can be an arbitrary pattern (or a call
  expression) only if the operator is `=`. Else, it can only be: an identifier,
  a member expression, or a call expression. Yes call expressions in left-hand
  side are weird...
- Non-computed keys are indeed non-computed in: object property, member
  expression, class property definition, and class method definition.
- Methods, getters and setters are always function expressions in object
  properties.
- Getters and setters: cannot be generator nor async, cannot have an id, and
  have the correct arity.
- Constructors: cannot be generator nor async, and cannot have an id.
- The key of constructor definitions is always `constructor`.
- In binary expressions, private identifier can appear on the left-hand side
  only if the operator is `in`.
- The literal of source and specifier in module declarations is always a string.
- Expression arrow expressions have an expression as body and block arrow
  expressions have a block as body.
