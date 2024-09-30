export * from "./children.mjs";
export * from "./error.mjs";
export * from "./keyword.mjs";
export * from "./kind.mjs";
export * from "./operator.mjs";
export * from "./path.mjs";

import { guardProgram } from "./node/program.mjs";
import { ROOT_PATH } from "./path.mjs";

/**
 * @type {import("./guard").GuardAnnotate}
 */
const annotateNull = (_node, _path, _kind) => /** @type {any} */ (null);

/**
 *
 * Returns a deep annotated copy of the input node with annotations if it is a
 * valid estree-sentry program. Throws a `EstreeSentrySyntaxError` if the input
 * node is not a valid estree-sentry program. See `guard` for a failing example.
 *
 * @example
 * ```js
 * import { ROOT_PATH, guard } from "estree-sentry";
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
 * guardWithAnnotation(
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
 * Annotation type
 * @param {object} root
 * The input root node.
 * @param {import("./path").Path} path
 * The root path to which segments will be appended.
 * @param {import("./annotate").Annotate<A>} annotate
 * Annotation function that will be called on each visited node.
 * @returns {import("./node/program").Program<A>}
 * A deep copy of the input root node that is a valid estree-sentry program.
 * @throws {import("./error").EstreeSentrySyntaxError}
 * An `EstreeSentrySyntaxError` if the input root node is not a valid
 * estree-sentry program.
 *
 */
export const guardWithAnnotation = (root, path, annotate) =>
  /** @type {import("./node/program").Program<any>} */ (
    guardProgram(
      root,
      path,
      /** @type {import("./annotate").Annotate<any>} */ (annotate),
    )
  );

/**
 *
 * Returns a deep copy of the input node if it is a valid estree-sentry program.
 * Throws a `EstreeSentrySyntaxError` if the input node is not a valid
 * estree-sentry program.
 *
 * @example
 * ```js
 * import { guard } from "estree-sentry";
 * // throws: EstreeSentrySyntaxError
 * //  KeyIdentifier.type should be "Identifier" or "PrivateIdentifier"
 * //  got "Literal"
 * //  at $.body.0.expression.property
 * guard(
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
 * @param {object} root
 * The input root node.
 * @returns {import("./node/program").Program<{}>}
 * A deep copy of the input root node that is a valid estree-sentry program.
 * @throws {import("./error").EstreeSentrySyntaxError}
 * An `EstreeSentrySyntaxError` if the input root node is not a valid
 * estree-sentry program.
 */
export const guard = (root) => guardProgram(root, ROOT_PATH, annotateNull);
