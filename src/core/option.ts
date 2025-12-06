import { UnwrapError } from "./error.ts";
import { Result } from "./result.ts";
import { type __some, err, none, ok, some } from "./utils.ts";

export class Option<T> {
  private _value: T | null;

  constructor(value: T | undefined | null) {
    this._value = value === undefined ? null : value;
  }

  isSome(): this is Option<T> & { [__some]: true } {
    return this._value !== null;
  }

  isSomeAnd(f: (value: T) => boolean): this is Option<T> & { [__some]: true } {
    return this._value !== null && f(this._value);
  }

  isNone(): this is Option<never> {
    return this._value === null;
  }

  isNoneOr(f: (value: T) => boolean): boolean {
    return this._value === null || f(this._value);
  }

  // as_ref  not needed in ts

  // as_mut  not needed in ts

  // as_pin_ref  not needed in ts

  // as_pin_mut  not needed in ts

  // as_slice  not needed in ts (I guess)

  // as_mut_slice  not needed in ts

  expect(message: string): T {
    if (this._value === null) {
      throw new UnwrapError(message, null);
    } else {
      return this._value;
    }
  }

  unwrap(): T {
    if (this._value === null) {
      throw new UnwrapError("Called `Option.unwrap()` on a `None` value.", null);
    } else {
      return this._value;
    }
  }

  unwrapOr(defaultValue: T): T {
    if (this._value === null) {
      return defaultValue;
    } else {
      return this._value;
    }
  }

  unwrapOrElse(f: () => T): T {
    if (this._value === null) {
      return f();
    } else {
      return this._value;
    }
  }

  // unwrap_or_default  no default value in ts

  /** Different from rust's unwrap_unchecked, this will return undefined if the option is None. */
  unwrapUnchecked(): T | undefined {
    return this._value ?? undefined;
  }

  map<U>(f: (value: T) => U): Option<U> {
    if (this._value === null) {
      return none();
    } else {
      return some(f(this._value));
    }
  }

  inspect(f: (value: T) => void): Option<T> {
    if (this._value !== null) {
      f(this._value);
    }
    return this;
  }

  mapOr<U>(defaultValue: U, f: (value: T) => U): U {
    if (this._value === null) {
      return defaultValue;
    } else {
      return f(this._value);
    }
  }

  mapOrElse<U>(defaultF: () => U, f: (value: T) => U): U {
    if (this._value === null) {
      return defaultF();
    } else {
      return f(this._value);
    }
  }

  // map_or_default  experimental API

  okOr<E>(error: E): Result<T, E> {
    if (this._value === null) {
      return err(error);
    } else {
      return ok(this._value);
    }
  }

  okOrElse<E>(f: () => E): Result<T, E> {
    if (this._value === null) {
      return err(f());
    } else {
      return ok(this._value);
    }
  }

  // as_deref  not needed in ts

  // as_deref_mut  not needed in ts

  iter(): IterableIterator<Readonly<T>> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias -- to distinguish from `this` in IteratorResult
    const self = this;
    if (this._value !== null) {
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

  and<U>(optb: Option<U>): Option<U> {
    if (this._value === null) {
      return none();
    } else {
      return optb;
    }
  }

  andThen<U>(f: (value: T) => Option<U>): Option<U> {
    if (this._value === null) {
      return none();
    } else {
      return f(this._value);
    }
  }

  filter(predicate: (value: T) => boolean): Option<T> {
    if (this._value === null) {
      return none();
    } else if (predicate(this._value)) {
      return some(this._value);
    } else {
      return none();
    }
  }

  or(optb: T): Option<T> {
    if (this._value === null) {
      return some(optb);
    } else {
      return some(this._value);
    }
  }

  orElse(f: () => Option<T>): Option<T> {
    if (this._value === null) {
      return f();
    } else {
      return some(this._value);
    }
  }

  xor(optb: Option<T>): Option<T> {
    if (this._value === null && optb.isSome()) {
      return optb;
    } else if (this._value !== null && optb.isNone()) {
      return some(this._value);
    } else {
      return none();
    }
  }

  /** There is no reference type in TypeScript, so `insert` returns `value` directly. */
  insert(value: T): T {
    this._value = value;
    return value;
  }

  getOrInsert(value: T): T {
    if (this._value === null) {
      this._value = value;
    }
    return this._value;
  }

  // get_or_insert_default  no default value in ts

  getOrInsertWith(f: () => T): T {
    if (this._value === null) {
      this._value = f();
    }
    return this._value;
  }

  take(): Option<T> {
    if (this._value === null) {
      return none();
    } else {
      const value = this._value;
      this._value = null;
      return some(value);
    }
  }

  takeIf(predicate: (value: T) => boolean): Option<T> {
    if (this._value === null) {
      return none();
    } else if (predicate(this._value)) {
      const value = this._value;
      this._value = null;
      return some(value);
    } else {
      return none();
    }
  }

  replace(value: T): Option<T> {
    const oldValue = this._value;
    this._value = value;
    if (oldValue === null) {
      return none();
    } else {
      return some(oldValue);
    }
  }

  zip<U>(other: Option<U>): Option<[T, U]> {
    if (this._value === null || other._value === null) {
      return none();
    } else {
      return some([this._value, other._value]);
    }
  }

  // zip_with  experimental API

  // reduce  experimental API

  unzip(): T extends [infer U, infer V] ? [Option<U>, Option<V>] : never {
    if (this._value === null) {
      return [none(), none()] as unknown as T extends [infer U, infer V]
        ? [Option<U>, Option<V>]
        : never;
    } else {
      return [
        some((this._value as T extends [infer U, infer V] ? [U, V] : never)[0]),
        some((this._value as T extends [infer U, infer V] ? [U, V] : never)[1]),
      ] as unknown as T extends [infer U, infer V] ? [Option<U>, Option<V>] : never;
    }
  }

  // copied  not needed in ts

  // cloned  not needed in ts

  // TODO make type alias
  transpose(): T extends Result<infer U, infer E> ? Result<Option<U>, E> : never {
    if (!(this._value instanceof Result)) return undefined as never;
    if ((this._value as T extends Result<infer U, infer E> ? Result<U, E> : never) === null) {
      return ok(none()) as unknown as T extends Result<infer U, infer E>
        ? Result<Option<U>, E>
        : never;
    } else if ((this._value as T extends Result<infer U, infer E> ? Result<U, E> : never).isOk()) {
      return ok(
        some((this._value as T extends Result<infer U, infer E> ? Result<U, E> : never).unwrap()),
      ) as unknown as T extends Result<infer U, infer E> ? Result<Option<U>, E> : never;
    } else {
      return err(
        (this._value as T extends Result<infer U, infer E> ? Result<U, E> : never).unwrapErr(),
      ) as unknown as T extends Result<infer U, infer E> ? Result<Option<U>, E> : never;
    }
  }

  flatten(): T extends Option<infer U> ? Option<U> : never {
    if (this._value !== null) {
      if (!(this._value instanceof Option)) return undefined as never;
      if (this._value.isSome()) {
        return some(
          (this._value as T extends Option<infer U> ? Option<U> : never).unwrap(),
        ) as unknown as T extends Option<infer U> ? Option<U> : never;
      } else {
        return none() as unknown as T extends Option<infer U> ? Option<U> : never;
      }
    } else {
      return none() as unknown as T extends Option<infer U> ? Option<U> : never;
    }
  }

  // other methods will not be implemented unless needed
}
