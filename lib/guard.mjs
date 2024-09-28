import { guardProgram } from "./guard/program.mjs";

export const guard = /**
 * @type {<X>(
 *   node: object,
 *   path: import("./path").Path,
 *   annotate: import("./guard").Annotate<X>,
 * ) => import("./").Program<X>}
 */ (guardProgram);
