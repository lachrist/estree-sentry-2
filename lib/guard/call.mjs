import { getFalse, getObject, getObjectArray, getTrue } from "../access.mjs";
import { joinDeepPath, joinPath } from "../path.mjs";
import { map } from "../util/index.mjs";
import { guardChainableExpression } from "./chain.mjs";
import {
  guardSpreadableExpression,
  guardSuperableExpression,
} from "./expression.mjs";

/**
 * @type {import("../guard").Subguard<
 *   import("../").CallExpression<{}>
 * >}
 */
export const subguardCallExpression = (node, path, annotate, type, kind) => ({
  type,
  optional: getFalse(node, "optional", kind, path),
  callee: guardSuperableExpression(
    getObject(node, "callee", kind, path),
    joinPath(path, "callee"),
    annotate,
  ),
  arguments: map(getObjectArray(node, "arguments", kind, path), (item, index) =>
    guardSpreadableExpression(
      item,
      joinDeepPath(path, "arguments", index),
      annotate,
    ),
  ),
  ...annotate(node, kind, path),
});

/**
 * @type {import("../guard").Subguard<
 *   import("../").OptionalCallExpression<{}>
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
  optional: getTrue(node, "optional", kind, path),
  callee: guardChainableExpression(
    getObject(node, "callee", kind, path),
    joinPath(path, "callee"),
    annotate,
  ),
  arguments: map(getObjectArray(node, "arguments", kind, path), (item, index) =>
    guardSpreadableExpression(
      item,
      joinDeepPath(path, "arguments", index),
      annotate,
    ),
  ),
  ...annotate(node, kind, path),
});
