import { assert } from "console";
import { assertEqual, assertThrow } from "../test/assert.mjs";
import {
  has,
  get,
  getObject,
  getBoolean,
  getFalse,
  getTrue,
  getNull,
  getJsonPrimitive,
  getObjectArray,
  getSingleton,
  getDoubleton,
  getTripleton,
  getQuadrupleton,
  getString,
  getObjectSingleton,
  getArray,
  getNullableObjectArray,
  getEmpty,
  getRecord,
} from "./access.mjs";
import { PreciseEstreeSyntaxError } from "./error.mjs";

const path = /** @type {import("./path").Path} */ ("path");
const kind = /** @type {import("./kind").Kind} */ ("kind");

// has //
assertEqual(has({ foo: 123 }, "foo"), true);
assertEqual(has({ __proto__: { foo: 123 } }, "foo"), false);

// get //
assertEqual(get({ foo: 123 }, "foo"), 123);
assertEqual(get({ __proto__: { foo: 123 } }, "foo"), undefined);

// getObject //
{
  const object = {};
  assertEqual(getObject({ foo: object }, "foo", path, kind), object);
}
assertThrow(() => {
  getObject({ foo: 123 }, "foo", path, kind);
}, PreciseEstreeSyntaxError);

// getArray //
{
  const array = [123];
  assertEqual(getArray({ foo: array }, "foo", path, kind), array);
}
assertThrow(() => {
  getArray({ foo: {} }, "foo", path, kind);
}, PreciseEstreeSyntaxError);

// getBoolean //
assertEqual(getBoolean({ foo: true }, "foo", path, kind), true);
assertEqual(getBoolean({ foo: false }, "foo", path, kind), false);
assertEqual(getBoolean({ foo: undefined }, "foo", path, kind), false);
assertThrow(() => {
  getBoolean({ foo: 123 }, "foo", path, kind);
}, PreciseEstreeSyntaxError);

// getFalse //
assertEqual(getFalse({ foo: false }, "foo", path, kind), false);
assertEqual(getFalse({ foo: undefined }, "foo", path, kind), false);
assertThrow(() => {
  getFalse({ foo: true }, "foo", path, kind);
}, PreciseEstreeSyntaxError);

// getTrue //
assertEqual(getTrue({ foo: true }, "foo", path, kind), true);
assertThrow(() => {
  getTrue({ foo: false }, "foo", path, kind);
}, PreciseEstreeSyntaxError);

// getString //
assertEqual(getString({ foo: "bar" }, "foo", path, kind), "bar");
assertThrow(() => {
  getString({ foo: 123 }, "foo", path, kind);
}, PreciseEstreeSyntaxError);

// getNull //
assertEqual(getNull({ foo: null }, "foo", path, kind), null);
assertEqual(getNull({ foo: undefined }, "foo", path, kind), null);
assertThrow(() => {
  getNull({ foo: 123 }, "foo", path, kind);
}, PreciseEstreeSyntaxError);

// getJsonPrimitive //
assertEqual(getJsonPrimitive({ foo: null }, "foo", path, kind), null);
assertEqual(getJsonPrimitive({ foo: true }, "foo", path, kind), true);
assertEqual(getJsonPrimitive({ foo: false }, "foo", path, kind), false);
assertEqual(getJsonPrimitive({ foo: 123 }, "foo", path, kind), 123);
assertEqual(getJsonPrimitive({ foo: "bar" }, "foo", path, kind), "bar");
assertThrow(() => {
  getJsonPrimitive({ foo: 123n }, "foo", path, kind);
}, PreciseEstreeSyntaxError);

// getObjectArray //
{
  const array = [{}];
  assertEqual(getObjectArray({ foo: array }, "foo", path, kind), array);
}
assertThrow(() => {
  getObjectArray({ foo: [123] }, "foo", path, kind);
}, PreciseEstreeSyntaxError);
assertThrow(() => {
  getObjectArray({ foo: [null] }, "foo", path, kind);
}, PreciseEstreeSyntaxError);

// getNullableObjectArray //
{
  const array = [{}, null];
  assertEqual(getNullableObjectArray({ foo: array }, "foo", path, kind), array);
}
assertThrow(() => {
  getNullableObjectArray({ foo: [123] }, "foo", path, kind);
}, PreciseEstreeSyntaxError);

// getObjectSingleton //
{
  const array = [{}];
  assertEqual(getObjectSingleton({ foo: array }, "foo", path, kind), array);
}
assertThrow(() => {
  getObjectSingleton({ foo: [] }, "foo", path, kind);
}, PreciseEstreeSyntaxError);
assertThrow(() => {
  getObjectSingleton({ foo: [123] }, "foo", path, kind);
}, PreciseEstreeSyntaxError);
assertThrow(() => {
  getObjectSingleton({ foo: [{}, {}] }, "foo", path, kind);
}, PreciseEstreeSyntaxError);

// getRecord //
assertEqual(getRecord({ foo: "bar" }, "foo", path, kind, { bar: null }), "bar");
assertThrow(() => {
  getRecord({ foo: "qux" }, "foo", path, kind, { bar: null });
}, PreciseEstreeSyntaxError);

// getEmpty //
{
  /** @type {[]} */
  const array = [];
  assertEqual(getEmpty({ foo: array }, "foo", path, kind), array);
}
assertThrow(() => {
  getEmpty({ foo: [123] }, "foo", path, kind);
}, PreciseEstreeSyntaxError);

// getSingleton //
assertEqual(getSingleton({ foo: 123 }, "foo", path, kind, 123), 123);
assertThrow(() => {
  getSingleton({ foo: 456 }, "foo", path, kind, 123);
}, PreciseEstreeSyntaxError);

// getDoubleton //
assertEqual(getDoubleton({ foo: 123 }, "foo", path, kind, 123, 456), 123);
assertEqual(getDoubleton({ foo: 456 }, "foo", path, kind, 123, 456), 456);
assertThrow(() => {
  getDoubleton({ foo: 789 }, "foo", path, kind, 123, 456);
}, PreciseEstreeSyntaxError);

// getTripleton //
assertEqual(getTripleton({ foo: 123 }, "foo", path, kind, 123, 456, 789), 123);
assertEqual(getTripleton({ foo: 456 }, "foo", path, kind, 123, 456, 789), 456);
assertEqual(getTripleton({ foo: 789 }, "foo", path, kind, 123, 456, 789), 789);
assertThrow(() => {
  getTripleton({ foo: 0 }, "foo", path, kind, 123, 456, 789);
}, PreciseEstreeSyntaxError);

// getQuadrupleton //
assertEqual(
  getQuadrupleton({ foo: 12 }, "foo", path, kind, 12, 34, 56, 78),
  12,
);
assertEqual(
  getQuadrupleton({ foo: 34 }, "foo", path, kind, 12, 34, 56, 78),
  34,
);
assertEqual(
  getQuadrupleton({ foo: 56 }, "foo", path, kind, 12, 34, 56, 78),
  56,
);
assertEqual(
  getQuadrupleton({ foo: 78 }, "foo", path, kind, 12, 34, 56, 78),
  78,
);
assertThrow(() => {
  getQuadrupleton({ foo: 90 }, "foo", path, kind, 12, 34, 56, 78);
}, PreciseEstreeSyntaxError);
