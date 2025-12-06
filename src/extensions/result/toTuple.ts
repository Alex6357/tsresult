import type { Result } from "../../core/result.ts";
import { registerResultExtension } from "../register.ts";

function toTuple<T, E>(this: Result<T, E>): [T, null] | [null, E] {
  try {
    return [this.unwrap(), null];
  } catch {
    return [null, this.err().unwrap()];
  }
}

registerResultExtension("toTuple", toTuple);

declare module "../../core/result.ts" {
  interface Result<T, E> {
    toTuple(): [T] extends [never]
      ? [null, E]
      : [E] extends [never]
        ? [T, null]
        : [null, E] | [T, null];
  }
}

export default toTuple;
