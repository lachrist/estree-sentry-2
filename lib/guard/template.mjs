/* eslint-disable no-use-before-define */

import { map } from "../util/index.mjs";
import {
  getBoolean,
  getObject,
  getObjectArray,
  getSingleton,
  getString,
  has,
} from "../access.mjs";
import { guardExpression } from "./expression.mjs";
import { joinDeepPath, joinPath } from "../path.mjs";

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax").TaggedTemplateExpression<{}>
 * >}
 */
export const subguardTaggedTemplateExpression = (
  node,
  path,
  annotate,
  type,
  kind,
) => ({
  type,
  tag: guardExpression(
    getObject(node, "tag", kind, path),
    joinPath(path, "tag"),
    annotate,
  ),
  quasi: guardTemplateLiteral(
    getObject(node, "quasi", kind, path),
    joinPath(path, "quasi"),
    annotate,
  ),
  ...annotate(node, kind, path),
});

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax").TemplateLiteral<{}>
 * >}
 */
export const subguardTemplateLiteral = (node, path, annotate, type, kind) => ({
  type,
  quasis: map(getObjectArray(node, "quasis", kind, path), (item, index) =>
    guardTemplateElement(item, joinDeepPath(path, "quasis", index), annotate),
  ),
  expressions: map(
    getObjectArray(node, "expressions", kind, path),
    (item, index) =>
      guardExpression(item, joinDeepPath(path, "expressions", index), annotate),
  ),
  ...annotate(node, kind, path),
});

/**
 * @type {import("../guard").Guard<
 *   import("../syntax").TemplateLiteral<{}>
 * >}
 */
const guardTemplateLiteral = (node, path, annotate) => {
  const kind = "TemplateLiteral";
  const type = getSingleton(node, "type", kind, path, "TemplateLiteral");
  return subguardTemplateLiteral(node, path, annotate, type, kind);
};

/**
 * @type {import("../guard").Guard<
 *   import("../syntax").TemplateElement<{}>
 * >}
 */
const guardTemplateElement = (node, path, annotate) => {
  const kind = "TemplateElement";
  return {
    type: getSingleton(node, "type", kind, path, "TemplateElement"),
    tail: getBoolean(node, "tail", kind, path),
    value: {
      raw: getString(node, "raw", kind, path),
      cooked: has(node, "cooked")
        ? getString(node, "cooked", kind, path)
        : null,
    },
    ...annotate(node, kind, path),
  };
};
