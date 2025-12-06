import { UnwrapError } from "./error.ts";
import { Option } from "./option.ts";
import { some, none, err, ok } from "./utils.ts";

export class Result<T = unknown, E = unknown> {
  private _isOk: boolean;
  private _value: T | undefined;
  private _error: E | undefined;

  constructor(isOk: true, value: T, error?: undefined);
  constructor(isOk: false, value: undefined, error: E);
  constructor(isOk: boolean, value?: T, error?: E) {
    this._isOk = isOk;
    if (isOk) {
      this._value = value;
    } else {
      this._error = error;
    }
  }

  isOk(): this is Result<T, never> {
    return this._isOk;
  }

  isOkAnd(f: (value: T) => boolean): this is Result<T, never> {
    return this._isOk && f(this._value as T);
  }

  isErr(): this is Result<never, E> {
    return !this._isOk;
  }

  isErrAnd(f: (error: E) => boolean): this is Result<never, E> {
    return !this._isOk && f(this._error as E);
  }

  ok(): Option<T> {
    if (this._isOk) {
      return some(this._value as T);
    } else {
      return none();
    }
  }

  err(): Option<E> {
    if (this._isOk) {
      return none();
    } else {
      return some(this._error as E);
    }
  }

  // as_ref  not needed in ts

  // as_mut  not needed in ts

  map<U>(op: (value: T) => U): Result<U, E> {
    if (this._isOk) {
      return ok(op(this._value as T));
    } else {
      return err(this._error as E);
    }
  }

  mapOr<U>(defaultValue: U, f: (value: T) => U): U {
    if (this._isOk) {
      return f(this._value as T);
    } else {
      return defaultValue;
    }
  }

  mapOrElse<U>(defaultF: (error: E) => U, f: (value: T) => U): U {
    if (this._isOk) {
      return f(this._value as T);
    } else {
      return defaultF(this._error as E);
    }
  }

  // map_or_default  experimental API

  mapErr<F>(op: (error: E) => F): Result<T, F> {
    if (this._isOk) {
      return ok(this._value as T);
    } else {
      return err(op(this._error as E));
    }
  }

  inspect(f: (value: Readonly<T>) => void): Result<T, E> {
    if (this._isOk) {
      f(this._value as T);
    }
    return this;
  }

  inspectErr(f: (error: Readonly<E>) => void): Result<T, E> {
    if (!this._isOk) {
      f(this._error as E);
    }
    return this;
  }

  // as_deref  not needed in js

  // as_deref_mut  not needed in js

  iter(): IterableIterator<Readonly<T>> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias -- to distinguish from `this` in IteratorResult
    const self = this;
    if (this._isOk) {
      let consumed = false;
      return {
        [Symbol.iterator]() {
          return this;
        },
        next(): IteratorResult<T> {
          if (!consumed) {
            consumed = true;
            return {
              done: false,
              value: self._value as T,
            } as const;
          } else {
            return {
              done: true,
              value: undefined,
            } as IteratorResult<T>;
          }
        },
      };
    } else {
      return {
        [Symbol.iterator]() {
          return this;
        },
        next(): IteratorResult<T> {
          return {
            done: true,
            value: undefined,
          } as IteratorResult<T>;
        },
      };
    }
  }

  iterMut(): IterableIterator<T> {
    return this.iter();
  }

  expect(message: string): T {
    if (this._isOk) {
      return this._value as T;
    } else {
      throw new UnwrapError(`${message}: ${this._error}`, this._error);
    }
  }

  unwrap(): T {
    if (this._isOk) {
      return this._value as T;
    } else {
      throw new UnwrapError(`${this._error}`, this._error);
    }
  }

  // unwrap_or_default  no default value in ts

  expectErr(message: string): E {
    if (this._isOk) {
      throw new UnwrapError(`${message}: ${this._value}`, this._value);
    } else {
      return this._error as E;
    }
  }

  unwrapErr(): E {
    if (this._isOk) {
      throw new UnwrapError(`${this._value}`, this._value);
    } else {
      return this._error as E;
    }
  }

  // into_ok  experimental API

  // into_err  experimental API

  and<U>(res: Result<U, E>): Result<U, E> {
    if (this._isOk) {
      return res;
    } else {
      return err(this._error as E);
    }
  }

  andThen<U>(op: (value: T) => Result<U, E>): Result<U, E> {
    if (this._isOk) {
      return op(this._value as T);
    } else {
      return err(this._error as E);
    }
  }

  or<F>(res: Result<T, F>): Result<T, F> {
    if (this._isOk) {
      return ok(this._value as T);
    } else {
      return res;
    }
  }

  orElse<F>(op: (error: E) => Result<T, F>): Result<T, F> {
    if (this._isOk) {
      return ok(this._value as T);
    } else {
      return op(this._error as E);
    }
  }

  unwrapOr(defaultValue: T): T {
    if (this._isOk) {
      return this._value as T;
    } else {
      return defaultValue;
    }
  }

  unwrapOrElse(op: (error: E) => T): T {
    if (this._isOk) {
      return this._value as T;
    } else {
      return op(this._error as E);
    }
  }

  /** Different from rust's unwrap_unchecked, this will return undefined if the result is Err */
  unwrapUnchecked(): T | undefined {
    return this._value;
  }

  /** Different from rust's unwrap_err_unchecked, this will return undefined if the result is Ok */
  unwrapErrUnchecked(): E | undefined {
    return this._error;
  }

  // copied  not needed in ts

  // cloned  not needed in ts

  transpose(): T extends Option<infer U> ? Option<Result<U, E>> : never {
    if (this._value !== undefined && !(this._value instanceof Option)) return undefined as never;
    if (!this._isOk) {
      return some(err(this._error)) as unknown as T extends Option<infer U>
        ? Option<Result<U, E>>
        : never;
    } else {
      if ((this._value as T extends Option<infer U> ? Option<U> : never).isSome()) {
        return some(
          ok((this._value as T extends Option<infer U> ? Option<U> : never).unwrap()),
        ) as unknown as T extends Option<infer U> ? Option<Result<U, E>> : never;
      } else {
        return none() as unknown as T extends Option<infer U> ? Option<Result<U, E>> : never;
      }
    }
  }

  flatten(): T extends Result<infer U, E> ? Result<U, E> : never {
    if (this._value !== undefined && !(this._value instanceof Result)) return undefined as never;
    if (this._isOk) {
      return ((this._value as T extends Result<infer U, E> ? Result<U, E> : never)._isOk
        ? ok(
            (this._value as T extends Result<infer U, E> ? Result<U, E> : never)
              ._value as T extends Result<infer U, E> ? U : never,
          )
        : err(
            (this._value as T extends Result<infer U, E> ? Result<U, E> : never)._error as E,
          )) as unknown as T extends Result<infer U, E> ? Result<U, E> : never;
    } else {
      return err(this._error) as unknown as T extends Result<infer U, E> ? Result<U, E> : never;
    }
  }

  // other methods will not be implemented unless needed
}
