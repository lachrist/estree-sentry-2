import type { Annotate } from "./annotate.d.ts";
import type { SyntaxErrorCause } from "./error.d.ts";
import type {
  ContextualKeyword,
  Keyword,
  StrictKeyword,
  StrictReadonlyKeyword,
} from "./keyword.d.ts";
import type { KindRecord } from "./kind.d.ts";
import type { Node } from "./node.d.ts";
import type {
  ModuleProgram,
  Program,
  ScriptProgram,
} from "./node/program.d.ts";
import type {
  AssignmentOperator,
  BinaryOperator,
  LogicalOperator,
  UnaryOperator,
  UpdateOperator,
} from "./operator.d.ts";
import type { Path, Segment } from "./path.d.ts";

export type * from "./node/call.d.ts";
export type * from "./node/chain.d.ts";
export type * from "./node/class.d.ts";
export type * from "./node/declaration.d.ts";
export type * from "./node/expression.d.ts";
export type * from "./node/function.d.ts";
export type * from "./node/identifier.d.ts";
export type * from "./node/key.d.ts";
export type * from "./node/literal.d.ts";
export type * from "./node/member.d.ts";
export type * from "./node/module.d.ts";
export type * from "./node/object.d.ts";
export type * from "./node/pattern.d.ts";
export type * from "./node/program.d.ts";
export type * from "./node/statement.d.ts";
export type * from "./node/template.d.ts";

export type * from "./util/brand.d.ts";
export type * from "./util/primitive.d.ts";

export type * from "./annotate.d.ts";
export type { SyntaxErrorCause } from "./error.d.ts";
export type * from "./keyword.d.ts";
export type * from "./kind.d.ts";
export type * from "./node.d.ts";
export type * from "./operator.d.ts";
export type * from "./path.d.ts";

///////////
// index //
///////////

/**
 *
 * Returns a deep annotated copy of the input node with annotations if it is a
 * valid estree-sentry program. Throws a `EstreeSentrySyntaxError` if the input
 * node is not a valid estree-sentry program. See `guard` for a failing example.
 *
 * @example
 * ```js
 * import { ROOT_PATH, annotateProgram } from "estree-sentry";
 * // returns: {
 * //   type: "Program",
 * //   sourceType: "script",
 * //   body: [{
 * //     type: "EmptyStatement",
 * //     path: "$.body.0",
 * //     kind: "Statement",
 * //   }],
 * //   path: "$",
 * //   kind: "Program"
 * // }
 * annotateProgram(
 *   {
 *     type: "Program",
 *     sourceType: "script",
 *     body: [
 *       {
 *         type: "EmptyStatement",
 *       },
 *     ],
 *   },
 *   ROOT_PATH,
 *   (_node, path, kind) => ({ path, kind }),
 * );
 * ```
 *
 * @template A
 * The type of the annotation.
 * @param root
 * The input root node.
 * @param path
 * The root path to which segments will be appended.
 * @param annotate
 * Annotation function that will be called on each visited node.
 * @returns
 * A deep copy of the input root node that is a valid estree-sentry program.
 * @throws
 * An `EstreeSentrySyntaxError` if the input root node is not a valid
 * estree-sentry program.
 *
 */
export const annotateProgram: <A>(
  root: object,
  path: Path,
  annotate: Annotate<A>,
) => Program<A>;

/**
 * Same as `annotateProgram` but for module programs.
 */
export const annotateModuleProgram: <A>(
  root: object,
  path: Path,
  annotate: Annotate<A>,
) => ModuleProgram<A>;

/**
 * Same as `annotateProgram` but for script programs.
 */
export const annotateScriptProgram: <A>(
  root: object,
  path: Path,
  annotate: Annotate<A>,
) => ScriptProgram<A>;

/**
 *
 * Returns a deep copy of the input node if it is a valid estree-sentry program.
 * Throws a `EstreeSentrySyntaxError` if the input node is not a valid
 * estree-sentry program.
 *
 * @example
 * ```js
 * import { guardProgram } from "estree-sentry";
 * // throws: EstreeSentrySyntaxError
 * //  KeyIdentifier.type should be "Identifier" or "PrivateIdentifier"
 * //  got "Literal"
 * //  at $.body.0.expression.property
 * guardProgram(
 *   {
 *     type: "Program",
 *     sourceType: "script",
 *     body: [
 *       {
 *         type: "ExpressionStatement",
 *         expression: {
 *           type: "MemberExpression",
 *           computed: false,
 *           object: {
 *             type: "Identifier",
 *             name: "obj",
 *           },
 *           property: {
 *             type: "Literal",
 *             value: "key",
 *           },
 *         },
 *       },
 *     ],
 *   },
 * );
 * ```
 *
 * @param root
 * The input root node.
 * @returns
 * A deep copy of the input root node that is a valid estree-sentry program.
 * @throws
 * An `EstreeSentrySyntaxError` if the input root node is not a valid
 * estree-sentry program.
 */
export const guardProgram: (root: object) => Program<{}>;

/**
 * Same as `guardProgram` but for module programs.
 */
export const guardModuleProgram: (root: object) => ModuleProgram<{}>;

/**
 * Same as `guardProgram` but for script programs.
 */
export const guardScriptProgram: (root: object) => ScriptProgram<{}>;

//////////////
// children //
//////////////

/**
 *
 * Lists the children of the given node into a new array.
 *
 * @example
 * ```ts
 * import {listChildren, VariableName} from "estree-sentry";
 * // returns: [
 * //   { type: "Identifier", name: "x" },
 * //   { type: "Identifier", name: "y" },
 * // ]
 * listChildren({
 *   type: "BinaryExpression",
 *   operator: "+",
 *   left: {
 *     type: "Identifier",
 *     name: "x" as VariableName,
 *   },
 *   right: {
 *     type: "Identifier",
 *     name:"y" as VariableName,
 *   },
 * });
 * ```
 *
 * @template A
 * The annotation type.
 * @param {import("./node").Node<A>} node
 * The parent node.
 * @returns {import("./node").Node<A>[]}
 * The children of the parent node.
 *
 */
export const listChildren: <A>(node: Node<A>) => Node<A>[];

///////////
// error //
///////////

export class EstreeSentryTypeError extends TypeError {
  constructor(cause: never);
  message: string;
  cause: unknown;
}

export class EstreeSentrySyntaxError extends SyntaxError {
  constructor(cause: SyntaxErrorCause);
  message: string;
  cause: SyntaxErrorCause;
}

/////////////
// keyword //
/////////////

export const KEYWORD_RECORD: {
  [key in Keyword]: null;
};

export const STRICT_KEYWORD_RECORD: {
  [key in StrictKeyword]: null;
};

export const STRICT_READONLY_KEYWORD_RECORD: {
  [key in StrictReadonlyKeyword]: null;
};

export const CONTEXTUAL_KEYWORD_RECORD: {
  [key in ContextualKeyword]: null;
};

//////////
// kind //
//////////

export const KIND_RECORD: {
  [kind in keyof KindRecord<{}>]: {
    [type in KindRecord<{}>[kind]["type"]]: null;
  };
};

//////////////
// operator //
//////////////

export const ASSIGNEMENT_OPERATOR_RECORD: {
  [key in AssignmentOperator]: null;
};

export const UNARY_OPERATOR_RECORD: {
  [key in UnaryOperator]: null;
};

export const UPDATE_OPERATOR_RECORD: {
  [key in UpdateOperator]: null;
};

export const BINARY_OPERATOR_RECORD: {
  [key in BinaryOperator]: null;
};

export const LOGICAL_OPERATOR_RECORD: {
  [key in LogicalOperator]: null;
};

//////////
// path //
//////////

/**
 * The default root path.
 */
export const ROOT_PATH: Path & "$";

/**
 * The path separator.
 */
export const PATH_SEPARATOR: ".";

/**
 *
 * Appends a segment to an existing path.
 *
 * @example
 * ```js
 * import { ROOT_PATH, joinPath } from "estree-sentry";
 * // returns: "$.body"
 * joinDeepPath(ROOT_PATH, "body");
 * ```
 *
 */
export const joinPath: (path: Path, segment: Segment) => Path;

/**
 *
 * Appends two segments to an existing path.
 *
 * @example
 * ```js
 * import { ROOT_PATH, joinDeepPath } from "estree-sentry";
 * // returns: "$.body.0"
 * joinDeepPath(ROOT_PATH, "body", 0);
 * ```
 *
 */
export const joinDeepPath: (
  path: Path,
  segment1: Segment,
  segment2: Segment,
) => Path;
/**
 *
 * Splits a path relative to a base path. Returns null if the path is not
 * relative to the base path.
 *
 * @example
 * ```ts
 * import { splitPath, Path } from "estree-sentry";
 * // returns: ["left", "argument"]
 * splitPath(
 *   "$.body.0.expression.left.argument" as Path,
 *   "$.body.0.expression" as Path,
 * );
 * ```
 *
 */
export const splitPath: (path: Path, base: Path) => Segment[] | null;

/**
 *
 * Fetches a node or an array of nodes from a root node or an array of root
 * nodes by following the segments of a path. Returns null if the target could
 * not be found.
 *
 * @example
 * ```ts
 * import { walkPath, VariableName } from "estree-sentry";
 * // returns: { type: 'Identifier', name: 'x' }
 * walkPath(["left", "argument"], {
 *   type: "LogicalExpression",
 *   operator: "&&",
 *   left: {
 *     type: "UnaryExpression",
 *     prefix: true,
 *     operator: "!",
 *     argument: {
 *       type: "Identifier",
 *       name: "x" as VariableName,
 *     },
 *   },
 *   right: {
 *     type: "Identifier",
 *     name:"y" as VariableName,
 *   },
 * });
 * ```
 *
 * @template A
 * Annotation type
 * @param segments
 * An array of segments which can be produced by `splitPath`.
 * @param root
 * The root node or an array of root nodes from which to start walking the path.
 * @returns
 * The target node or an array of target nodes if found, otherwise `null`.
 *
 */
export const walkPath: <A>(
  segments: Segment[],
  root: Node<A> | Node<A>[],
) => null | Node<A> | Node<A>[];
