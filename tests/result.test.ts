// AI Generated Test File for Result type
// Comprehensive tests for the Result type implementation

import { expect, describe, it } from "@jest/globals";

import { ok, err, some, none } from "../src/index.ts";
import { Result } from "../src/core/result.ts";
import { Option } from "../src/core/option.ts";
import { UnwrapError } from "../src/core/error.ts";

// Import extensions
import "../src/extensions/result/toTuple.ts";

describe("Result", () => {
  describe("Constructors", () => {
    it("should create Ok variant with ok()", () => {
      const result = ok(42);
      expect(result.isOk()).toBe(true);
      expect(result.isErr()).toBe(false);
    });

    it("should create Err variant with err()", () => {
      const result = err("error");
      expect(result.isOk()).toBe(false);
      expect(result.isErr()).toBe(true);
    });
  });

  describe("Inspect methods", () => {
    it("should call inspect function for Ok values", () => {
      const result = ok(42);
      let inspectedValue: number | undefined;

      result.inspect((value) => {
        inspectedValue = value;
      });

      expect(inspectedValue).toBe(42);
    });

    it("should not call inspect function for Err values", () => {
      const result = err("error");
      let inspectCalled = false;

      result.inspect(() => {
        inspectCalled = true;
      });

      expect(inspectCalled).toBe(false);
    });

    it("should call inspectErr function for Err values", () => {
      const result = err("error");
      let inspectedError: string | undefined;

      result.inspectErr((error) => {
        inspectedError = error;
      });

      expect(inspectedError).toBe("error");
    });

    it("should not call inspectErr function for Ok values", () => {
      const result = ok(42);
      let inspectErrCalled = false;

      result.inspectErr(() => {
        inspectErrCalled = true;
      });

      expect(inspectErrCalled).toBe(false);
    });
  });

  describe("Map operations", () => {
    it("should map Ok values", () => {
      const result = ok(21);
      const mapped = result.map((x) => x * 2);

      expect(mapped.isOk()).toBe(true);
      expect(mapped.unwrap()).toBe(42);
    });

    it("should preserve Err through map", () => {
      const result = err("error") as Result<number, string>;
      const mapped = result.map((x) => x * 2);

      expect(mapped.isErr()).toBe(true);
      expect(mapped.unwrapErr()).toBe("error");
    });

    it("should map Err values with mapErr", () => {
      const result = err(42) as Result<string, number>;
      const mapped = result.mapErr((x) => `Error code: ${x}`);

      expect(mapped.isErr()).toBe(true);
      expect(mapped.unwrapErr()).toBe("Error code: 42");
    });

    it("should preserve Ok through mapErr", () => {
      const result = ok("success");
      const mapped = result.mapErr((x) => `Error: ${x}`);

      expect(mapped.isOk()).toBe(true);
      expect(mapped.unwrap()).toBe("success");
    });
  });

  describe("Map with default operations", () => {
    it("should mapOr with default value for Err", () => {
      const result = err("error") as Result<number, string>;
      const value = result.mapOr(0, (x) => x * 2);

      expect(value).toBe(0);
    });

    it("should mapOr with function for Ok", () => {
      const result = ok(21);
      const value = result.mapOr(0, (x) => x * 2);

      expect(value).toBe(42);
    });

    it("should mapOrElse with default function for Err", () => {
      const result = err("error") as Result<number, string>;
      const value = result.mapOrElse(
        (err) => err.length,
        (val) => val * 2,
      );

      expect(value).toBe(5); // length of "error"
    });

    it("should mapOrElse with map function for Ok", () => {
      const result = ok(21) as Result<number, string>;
      const value = result.mapOrElse(
        (err) => err.length,
        (val) => val * 2,
      );

      expect(value).toBe(42);
    });
  });

  describe("Boolean checks", () => {
    it("should correctly identify Ok values with isOkAnd", () => {
      const result = ok(42);
      expect(result.isOkAnd((x) => x > 40)).toBe(true);
      expect(result.isOkAnd((x) => x < 40)).toBe(false);
    });

    it("should correctly identify Err values with isErrAnd", () => {
      const result = err("error");
      expect(result.isErrAnd((e) => e.includes("err"))).toBe(true);
      expect(result.isErrAnd((e) => e.includes("fail"))).toBe(false);
    });
  });

  describe("Conversion methods", () => {
    it("should convert Ok to Some with ok()", () => {
      const result = ok(42);
      const option = result.ok();

      expect(option.isSome()).toBe(true);
      expect(option.unwrap()).toBe(42);
    });

    it("should convert Err to None with ok()", () => {
      const result = err("error");
      const option = result.ok();

      expect(option.isNone()).toBe(true);
    });

    it("should convert Err to Some with err()", () => {
      const result = err("error");
      const option = result.err();

      expect(option.isSome()).toBe(true);
      expect(option.unwrap()).toBe("error");
    });

    it("should convert Ok to None with err()", () => {
      const result = ok(42);
      const option = result.err();

      expect(option.isNone()).toBe(true);
    });
  });

  describe("Unwrap methods", () => {
    it("should unwrap Ok values", () => {
      const result = ok(42);
      expect(result.unwrap()).toBe(42);
    });

    it("should throw UnwrapError when unwrapping Err", () => {
      const result = err("error");
      expect(() => result.unwrap()).toThrow(UnwrapError);
    });

    it("should unwrap Err values with unwrapErr", () => {
      const result = err("error");
      expect(result.unwrapErr()).toBe("error");
    });

    it("should throw UnwrapError when unwrappingErr Ok", () => {
      const result = ok(42);
      expect(() => result.unwrapErr()).toThrow(UnwrapError);
    });

    it("should return default value with unwrapOr for Err", () => {
      const result = err("error") as Result<number, string>;
      expect(result.unwrapOr(0)).toBe(0);
    });

    it("should return actual value with unwrapOr for Ok", () => {
      const result = ok(42);
      expect(result.unwrapOr(0)).toBe(42);
    });

    it("should return function result with unwrapOrElse for Err", () => {
      const result = err("error") as Result<number, string>;
      expect(result.unwrapOrElse(() => 42)).toBe(42);
    });

    it("should return actual value with unwrapOrElse for Ok", () => {
      const result = ok(21);
      expect(result.unwrapOrElse(() => 42)).toBe(21);
    });

    it("should return value or undefined with unwrapUnchecked", () => {
      const okResult = ok(42);
      const errResult = err("error");

      expect(okResult.unwrapUnchecked()).toBe(42);
      expect(errResult.unwrapUnchecked()).toBeUndefined();
    });

    it("should return error or undefined with unwrapErrUnchecked", () => {
      const okResult = ok(42);
      const errResult = err("error");

      expect(okResult.unwrapErrUnchecked()).toBeUndefined();
      expect(errResult.unwrapErrUnchecked()).toBe("error");
    });

    it("should throw with specific message in expect", () => {
      const result = err("error");
      expect(() => result.expect("Deliberate error")).toThrow("Deliberate error: error");
    });

    it("should throw with specific message in expectErr", () => {
      const result = ok(42);
      expect(() => result.expectErr("Should be error")).toThrow("Should be error: 42");
    });
  });

  describe("Combination methods", () => {
    it("should return second result with and for Ok", () => {
      const first = ok(42);
      const second = ok("success");
      const combined = first.and(second);

      expect(combined.isOk()).toBe(true);
      expect(combined.unwrap()).toBe("success");
    });

    it("should return Err with and for Err", () => {
      const first = err("error");
      const second = ok("success");
      const combined = first.and(second);

      expect(combined.isErr()).toBe(true);
      expect(combined.unwrapErr()).toBe("error");
    });

    it("should execute function with andThen for Ok", () => {
      const result = ok(21);
      const chained = result.andThen((x) => ok(x * 2));

      expect(chained.isOk()).toBe(true);
      expect(chained.unwrap()).toBe(42);
    });

    it("should skip function with andThen for Err", () => {
      const result = err("error") as Result<number, string>;
      const chained = result.andThen((x) => ok(x * 2));

      expect(chained.isErr()).toBe(true);
      expect(chained.unwrapErr()).toBe("error");
    });

    it("should return first result with or for Ok", () => {
      const first = ok(42);
      const second = err("error");
      const combined = first.or(second);

      expect(combined.isOk()).toBe(true);
      expect(combined.unwrap()).toBe(42);
    });

    it("should return second result with or for Err", () => {
      const first = err("first error") as Result<number, string>;
      const second = ok(42);
      const combined = first.or(second);

      expect(combined.isOk()).toBe(true);
      expect(combined.unwrap()).toBe(42);
    });

    it("should execute function with orElse for Err", () => {
      const result = err("error") as Result<number, string>;
      const chained = result.orElse(() => ok(42));

      expect(chained.isOk()).toBe(true);
      expect(chained.unwrap()).toBe(42);
    });

    it("should skip function with orElse for Ok", () => {
      const result = ok(21);
      const chained = result.orElse(() => ok(42));

      expect(chained.isOk()).toBe(true);
      expect(chained.unwrap()).toBe(21);
    });
  });

  describe("Iterator methods", () => {
    it("should iterate over Ok values", () => {
      const result = ok(42);
      const values: number[] = [];

      for (const value of result.iter()) {
        values.push(value);
      }

      expect(values).toEqual([42]);
    });

    it("should not iterate over Err values", () => {
      const result = err("error");
      const values: unknown[] = [];

      for (const value of result.iter()) {
        values.push(value);
      }

      expect(values).toEqual([]);
    });
  });

  describe("Transpose method", () => {
    it("should transpose Ok(Some) to Some(Ok)", () => {
      const result = ok(some(42)) as Result<Option<number>, string>;
      const transposed = result.transpose();

      expect(transposed.isSome()).toBe(true);
      expect(transposed.unwrap().isOk()).toBe(true);
      expect(transposed.unwrap().unwrap()).toBe(42);
    });

    it("should transpose Ok(None) to None", () => {
      const result = ok(none()) as Result<Option<number>, string>;
      const transposed = result.transpose();

      expect(transposed.isNone()).toBe(true);
    });

    it("should transpose Err to Some(Err)", () => {
      const result = err("error") as Result<Option<number>, string>;
      const transposed = result.transpose();

      expect(transposed.isSome()).toBe(true);
      expect(transposed.unwrap().isErr()).toBe(true);
      expect(transposed.unwrap().unwrapErr()).toBe("error");
    });
  });

  describe("Flatten method", () => {
    it("should flatten Ok(Ok(T)) to Ok(T)", () => {
      const result = ok(ok(42)) as Result<Result<number, string>, string>;
      const flattened = result.flatten();

      expect(flattened.isOk()).toBe(true);
      expect(flattened.unwrap()).toBe(42);
    });

    it("should flatten Ok(Err(E)) to Err(E)", () => {
      const result = ok(err("inner error")) as Result<Result<number, string>, string>;
      const flattened = result.flatten();

      expect(flattened.isErr()).toBe(true);
      expect(flattened.unwrapErr()).toBe("inner error");
    });

    it("should preserve Err through flatten", () => {
      const result = err("outer error") as Result<Result<number, string>, string>;
      const flattened = result.flatten();

      expect(flattened.isErr()).toBe(true);
      expect(flattened.unwrapErr()).toBe("outer error");
    });
  });

  describe("Extension methods", () => {
    it("should convert to tuple with toTuple extension", () => {
      const okResult = ok(42);
      const errResult = err("error");

      const okTuple = okResult.toTuple();
      const errTuple = errResult.toTuple();

      expect(okTuple).toEqual([42, null]);
      expect(errTuple).toEqual([null, "error"]);
    });
  });
});
