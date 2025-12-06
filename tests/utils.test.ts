// AI Generated Test File for utility functions
// Comprehensive tests for the utility functions

import { expect, describe, it } from "@jest/globals";

import { wrap, wrapPromise, ok, err, some, none } from "../src/index.ts";

describe("Utility functions", () => {
  describe("wrap", () => {
    it("should wrap successful function calls in Ok", () => {
      const result = wrap(() => 42);

      expect(result.isOk()).toBe(true);
      expect(result.unwrap()).toBe(42);
    });

    it("should wrap throwing function calls in Err", () => {
      const result = wrap<unknown, Error>(() => {
        throw new Error("Test error");
      });

      expect(result.isErr()).toBe(true);
      expect(result.unwrapErr()).toBeInstanceOf(Error);
      expect(result.unwrapErr().message).toBe("Test error");
    });
  });

  describe("wrapPromise", () => {
    it("should wrap successful promises in Ok", async () => {
      const result = await wrapPromise(Promise.resolve(42));

      expect(result.isOk()).toBe(true);
      expect(result.unwrap()).toBe(42);
    });

    it("should wrap rejected promises in Err", async () => {
      const result = await wrapPromise<unknown, Error>(Promise.reject(new Error("Test error")));

      expect(result.isErr()).toBe(true);
      expect(result.unwrapErr()).toBeInstanceOf(Error);
      expect(result.unwrapErr().message).toBe("Test error");
    });
  });

  describe("Constructor functions", () => {
    it("should create Ok result with ok()", () => {
      const result = ok(42);
      expect(result.isOk()).toBe(true);
      expect(result.unwrap()).toBe(42);
    });

    it("should create Err result with err()", () => {
      const result = err("error");
      expect(result.isErr()).toBe(true);
      expect(result.unwrapErr()).toBe("error");
    });

    it("should create Some option with some()", () => {
      const option = some(42);
      expect(option.isSome()).toBe(true);
      expect(option.unwrap()).toBe(42);
    });

    it("should create None option with none()", () => {
      const option = none();
      expect(option.isNone()).toBe(true);
    });
  });
});
