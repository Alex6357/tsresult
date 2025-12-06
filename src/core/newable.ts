import type { Result } from "./result.ts";
import type { Option } from "./option.ts";
import { ok, err, some, none } from "./utils.ts";

/** @deprecated use `ok` instead */
export const Ok = ok as unknown as new <T>(value: T) => Result<T, never>;
/** @deprecated use `err` instead */
export const Err = err as unknown as new <E>(error: E) => Result<never, E>;

/** @deprecated use `some` instead */
export const Some = some as unknown as new <T>(value: T) => Option<T>;
/** @deprecated use `none` instead */
export const None = none as unknown as new () => Option<never>;
