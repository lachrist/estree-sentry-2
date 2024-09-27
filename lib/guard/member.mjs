import { getBoolean, getFalse, getObject, getTrue } from "../access.mjs";
import { guardExpression, guardSuperableExpression } from "./expression.mjs";
import { guardIdentifierKey } from "./key.mjs";
import { joinPath } from "../path.mjs";
import { guardChainableExpression } from "./chain.mjs";

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax/member").MemberExpression<{}>
 * >}
 */
export const subguardMemberExpression = (node, path, annotate, type, kind) => {
  const computed = getBoolean(node, "computed", kind, path);
  if (computed) {
    return {
      type,
      optional: getFalse(node, "optional", kind, path),
      computed,
      object: guardSuperableExpression(
        getObject(node, "object", kind, path),
        joinPath(path, "object"),
        annotate,
      ),
      property: guardExpression(
        getObject(node, "property", kind, path),
        joinPath(path, "property"),
        annotate,
      ),
      ...annotate(node, kind, path),
    };
  } else {
    return {
      type,
      optional: getFalse(node, "optional", kind, path),
      computed,
      object: guardSuperableExpression(
        getObject(node, "object", kind, path),
        joinPath(path, "object"),
        annotate,
      ),
      property: guardIdentifierKey(
        getObject(node, "property", kind, path),
        joinPath(path, "property"),
        annotate,
      ),
      ...annotate(node, kind, path),
    };
  }
};

/**
 * @type {import("../guard").Subguard<
 *   import("../syntax/member").OptionalMemberExpression<{}>
 * >}
 */
export const subguardOptionalMemberExpression = (
  node,
  path,
  annotate,
  type,
  kind,
) => {
  const computed = getBoolean(node, "computed", kind, path);
  if (computed) {
    return {
      type,
      optional: getTrue(node, "optional", kind, path),
      computed,
      object: guardChainableExpression(
        getObject(node, "object", kind, path),
        joinPath(path, "object"),
        annotate,
      ),
      property: guardExpression(
        getObject(node, "property", kind, path),
        joinPath(path, "property"),
        annotate,
      ),
      ...annotate(node, kind, path),
    };
  } else {
    return {
      type,
      optional: getTrue(node, "optional", kind, path),
      computed,
      object: guardChainableExpression(
        getObject(node, "object", kind, path),
        joinPath(path, "object"),
        annotate,
      ),
      property: guardIdentifierKey(
        getObject(node, "property", kind, path),
        joinPath(path, "property"),
        annotate,
      ),
      ...annotate(node, kind, path),
    };
  }
};
