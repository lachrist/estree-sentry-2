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
 * @type {<X>(
 *   root: object,
 *   path: import("./path").Path,
 *   annotate: import("./annotate").Annotate<X>,
 * ) => import("./node/program").Program<X>}
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
 * @type {(
 *   root: object,
 * ) => import("./node/program").Program<{}>}
 */
export const guard = (root) => guardProgram(root, ROOT_PATH, annotateNull);
