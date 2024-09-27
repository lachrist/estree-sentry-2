import { Primitive } from "./util/primitive";

export class EstreexTypeError extends TypeError {
  constructor(cause: never);
  message: string;
  cause: never;
}

export type SyntaxErrorCause = {
  node: object;
  path: string;
  kind: string;
  prop: string;
  expect: string | Primitive[];
  actual: unknown;
};

export class EstreexSyntaxError extends SyntaxError {
  constructor(message: string, cause: SyntaxErrorCause);
  message: string;
  cause: never;
}
