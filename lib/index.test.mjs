import { assertDeepEqual, assertEqual, assertThrow } from "../test/assert.mjs";
import {
  EstreeSentrySyntaxError,
  guard,
  guardWithAnnotation,
  ROOT_PATH,
} from "./index.mjs";

assertEqual(
  guard({
    type: "Program",
    sourceType: "script",
    body: [],
  }).type,
  "Program",
);

{
  /** @type {import("estree").Program} */
  const root = {
    type: "Program",
    sourceType: "script",
    body: [
      {
        type: "ImportDeclaration",
        specifiers: [],
        source: {
          type: "Literal",
          value: "./module.mjs",
        },
      },
    ],
  };
  assertThrow(() => guard(root), EstreeSentrySyntaxError);
}

assertEqual(
  guardWithAnnotation(
    {
      type: "Program",
      sourceType: "script",
      body: [],
    },
    ROOT_PATH,
    (_node, path, _kind) => ({ path }),
  ).path,
  ROOT_PATH,
);
