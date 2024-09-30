import type { Kind } from "./kind";
import type { Path } from "./path";
import type { Primitive } from "./util/primitive";

export class EstreeSentryTypeError extends TypeError {
  constructor(cause: never);
  message: string;
  cause: unknown;
}

/**
 * The cause of a syntax error which is always a node property.
 */
export type SyntaxErrorCause = {
  /**
   * The node whose property caused the syntax error.
   */
  node: object;
  /**
   * The path to the input node.
   */
  path: Path;
  /**
   * The kind of the input node.
   */
  kind: Kind;
  /**
   * The name of the property that caused the syntax error.
   */
  prop: string;
  /**
   * The expected value of the property. Either a string description or an
   * enumeration of possible values.
   */
  expect: string | Primitive[];
  /**
   * The actual value of the property.
   */
  actual: unknown;
};

export class EstreeSentrySyntaxError extends SyntaxError {
  constructor(cause: SyntaxErrorCause);
  message: string;
  cause: SyntaxErrorCause;
}
