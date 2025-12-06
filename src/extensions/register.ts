import { Result } from "../core/result.ts";
import { Option } from "../core/option.ts";

const resultExtensions = new Set<string>();
const optionExtensions = new Set<string>();

function registerExtension(
  name: string,
  impl: unknown,
  target: "result" | "option",
  currentExtensions: Set<string>,
) {
  if (currentExtensions.has(name)) {
    // if (process?.env?.NODE_ENV !== "production" || import.meta.env.MODE === "development") {
    //   console.warn(`Extension "${name}" of ${target} already registered, skipping.`);
    // }
    return;
  }

  const proto = target === "result" ? Result.prototype : Option.prototype;

  currentExtensions.add(name);

  if (!(name in proto)) {
    Object.defineProperty(proto, name, {
      value: impl,
      writable: true,
      enumerable: false,
      configurable: true,
    });
  }
}

export function registerResultExtension(
  name: string,
  impl: <T, E>(self: Result<T, E>) => unknown,
): void {
  registerExtension(name, impl, "result", resultExtensions);
}

export function registerOptionExtension(name: string, impl: <T>(this: Option<T>) => unknown): void {
  registerExtension(name, impl, "option", optionExtensions);
}
