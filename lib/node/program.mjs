import { EstreeSentryTypeError } from "../error.mjs";
import { map } from "../util/index.mjs";
import { getDoubleton, getObjectArray, getSingleton } from "../access.mjs";
import { guardModuleStatement } from "./module.mjs";
import { joinDeepPath } from "../path.mjs";
import { guardStatement } from "./statement.mjs";

/**
 * @type {import("../guard").Subguard<
 *   import("./program").ModuleProgram<{}>
 * >}
 */
export const subguardModuleProgram = (node, path, annotate, type, kind) => ({
  type,
  sourceType: getSingleton(node, "sourceType", path, kind, "module"),
  body: map(getObjectArray(node, "body", path, kind), (item, index) =>
    guardModuleStatement(item, joinDeepPath(path, "body", index), annotate),
  ),
  ...annotate(node, path, kind),
});

/**
 * @type {import("../guard").Guard<
 *   import("./program").ModuleProgram<{}>
 * >}
 */
export const guardModuleProgram = (node, path, annotate) => {
  const kind = "ModuleProgram";
  const type = getSingleton(node, "type", path, kind, "Program");
  return subguardModuleProgram(node, path, annotate, type, kind);
};

/**
 * @type {import("../guard").Subguard<
 *   import("./program").ScriptProgram<{}>
 * >}
 */
export const subguardScriptProgram = (node, path, annotate, type, kind) => ({
  type,
  sourceType: getSingleton(node, "sourceType", path, kind, "script"),
  body: map(getObjectArray(node, "body", path, kind), (item, index) =>
    guardStatement(item, joinDeepPath(path, "body", index), annotate),
  ),
  ...annotate(node, path, kind),
});

/**
 * @type {import("../guard").Guard<
 *   import("./program").ScriptProgram<{}>
 * >}
 */
export const guardScriptProgram = (node, path, annotate) => {
  const kind = "ScriptProgram";
  const type = getSingleton(node, "type", path, kind, "Program");
  return subguardScriptProgram(node, path, annotate, type, kind);
};

/**
 * @type {import("../guard").Guard<
 *   import("./program").Program<{}>
 * >}
 */
export const guardProgram = (node, path, annotate) => {
  const kind = "Program";
  const source_type = getDoubleton(
    node,
    "sourceType",
    path,
    kind,
    "module",
    "script",
  );
  switch (source_type) {
    case "module": {
      return subguardModuleProgram(node, path, annotate, "Program", kind);
    }
    case "script": {
      return subguardScriptProgram(node, path, annotate, "Program", kind);
    }
    /* c8 ignore start */
    default: {
      throw new EstreeSentryTypeError(source_type);
    }
    /* c8 ignore stop */
  }
};
