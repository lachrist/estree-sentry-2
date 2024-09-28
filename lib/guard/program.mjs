import { EstreexTypeError } from "../error.mjs";
import { map } from "../util/index.mjs";
import { getDoubleton, getObjectArray, getSingleton } from "../access.mjs";
import { guardModuleStatement } from "./module.mjs";
import { joinDeepPath } from "../path.mjs";
import { guardStatement } from "./statement.mjs";

/**
 * @type {import("../guard").Guard<
 *   import("../syntax").Program<{}>
 * >}
 */
export const guardProgram = (node, path, annotate) => {
  const kind = "Program";
  const source_type = getDoubleton(
    node,
    "sourceType",
    kind,
    path,
    "module",
    "script",
  );
  switch (source_type) {
    case "module": {
      return {
        type: getSingleton(node, "type", kind, path, "Program"),
        sourceType: source_type,
        body: map(getObjectArray(node, "body", kind, path), (item, index) =>
          guardModuleStatement(
            item,
            joinDeepPath(path, "body", index),
            annotate,
          ),
        ),
        ...annotate(node, kind, path),
      };
    }
    case "script": {
      return {
        type: getSingleton(node, "type", kind, path, "Program"),
        sourceType: source_type,
        body: map(getObjectArray(node, "body", kind, path), (item, index) =>
          guardStatement(item, joinDeepPath(path, "body", index), annotate),
        ),
        ...annotate(node, kind, path),
      };
    }
    default: {
      throw new EstreexTypeError(source_type);
    }
  }
};
