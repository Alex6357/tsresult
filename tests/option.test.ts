// AI Generated Test File for Option type
// Comprehensive tests for the Option type implementation

import { expect, describe, it } from "@jest/globals";

import { some, none } from "../src/index.ts";
import { Option } from "../src/core/option.ts";
import { UnwrapError } from "../src/core/error.ts";

// Import extensions
import "../src/extensions/option/toNullable.ts";

describe("Option", () => {
  describe("Constructors", () => {
    it("should create Some variant with some()", () => {
      const option = some(42);
      expect(option.isSome()).toBe(true);
      expect(option.isNone()).toBe(false);
    });

    it("should create None variant with none()", () => {
      const option = none();
      expect(option.isSome()).toBe(false);
      expect(option.isNone()).toBe(true);
    });
  });

  describe("Boolean checks", () => {
    it("should correctly identify Some values with isSomeAnd", () => {
      const option = some(42);
      expect(option.isSomeAnd((x) => x > 40)).toBe(true);
      expect(option.isSomeAnd((x) => x < 40)).toBe(false);
    });

    it("should correctly identify None with isNoneOr", () => {
      const option = none();
      expect(option.isNoneOr((x) => x > 40)).toBe(true);
    });

    it("should correctly identify Some values with isNoneOr", () => {
      const option1 = some(42);
      const option2 = some(21);

      expect(option1.isNoneOr((x) => x > 40)).toBe(true);
      expect(option2.isNoneOr((x) => x > 40)).toBe(false);
    });
  });

  describe("Unwrap methods", () => {
    it("should unwrap Some values", () => {
      const option = some(42);
      expect(option.unwrap()).toBe(42);
    });

    it("should throw UnwrapError when unwrapping None", () => {
      const option = none();
      expect(() => option.unwrap()).toThrow(UnwrapError);
    });

    it("should return default value with unwrapOr for None", () => {
      const option = none() as Option<number>;
      expect(option.unwrapOr(42)).toBe(42);
    });

    it("should return actual value with unwrapOr for Some", () => {
      const option = some(21);
      expect(option.unwrapOr(42)).toBe(21);
    });

    it("should return function result with unwrapOrElse for None", () => {
      const option = none() as Option<number>;
      expect(option.unwrapOrElse(() => 42)).toBe(42);
    });

    it("should return actual value with unwrapOrElse for Some", () => {
      const option = some(21);
      expect(option.unwrapOrElse(() => 42)).toBe(21);
    });

    it("should return value or undefined with unwrapUnchecked", () => {
      const someOption = some(42);
      const noneOption = none();

      expect(someOption.unwrapUnchecked()).toBe(42);
      expect(noneOption.unwrapUnchecked()).toBeUndefined();
    });

    it("should throw with specific message in expect", () => {
      const option = none();
      expect(() => option.expect("Deliberate error")).toThrow("Deliberate error");
    });
  });

  describe("Map operations", () => {
    it("should map Some values", () => {
      const option = some(21);
      const mapped = option.map((x) => x * 2);

      expect(mapped.isSome()).toBe(true);
      expect(mapped.unwrap()).toBe(42);
    });

    it("should preserve None through map", () => {
      const option = none();
      const mapped = option.map((x: number) => x * 2);

      expect(mapped.isNone()).toBe(true);
    });

    it("should call inspect function for Some values", () => {
      const option = some(42);
      let inspectedValue: number | undefined;

      option.inspect((value) => {
        inspectedValue = value;
      });

      expect(inspectedValue).toBe(42);
    });

    it("should not call inspect function for None values", () => {
      const option = none();
      let inspectCalled = false;

      option.inspect(() => {
        inspectCalled = true;
      });

      expect(inspectCalled).toBe(false);
    });

    it("should mapOr with default value for None", () => {
      const option = none();
      const value = option.mapOr(0, (x) => x * 2);

      expect(value).toBe(0);
    });

    it("should mapOr with function for Some", () => {
      const option = some(21);
      const value = option.mapOr(0, (x) => x * 2);

      expect(value).toBe(42);
    });

    it("should mapOrElse with default function for None", () => {
      const option = none();
      const value = option.mapOrElse(
        () => 42,
        (val) => val * 2,
      );

      expect(value).toBe(42);
    });

    it("should mapOrElse with map function for Some", () => {
      const option = some(21);
      const value = option.mapOrElse(
        () => 42,
        (val) => val * 2,
      );

      expect(value).toBe(42);
    });
  });

  describe("Conversion methods", () => {
    it("should convert Some to Ok with okOr", () => {
      const option = some(42);
      const result = option.okOr("error");

      expect(result.isOk()).toBe(true);
      expect(result.unwrap()).toBe(42);
    });

    it("should convert None to Err with okOr", () => {
      const option = none();
      const result = option.okOr("error");

      expect(result.isErr()).toBe(true);
      expect(result.unwrapErr()).toBe("error");
    });

    it("should convert Some to Ok with okOrElse", () => {
      const option = some(42);
      const result = option.okOrElse(() => "error");

      expect(result.isOk()).toBe(true);
      expect(result.unwrap()).toBe(42);
    });

    it("should convert None to Err with okOrElse", () => {
      const option = none();
      const result = option.okOrElse(() => "error");

      expect(result.isErr()).toBe(true);
      expect(result.unwrapErr()).toBe("error");
    });
  });

  describe("Iterator methods", () => {
    it("should iterate over Some values", () => {
      const option = some(42);
      const values: number[] = [];

      for (const value of option.iter()) {
        values.push(value);
      }

      expect(values).toEqual([42]);
    });

    it("should not iterate over None values", () => {
      const option = none();
      const values: unknown[] = [];

      for (const value of option.iter()) {
        values.push(value);
      }

      expect(values).toEqual([]);
    });
  });

  describe("Combination methods", () => {
    it("should return second option with and for Some", () => {
      const first = some(42);
      const second = some("success");
      const combined = first.and(second);

      expect(combined.isSome()).toBe(true);
      expect(combined.unwrap()).toBe("success");
    });

    it("should return None with and for None", () => {
      const first = none();
      const second = some("success");
      const combined = first.and(second);

      expect(combined.isNone()).toBe(true);
    });

    it("should execute function with andThen for Some", () => {
      const option = some(21);
      const chained = option.andThen((x) => some(x * 2));

      expect(chained.isSome()).toBe(true);
      expect(chained.unwrap()).toBe(42);
    });

    it("should skip function with andThen for None", () => {
      const option = none();
      const chained = option.andThen((x: number) => some(x * 2));

      expect(chained.isNone()).toBe(true);
    });

    it("should return original Some with or for Some", () => {
      const first = some(42);
      const second = 21;
      const combined = first.or(second);

      expect(combined.isSome()).toBe(true);
      expect(combined.unwrap()).toBe(42);
    });

    it("should return provided value with or for None", () => {
      const first = none() as Option<number>;
      const second = 42;
      const combined = first.or(second);

      expect(combined.isSome()).toBe(true);
      expect(combined.unwrap()).toBe(42);
    });

    it("should execute function with orElse for None", () => {
      const option = none() as Option<number>;
      const chained = option.orElse(() => some(42));

      expect(chained.isSome()).toBe(true);
      expect(chained.unwrap()).toBe(42);
    });

    it("should skip function with orElse for Some", () => {
      const option = some(21);
      const chained = option.orElse(() => some(42));

      expect(chained.isSome()).toBe(true);
      expect(chained.unwrap()).toBe(21);
    });

    it("should return Some with xor when exactly one is Some", () => {
      const first = none() as Option<number>;
      const second = some(42);
      const third = some(21);
      const fourth = none() as Option<number>;

      const result1 = first.xor(second);
      const result2 = third.xor(fourth);

      expect(result1.isSome()).toBe(true);
      expect(result1.unwrap()).toBe(42);
      expect(result2.isSome()).toBe(true);
      expect(result2.unwrap()).toBe(21);
    });

    it("should return None with xor when both are Some or both are None", () => {
      const first = some(42);
      const second = some(21);
      const third = none();
      const fourth = none();

      const result1 = first.xor(second);
      const result2 = third.xor(fourth);

      expect(result1.isNone()).toBe(true);
      expect(result2.isNone()).toBe(true);
    });
  });

  describe("Mutation methods", () => {
    it("should insert value", () => {
      const option = none() as Option<number>;
      const inserted = option.insert(42);

      expect(inserted).toBe(42);
      expect(option.isSome()).toBe(true);
      expect(option.unwrap()).toBe(42);
    });

    it("should get or insert value", () => {
      const noneOption = none() as Option<number>;
      const someOption = some(21) as Option<number>;

      const noneValue = noneOption.getOrInsert(42);
      const someValue = someOption.getOrInsert(42);

      expect(noneValue).toBe(42);
      expect(someValue).toBe(21);
      expect(noneOption.unwrap()).toBe(42);
      expect(someOption.unwrap()).toBe(21);
    });

    it("should get or insert with function", () => {
      const noneOption = none() as Option<number>;
      const someOption = some(21) as Option<number>;

      const noneValue = noneOption.getOrInsertWith(() => 42);
      const someValue = someOption.getOrInsertWith(() => 42);

      expect(noneValue).toBe(42);
      expect(someValue).toBe(21);
      expect(noneOption.unwrap()).toBe(42);
      expect(someOption.unwrap()).toBe(21);
    });

    it("should take value", () => {
      const someOption = some(42);
      const noneOption = none();

      const takenFromSome = someOption.take();
      const takenFromNone = noneOption.take();

      expect(takenFromSome.isSome()).toBe(true);
      expect(takenFromSome.unwrap()).toBe(42);
      expect(someOption.isNone()).toBe(true);

      expect(takenFromNone.isNone()).toBe(true);
      expect(noneOption.isNone()).toBe(true);
    });

    it("should take value conditionally with takeIf", () => {
      const someOption1 = some(42);
      const someOption2 = some(21);
      const noneOption = none();

      const taken1 = someOption1.takeIf((x) => x > 40);
      const taken2 = someOption2.takeIf((x) => x > 40);
      const taken3 = noneOption.takeIf((x) => x > 40);

      expect(taken1.isSome()).toBe(true);
      expect(taken1.unwrap()).toBe(42);
      expect(someOption1.isNone()).toBe(true);

      expect(taken2.isNone()).toBe(true);
      expect(someOption2.isSome()).toBe(true);
      expect(someOption2.unwrap()).toBe(21);

      expect(taken3.isNone()).toBe(true);
      expect(noneOption.isNone()).toBe(true);
    });

    it("should replace value", () => {
      const someOption = some(21);
      const noneOption = none() as Option<number>;

      const oldSome = someOption.replace(42);
      const oldNone = noneOption.replace(42);

      expect(oldSome.isSome()).toBe(true);
      expect(oldSome.unwrap()).toBe(21);
      expect(someOption.isSome()).toBe(true);
      expect(someOption.unwrap()).toBe(42);

      expect(oldNone.isNone()).toBe(true);
      expect(noneOption.isSome()).toBe(true);
      expect(noneOption.unwrap()).toBe(42);
    });
  });

  describe("Combining methods", () => {
    it("should filter Some values", () => {
      const someOption1 = some(42);
      const someOption2 = some(21);
      const noneOption = none();

      const filtered1 = someOption1.filter((x) => x > 40);
      const filtered2 = someOption2.filter((x) => x > 40);
      const filtered3 = noneOption.filter((x) => x > 40);

      expect(filtered1.isSome()).toBe(true);
      expect(filtered1.unwrap()).toBe(42);

      expect(filtered2.isNone()).toBe(true);

      expect(filtered3.isNone()).toBe(true);
    });

    it("should zip two Some values", () => {
      const first = some(42);
      const second = some("hello");
      const noneVal = none();

      const zipped1 = first.zip(second);
      const zipped2 = first.zip(noneVal);

      expect(zipped1.isSome()).toBe(true);
      expect(zipped1.unwrap()).toEqual([42, "hello"]);

      expect(zipped2.isNone()).toBe(true);
    });

    it("should unzip tuple values", () => {
      const option = some([42, "hello"]) as Option<[number, string]>;
      const noneOption = none() as Option<[number, string]>;

      const unzipped1 = option.unzip();
      const unzipped2 = noneOption.unzip();

      expect(Array.isArray(unzipped1)).toBe(true);
      expect(unzipped1[0].isSome()).toBe(true);
      expect(unzipped1[1].isSome()).toBe(true);
      expect(unzipped1[0].unwrap()).toBe(42);
      expect(unzipped1[1].unwrap()).toBe("hello");

      expect(Array.isArray(unzipped2)).toBe(true);
      expect(unzipped2[0].isNone()).toBe(true);
      expect(unzipped2[1].isNone()).toBe(true);
    });
  });

  describe("Flatten method", () => {
    it("should flatten Some(Some(T)) to Some(T)", () => {
      const option = some(some(42)) as Option<Option<number>>;
      const flattened = option.flatten();

      expect(flattened.isSome()).toBe(true);
      expect(flattened.unwrap()).toBe(42);
    });

    it("should flatten Some(None) to None", () => {
      const option = some(none()) as Option<Option<number>>;
      const flattened = option.flatten();

      expect(flattened.isNone()).toBe(true);
    });

    it("should preserve None through flatten", () => {
      const option = none() as Option<Option<number>>;
      const flattened = option.flatten();

      expect(flattened.isNone()).toBe(true);
    });
  });

  describe("Extension methods", () => {
    it("should convert to nullable with toNullable extension", () => {
      const someOption = some(42);
      const noneOption = none();

      const someValue = someOption.toNullable();
      const noneValue = noneOption.toNullable();

      expect(someValue).toBe(42);
      expect(noneValue).toBeNull();
    });
  });
});
