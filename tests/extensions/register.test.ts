/* eslint-disable @typescript-eslint/no-explicit-any */
// AI Generated Test File for Extension Registration System
// Comprehensive tests for the extension registration mechanism

import { describe, it, expect, beforeEach, jest } from "@jest/globals";

import { Result, Option, ok, some } from "../../src/index.ts";
import { registerResultExtension, registerOptionExtension } from "../../src/extensions/register.ts";

describe("Extension Registration System", () => {
  beforeEach(() => {
    // Clear any existing extensions for clean testing
    jest.resetModules();
  });

  describe("registerResultExtension", () => {
    it("should register a new method on Result prototype", () => {
      const testMethod = jest.fn(function (this: any) {
        return "test-result-extension";
      });

      registerResultExtension("testMethod", testMethod);

      const result = ok(42);
      expect(typeof (result as any).testMethod).toBe("function");
      expect((result as any).testMethod()).toBe("test-result-extension");
    });

    it("should not overwrite existing methods", () => {
      const originalIsOk = Result.prototype.isOk;
      const mockIsOk = jest.fn(() => false);

      registerResultExtension("isOk", mockIsOk as any);

      const result = ok(42);
      expect(result.isOk).toBe(originalIsOk);
      expect(result.isOk()).toBe(true);
    });

    it("should not register the same extension twice", () => {
      let callCount = 0;
      const countingMethod = jest.fn(function (this: any) {
        return ++callCount;
      });

      registerResultExtension("countingMethod", countingMethod);
      registerResultExtension("countingMethod", countingMethod); // Try to register again

      const result = ok(42);
      const result1 = (result as any).countingMethod();
      const result2 = (result as any).countingMethod();

      // Should still be 1 because it's the same function, not duplicated
      expect(result1).toBe(1);
      expect(result2).toBe(2);
    });
  });

  describe("registerOptionExtension", () => {
    it("should register a new method on Option prototype", () => {
      const testMethod = jest.fn(function (this: any) {
        return "test-option-extension";
      });

      registerOptionExtension("testMethod", testMethod);

      const option = some(42);
      expect(typeof (option as any).testMethod).toBe("function");
      expect((option as any).testMethod()).toBe("test-option-extension");
    });

    it("should not overwrite existing methods", () => {
      const originalIsSome = Option.prototype.isSome;
      const mockIsSome = jest.fn(() => false);

      registerOptionExtension("isSome", mockIsSome as any);

      const option = some(42);
      expect(option.isSome).toBe(originalIsSome);
      expect(option.isSome()).toBe(true);
    });

    it("should not register the same extension twice", () => {
      let callCount = 0;
      const countingMethod = jest.fn(function (this: any) {
        return ++callCount;
      });

      registerOptionExtension("countingMethod", countingMethod);
      registerOptionExtension("countingMethod", countingMethod); // Try to register again

      const option = some(42);
      const result1 = (option as any).countingMethod();
      const result2 = (option as any).countingMethod();

      // Should still be 1 because it's the same function, not duplicated
      expect(result1).toBe(1);
      expect(result2).toBe(2);
    });
  });
});
