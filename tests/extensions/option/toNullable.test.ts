// AI Generated Test File for Option toNullable extension
// Comprehensive tests for the toNullable extension method

import { expect, describe, it } from "@jest/globals";

import { some, none } from "../../../src/index.ts";

describe("Option toNullable extension", () => {
  it("should convert Some value to the contained value", () => {
    const option = some(42);
    const value = option.toNullable();

    expect(value).toBe(42);
  });

  it("should convert None to null", () => {
    const option = none();
    const value = option.toNullable();

    expect(value).toBeNull();
  });

  it("should work with different value types", () => {
    const stringValue = some("hello");
    const objectValue = some({ name: "test" });
    const arrayValue = some([1, 2, 3]);
    const booleanValue = some(true);

    expect(stringValue.toNullable()).toBe("hello");
    expect(objectValue.toNullable()).toEqual({ name: "test" });
    expect(arrayValue.toNullable()).toEqual([1, 2, 3]);
    expect(booleanValue.toNullable()).toBe(true);
  });

  it("should handle falsy values correctly", () => {
    const zero = some(0);
    const emptyString = some("");
    const falseValue = some(false);

    expect(zero.toNullable()).toBe(0);
    expect(emptyString.toNullable()).toBe("");
    expect(falseValue.toNullable()).toBe(false);
  });
});
