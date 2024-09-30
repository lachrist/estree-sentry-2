export * from "./children.mjs";
export * from "./error.mjs";
export * from "./keyword.mjs";
export * from "./kind.mjs";
export * from "./operator.mjs";
export * from "./path.mjs";

import { guardProgram } from "./node/program.mjs";

export const guard = /**
 * @type {<X>(
 *   node: object,
 *   path: import("./path").Path,
 *   annotate: import("./annotate").Annotate<X>,
 * ) => import("./node/program").Program<X>}
 */ (guardProgram);
