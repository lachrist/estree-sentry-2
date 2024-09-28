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
    getObject(node, "tag", path, kind),
    joinPath(path, "tag"),
    annotate,
  ),
  quasi: guardTemplateLiteral(
    getObject(node, "quasi", path, kind),
    joinPath(path, "quasi"),
    annotate,
  ),
  ...annotate(node, path, kind),
});

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax").TemplateLiteral<{}>
 * >}
 */
export const subguardTemplateLiteral = (node, path, annotate, type, kind) => ({
  type,
  quasis: map(getObjectArray(node, "quasis", path, kind), (item, index) =>
    guardTemplateElement(item, joinDeepPath(path, "quasis", index), annotate),
  ),
  expressions: map(
    getObjectArray(node, "expressions", path, kind),
    (item, index) =>
      guardExpression(item, joinDeepPath(path, "expressions", index), annotate),
  ),
  ...annotate(node, path, kind),
});

/**
 * @type {import("../guard").Guard<
 *   import("../syntax").TemplateLiteral<{}>
 * >}
 */
const guardTemplateLiteral = (node, path, annotate) => {
  const kind = "TemplateLiteral";
  const type = getSingleton(node, "type", path, kind, "TemplateLiteral");
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
    type: getSingleton(node, "type", path, kind, "TemplateElement"),
    tail: getBoolean(node, "tail", path, kind),
    value: {
      raw: getString(node, "raw", path, kind),
      cooked: has(node, "cooked")
        ? getString(node, "cooked", path, kind)
        : null,
    },
    ...annotate(node, path, kind),
  };
};
