import { assertDeepEqual, assertEqual } from "../../test/assert.mjs";
import {
  map,
  mapSingleton,
  filter,
  isNotNull,
  truncate,
  show,
} from "./index.mjs";

assertDeepEqual(
  map([1, 2, 3], (x) => 2 * x),
  [2, 4, 6],
);

assertDeepEqual(
  mapSingleton([1], (x) => 2 * x),
  [2],
);

assertDeepEqual(filter([1, null, 2, null, 3], isNotNull), [1, 2, 3]);

assertEqual(truncate("hello, world!", 5), "hello...");

assertEqual(show(123, 100), "123");
assertEqual(show("foo", 100), '"foo"');
assertEqual(show([], 100), "[]");
assertEqual(show([123], 100), "[123]");
assertEqual(show([123, 456], 100), "[123, 456]");
assertEqual(show([123, 456, 789], 100), "[123, 456, ...]");
assertEqual(show({}, 100), "{}");
assertEqual(show({ foo: 123 }, 100), '{"foo": 123}');
assertEqual(show({ foo: 123, bar: 456 }, 100), '{"foo": 123, ...}');
assertEqual(
  show(function () {}, 100),
  "<function>",
);
assertEqual(
  show(function foo() {}, 100),
  "<function foo>",
);
