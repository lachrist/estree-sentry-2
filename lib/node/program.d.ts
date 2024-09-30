import type { ModuleStatement } from "./module";
import type { Statement } from "./statement";

export type ModuleProgram<X> = X & {
  type: "Program";
  sourceType: "module";
  body: Array<ModuleStatement<X>>;
};

export type ScriptProgram<X> = X & {
  type: "Program";
  sourceType: "script";
  body: Array<Statement<X>>;
};

export type Program<X> = ModuleProgram<X> | ScriptProgram<X>;
