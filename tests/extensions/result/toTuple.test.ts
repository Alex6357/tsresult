// AI Generated Test File for Result toTuple extension
// Comprehensive tests for the toTuple extension method

import { expect, describe, it } from "@jest/globals";

import { ok, err } from "../../../src/index.ts";

describe("Result toTuple extension", () => {
  it("should convert Ok result to [value, null] tuple", () => {
    const result = ok(42);
    const tuple = result.toTuple();

    expect(tuple).toEqual([42, null]);
  });

  it("should convert Err result to [null, error] tuple", () => {
    const result = err("error");
    const tuple = result.toTuple();

    expect(tuple).toEqual([null, "error"]);
  });

  it("should work with different value types", () => {
    const stringResult = ok("hello");
    const objectResult = ok({ name: "test" });
    const arrayResult = ok([1, 2, 3]);

    expect(stringResult.toTuple()).toEqual(["hello", null]);
    expect(objectResult.toTuple()).toEqual([{ name: "test" }, null]);
    expect(arrayResult.toTuple()).toEqual([[1, 2, 3], null]);
  });

  it("should work with different error types", () => {
    const stringError = err("error");
    const objectError = err(new Error("test error"));
    const numberError = err(404);

    expect(stringError.toTuple()).toEqual([null, "error"]);
    expect(objectError.toTuple()).toEqual([null, new Error("test error")]);
    expect(numberError.toTuple()).toEqual([null, 404]);
  });
});
