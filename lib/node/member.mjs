import { getBoolean, getFalse, getObject } from "../access.mjs";
import { guardExpression, guardSuperableExpression } from "./expression.mjs";
import { guardKeyIdentifier } from "./key.mjs";
import { joinPath } from "../path.mjs";
import { guardChainableExpression } from "./chain.mjs";

/**
 * @type {import("../guard.js").Subguard<
 *   import("./member.js").MemberExpression<{}>
 * >}
 */
export const subguardMemberExpression = (node, path, annotate, type, kind) => {
  const computed = getBoolean(node, "computed", path, kind);
  if (computed) {
    return {
      type,
      optional: getFalse(node, "optional", path, kind),
      computed,
      object: guardSuperableExpression(
        getObject(node, "object", path, kind),
        joinPath(path, "object"),
        annotate,
      ),
      property: guardExpression(
        getObject(node, "property", path, kind),
        joinPath(path, "property"),
        annotate,
      ),
      ...annotate(node, path, kind),
    };
  } else {
    return {
      type,
      optional: getFalse(node, "optional", path, kind),
      computed,
      object: guardSuperableExpression(
        getObject(node, "object", path, kind),
        joinPath(path, "object"),
        annotate,
      ),
      property: guardKeyIdentifier(
        getObject(node, "property", path, kind),
        joinPath(path, "property"),
        annotate,
      ),
      ...annotate(node, path, kind),
    };
  }
};

/**
 * @type {import("../guard.js").Subguard<
 *   import("./member.js").OptionalMemberExpression<{}>
 * >}
 */
export const subguardOptionalMemberExpression = (
  node,
  path,
  annotate,
  type,
  kind,
) => {
  const computed = getBoolean(node, "computed", path, kind);
  if (computed) {
    return {
      type,
      optional: getBoolean(node, "optional", path, kind),
      computed,
      object: guardChainableExpression(
        getObject(node, "object", path, kind),
        joinPath(path, "object"),
        annotate,
      ),
      property: guardExpression(
        getObject(node, "property", path, kind),
        joinPath(path, "property"),
        annotate,
      ),
      ...annotate(node, path, kind),
    };
  } else {
    return {
      type,
      optional: getBoolean(node, "optional", path, kind),
      computed,
      object: guardChainableExpression(
        getObject(node, "object", path, kind),
        joinPath(path, "object"),
        annotate,
      ),
      property: guardKeyIdentifier(
        getObject(node, "property", path, kind),
        joinPath(path, "property"),
        annotate,
      ),
      ...annotate(node, path, kind),
    };
  }
};
