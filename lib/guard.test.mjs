import { assertEqual } from "../test/assert.mjs";
import {
  guardProgram,
  guardModuleProgram,
  guardScriptProgram,
} from "./guard.mjs";

assertEqual(
  guardScriptProgram({
    type: "Program",
    sourceType: "script",
    body: [],
  }).sourceType,
  "script",
);

assertEqual(
  guardModuleProgram({
    type: "Program",
    sourceType: "module",
    body: [],
  }).sourceType,
  "module",
);

for (const source of ["script", "module"]) {
  assertEqual(
    guardProgram({
      type: "Program",
      sourceType: source,
      body: [],
    }).sourceType,
    source,
  );
}
