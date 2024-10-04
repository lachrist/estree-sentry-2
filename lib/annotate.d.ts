import type { Kind } from "./kind";
import type { Path } from "./path";

/**
 *
 * Computes additional properties to be recursively incorporated into the output
 * node.
 *
 * @template A
 * The type of the annotation.
 * @param node
 * The input node -- eg: `{type: "Identifier", name: "foo"}`.
 * @param path
 * The path to the input node -- eg: `"$.body.body.0.expression.property"`.
 * @param kind
 * The kind of the input node -- eg: `"PublicKey"`.
 * @returns
 * The annotation whose properties will be added to the output node -- eg:
 * `{ loc: { start: { line: 12, column: 34 } } }`.
 */
export type Annotate<A> = (node: object, path: Path, kind: Kind) => A;
