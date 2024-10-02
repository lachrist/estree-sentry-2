export * from "./children.mjs";
export * from "./error.mjs";
export * from "./keyword.mjs";
export * from "./kind.mjs";
export * from "./operator.mjs";
export * from "./path.mjs";

import {
  guardProgram as guardProgramInner,
  guardModuleProgram as guardModuleProgramInner,
  guardScriptProgram as guardScriptProgramInner,
} from "./node/program.mjs";
import { ROOT_PATH } from "./path.mjs";

///////////
// guard //
///////////

/**
 * @type {import("./guard").GuardAnnotate}
 */
const annotateNull = (_node, _path, _kind) => /** @type {any} */ (null);

/**
 * @type {(
 *   root: object,
 * ) => import("./node/program").Program<{}>}
 */
export const guardProgram = (root) =>
  guardProgramInner(root, ROOT_PATH, annotateNull);

/**
 * @type {(
 *   root: object,
 * ) => import("./node/program").ScriptProgram<{}>}
 */
export const guardScriptProgram = (root) =>
  guardScriptProgramInner(root, ROOT_PATH, annotateNull);

/**
 * @type {(
 *   root: object,
 * ) => import("./node/program").ModuleProgram<{}>}
 */
export const guardModuleProgram = (root) =>
  guardModuleProgramInner(root, ROOT_PATH, annotateNull);

/////////////////////////
// guardWithAnnotation //
/////////////////////////

/**
 * @type {<X>(
 *   root: object,
 *   path: import("./path").Path,
 *   annotate: import("./annotate").Annotate<X>,
 * ) => import("./node/program").Program<X>}
 */
export const annotateProgram = /**
 * @type {import("./guard").AnyGuard<
 *   import("./node/program").Program<any>
 * >}
 */ (guardProgramInner);

/**
 * @type {<X>(
 *   root: object,
 *   path: import("./path").Path,
 *   annotate: import("./annotate").Annotate<X>,
 * ) => import("./node/program").ModuleProgram<X>}
 */
export const annotateModuleProgram = /**
 * @type {import("./guard").AnyGuard<
 *   import("./node/program").ModuleProgram<any>
 * >}
 */ (guardModuleProgramInner);

/**
 * @type {<X>(
 *   root: object,
 *   path: import("./path").Path,
 *   annotate: import("./annotate").Annotate<X>,
 * ) => import("./node/program").ScriptProgram<X>}
 */
export const annotateScriptProgram = /**
 * @type {import("./guard").AnyGuard<
 *   import("./node/program").ScriptProgram<any>
 * >}
 */ (guardScriptProgramInner);
