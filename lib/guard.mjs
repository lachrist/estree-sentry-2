import { guardProgram } from "./guard/program.mjs";

export const guard = /**
 * @type {<X>(
 *   node: object,
 *   path: import("./path").Path,
 *   annotate: import("./annotate").Annotate<X>,
 * ) => import("./syntax/program").Program<X>}
 */ (guardProgram);
