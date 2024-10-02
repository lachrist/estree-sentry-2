import { pass } from "../../test/test.mjs";
import { ROOT_PATH } from "../path.mjs";
import { guardModuleProgram, guardScriptProgram } from "./program.mjs";

guardModuleProgram(
  {
    type: "Program",
    sourceType: "module",
    body: [],
  },
  ROOT_PATH,
  () => ({ __brand: "annotation" }),
);

guardScriptProgram(
  {
    type: "Program",
    sourceType: "script",
    body: [],
  },
  ROOT_PATH,
  () => ({ __brand: "annotation" }),
);

pass("x;", "script");

pass("export default x;", "module");
