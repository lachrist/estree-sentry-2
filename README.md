# ESTreeSentry

A more precise [ESTree](https://github.com/estree/estree) type with support for
generic annotations.

![Relationship between estree and estree-sentry](doc/estree-sentry.png)

[ESTree](https://github.com/estree/estree) and its typescript type definition
[@types/estree](https://www.npmjs.com/package/@types/estree) are great but many
valid `estree.Program` are nonsensical, which limits the benefits TypeScript's
type system provides. The presence of nonsensical nodes in ESTree is intentional
and due to its contextless philosophy. For instance, the key of a non-computed
member expression can be an arbitrary expression but only an identifier or a
private identifier would be sensible. This forces consumers to bypass the type
system with ugly type assertions such as the `as Identifier | PrivateIdentifier`
below:

```typescript
import { MemberExpression, Identifier, PrivateIdentifier } from "estree";
export const getNonComputedKey = (node: MemberExpression): string | null =>
  node.computed ? null : (node.property as Identifier | PrivateIdentifier).name;
```

ESTreeSentry is almost a subset of ESTree that removes many nonsensical nodes at
the price of abandoning its contextless philosophy and adding more type
definitions. This makes nodes easier to consume but harder to produce.

```typescript
import { MemberExpression } from "estree-sentry";
export const getNonComputedKey = (node: MemberExpression<{}>): string | null =>
  node.computed ? null : node.property.name;
```

Additionally, ESTreeSentry offers two features that leverage the TypeScript type
system further:

- Nodes are recursively parameterized by annotations. This makes it possible to
  enforce type constraints on annotations such as code location. For instance,
  the JSON below is a valid `Expression<{foo:123}>`:
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
- Arbitrary strings are branded to make types more explicit and prevent mix-ups.
  For instance, `VariableName` brands the name of identifiers when used in an
  expression context and `LabelName` brands the name of identifiers when used in
  a label context.

## Removed Nonsensical Nodes

- Module declarations cannot appear in script programs.
- Optional expressions cannot appear outside chain expressions.
- Rest elements cannot appear outside object patterns, array patterns, or
  function parameters.
- In module declarations, the source literal and the specifier literals are
  always strings.
- In expression arrows, the body is an expression. And in block arrows, the body
  is a block.
- In update expressions, the argument can only be an identifier or a member
  expression.
- In Assignment expressions with compound operator (eg: `+=`), the left-hand
  side can only be an identifier, a member expression, or a call expression.
- In non-computed member expressions, the key can only be an identifier or a
  private identifier.
- In non-computed object properties, the key can only be an identifier or a
  literal.
- In non-computed class definitions, the key can only be an identifier, a
  private identifier, or a literal.
- In class constructor definitions, the key is always `constructor` and the
  function value does not have an id, cannot be a generator, and cannot be
  asynchronous.
- In object method properties and class method definition, the value can only be
  a function expression without id.
- In object accessor properties and class accessor definitions, the value:
  - con only be function expression (only relevant for object properties)
  - has the correct arity (0 for getters and 1 for setters).
  - does not have in id
  - cannot be a generator
  - cannot be asynchronous

## Additional Nodes

- In binary expressions with `in` operator, the left operand can be a private
  identifier.
- In assignment expressions, the left-hand side can be a call expression. Yes,
  this is valid JavaScript. I'm not aware of any functions that will make this
  not through a `ReferenceError` though.

## API

[typedoc](https://lachrist.github.io/estree-sentry-2/typedoc/index.html)

- [Node](https://lachrist.github.io/estree-sentry-2/typedoc/types/node.Node.html)
  Complete list of node types
- [KindRecord](https://lachrist.github.io/estree-sentry-2/typedoc/types/kind.KindRecord.html)
  Grouping of node types as they appear in `Node` properties.
- [guardProgram](https://lachrist.github.io/estree-sentry-2/typedoc/functions/index.guardProgram.html)
  Return a deep copy of the given node if it is a valid ESTreeSentry program.
  Throws a `EstreeSentrySyntaxError` otherwise.
- [annotateProgram](https://lachrist.github.io/estree-sentry-2/typedoc/functions/index.annotateProgram.html)
  Return a deep copy of the given node with annotations if it is a valid
  ESTreeSentry program. Throws a `EstreeSentrySyntaxError` otherwise.
- [EstreeSentrySyntaxError](https://lachrist.github.io/estree-sentry-2/typedoc/classes/index.EstreeSentrySyntaxError.html)
  Class of errors thrown by guard functions. It has a `cause` property if the
  `message` property does not provide enough information.
- [listChildren](https://lachrist.github.io/estree-sentry-2/typedoc/functions/index.listChildren.html)
  Returns the children of the given node in a new array.
- [ROOT_PATH](https://lachrist.github.io/estree-sentry-2/typedoc/variables/index.ROOT_PATH.html)
  The default root path: `"$"`.
- [splitPath](https://lachrist.github.io/estree-sentry-2/typedoc/functions/index.splitPath.html)
  Split a path into segments who each represents a property name.
- [walkPath](https://lachrist.github.io/estree-sentry-2/typedoc/functions/index.walkPath.html)
  Walk a split path from a root node to a target node.
