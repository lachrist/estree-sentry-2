import { EstreeSentryTypeError } from "../error.mjs";
import { map } from "../util/index.mjs";
import { getDoubleton, getObjectArray, getSingleton } from "../access.mjs";
import { guardModuleStatement } from "./module.mjs";
import { joinDeepPath } from "../path.mjs";
import { guardStatement } from "./statement.mjs";

/**
 * @type {import("../guard").Guard<
 *   import("../syntax/program").Program<{}>
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
      return {
        type: getSingleton(node, "type", path, kind, "Program"),
        sourceType: source_type,
        body: map(getObjectArray(node, "body", path, kind), (item, index) =>
          guardModuleStatement(
            item,
            joinDeepPath(path, "body", index),
            annotate,
          ),
        ),
        ...annotate(node, path, kind),
      };
    }
    case "script": {
      return {
        type: getSingleton(node, "type", path, kind, "Program"),
        sourceType: source_type,
        body: map(getObjectArray(node, "body", path, kind), (item, index) =>
          guardStatement(item, joinDeepPath(path, "body", index), annotate),
        ),
        ...annotate(node, path, kind),
      };
    }
    /* c8 ignore start */
    default: {
      throw new EstreeSentryTypeError(source_type);
    }
    /* c8 ignore stop */
  }
};
