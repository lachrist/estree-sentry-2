import { assert } from "console";
import { assertDeepEqual, assertEqual } from "../test/assert.mjs";
import {
  ROOT_PATH,
  joinPath,
  joinDeepPath,
  getPathDeph,
  walkPath,
  splitPath,
} from "./path.mjs";

// joinPath //
assertEqual(joinPath(ROOT_PATH, "body"), "$.body");

// joinDeepPath //
assertEqual(joinDeepPath(ROOT_PATH, "body", 0), "$.body.0");

// getPathDeph //
assertEqual(getPathDeph(ROOT_PATH), 0);
assertEqual(getPathDeph(joinDeepPath(ROOT_PATH, "body", 0)), 2);

// splitPath //
assertDeepEqual(splitPath(joinDeepPath(ROOT_PATH, "body", 0), ROOT_PATH), [
  "body",
  0,
]);
assertDeepEqual(splitPath(joinDeepPath(ROOT_PATH, "body", 0), ROOT_PATH), [
  "body",
  0,
]);
assertDeepEqual(
  splitPath(
    joinDeepPath(ROOT_PATH, "body", 1),
    joinDeepPath(ROOT_PATH, "body", 1),
  ),
  [],
);
assertEqual(
  splitPath(
    joinDeepPath(ROOT_PATH, "body", 0),
    joinDeepPath(ROOT_PATH, "body", 1),
  ),
  null,
);

// walkPath //
{
  /** @type {import("./syntax").Program<{}>} */
  const root = { type: "Program", sourceType: "script", body: [] };
  assertEqual(walkPath([], root), root);
}
{
  /** @type {import("./syntax").Program<{}>} */
  const root = {
    type: "Program",
    sourceType: "script",
    body: [
      {
        type: "ExpressionStatement",
        directive: null,
        expression: {
          type: "Literal",
          value: 123,
          raw: null,
          bigint: null,
          regex: null,
        },
      },
    ],
  };
  assertEqual(walkPath(["body", 0], root), root.body[0]);
}
{
  /** @type {import("./syntax").Program<{}>} */
  const root = { type: "Program", sourceType: "script", body: [] };
  assertEqual(walkPath(["body", 0], root), null);
}
{
  /** @type {import("./syntax").Program<{}>} */
  const root = { type: "Program", sourceType: "script", body: [] };
  assertEqual(walkPath(["body", /** @type {"body"} */ ("length")], root), null);
}
