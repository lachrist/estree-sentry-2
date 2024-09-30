import { getBoolean, getFalse, getObject, getObjectArray } from "../access.mjs";
import { joinDeepPath, joinPath } from "../path.mjs";
import { map } from "../util/index.mjs";
import { guardChainableExpression } from "./chain.mjs";
import {
  guardSpreadableExpression,
  guardSuperableExpression,
} from "./expression.mjs";

/**
 * @type {import("../guard").Subguard<
 *   import("./call").CallExpression<{}>
 * >}
 */
export const subguardCallExpression = (node, path, annotate, type, kind) => ({
  type,
  optional: getFalse(node, "optional", path, kind),
  callee: guardSuperableExpression(
    getObject(node, "callee", path, kind),
    joinPath(path, "callee"),
    annotate,
  ),
  arguments: map(getObjectArray(node, "arguments", path, kind), (item, index) =>
    guardSpreadableExpression(
      item,
      joinDeepPath(path, "arguments", index),
      annotate,
    ),
  ),
  ...annotate(node, path, kind),
});

/**
 * @type {import("../guard").Subguard<
 *   import("./call").OptionalCallExpression<{}>
 * >}
 */
export const subguardOptionalCallExpression = (
  node,
  path,
  annotate,
  type,
  kind,
) => ({
  type,
  optional: getBoolean(node, "optional", path, kind),
  callee: guardChainableExpression(
    getObject(node, "callee", path, kind),
    joinPath(path, "callee"),
    annotate,
  ),
  arguments: map(getObjectArray(node, "arguments", path, kind), (item, index) =>
    guardSpreadableExpression(
      item,
      joinDeepPath(path, "arguments", index),
      annotate,
    ),
  ),
  ...annotate(node, path, kind),
});
