import { Result } from "./result.ts";
import { Option } from "./option.ts";

export function wrap<T, E = unknown>(fn: () => T): Result<T, E> {
  try {
    return ok(fn());
  } catch (e) {
    return err(e as E);
  }
}

export async function wrapPromise<T, E = unknown>(promise: Promise<T>): Promise<Result<T, E>> {
  try {
    try {
      const value = await promise;
      return ok(value);
    } catch (error) {
      return err(error as E);
    }
  } catch (e) {
    return Promise.resolve(err(e as E));
  }
}

export declare const __some: unique symbol;
export function some<T>(value: T): Option<T> & { [__some]: true } {
  return new Option(value) as Option<T> & { [__some]: true };
}
export function none(): Option<never> {
  return new Option<never>(null);
}

export function ok<T>(value: T): Result<T, never> {
  return new Result<T, never>(true, value);
}

export function err<E>(error: E): Result<never, E> {
  return new Result<never, E>(false, undefined, error);
}

export type Ok<T> = Result<T, never>;
export type Err<E> = Result<never, E>;
export type Some<T> = Option<T> & { [__some]: true };
export type None = Option<never>;
