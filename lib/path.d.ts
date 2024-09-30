/**
 * A path is a string made by the concatenating with dots the property keys that
 * lead to a particular node in the AST. Contrary to JSON path, indexes are not
 * surrounded by brackets. eg: `"$.body.body.0.declarations.0.init"`.
 *
 * @module
 */

import type { Brand } from "./util/brand";

export type Path = Brand<string, "Path">;

export type Segment =
  | number
  | "meta"
  | "label"
  | "exported"
  | "local"
  | "imported"
  | "cases"
  | "discriminant"
  | "update"
  | "key"
  | "value"
  | "properties"
  | "elements"
  | "id"
  | "params"
  | "callee"
  | "arguments"
  | "test"
  | "init"
  | "declarations"
  | "finalizer"
  | "expressions"
  | "source"
  | "expression"
  | "handler"
  | "consequent"
  | "alternate"
  | "declaration"
  | "specifiers"
  | "superClass"
  | "object"
  | "tag"
  | "property"
  | "argument"
  | "left"
  | "param"
  | "right"
  | "block"
  | "body"
  | "quasi"
  | "quasis";
