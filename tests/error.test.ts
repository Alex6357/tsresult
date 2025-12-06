// AI Generated Test File for UnwrapError class
// Comprehensive tests for the UnwrapError implementation

import { expect, describe, it } from "@jest/globals";

import { UnwrapError } from "../src/core/error.ts";

describe("UnwrapError", () => {
  it("should create an instance with message and origin", () => {
    const origin = "test origin";
    const error = new UnwrapError("Test error message", origin);

    expect(error).toBeInstanceOf(UnwrapError);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("Test error message");
    expect(error.name).toBe("UnwrapError");
    expect(error.origin).toBe(origin);
  });

  it("should store different types of origin values", () => {
    const stringOrigin = "string origin";
    const objectOrigin = { key: "value" };
    const nullOrigin = null;
    const undefinedOrigin = undefined;

    const error1 = new UnwrapError("Error", stringOrigin);
    const error2 = new UnwrapError("Error", objectOrigin);
    const error3 = new UnwrapError("Error", nullOrigin);
    const error4 = new UnwrapError("Error", undefinedOrigin);

    expect(error1.origin).toBe(stringOrigin);
    expect(error2.origin).toBe(objectOrigin);
    expect(error3.origin).toBe(nullOrigin);
    expect(error4.origin).toBe(undefinedOrigin);
  });
});
