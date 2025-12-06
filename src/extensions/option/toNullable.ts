import type { Option } from "../../core/option.ts";
import type { __some } from "../../core/utils.ts";
import { registerOptionExtension } from "../register.ts";

function toNullable<T>(this: Option<T>): T | null {
  try {
    return this.unwrap();
  } catch {
    return null;
  }
}

registerOptionExtension("toNullable", toNullable);

declare module "../../core/option.ts" {
  interface Option<T> {
    toNullable(this: Option<T> & { [__some]: true }): T;
    toNullable(): T | null;
  }
}

export default toNullable;
