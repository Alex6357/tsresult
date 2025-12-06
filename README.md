# tsresult

[![NPM Version](https://img.shields.io/npm/v/tsresult)](https://www.npmjs.com/package/tsresult)
[![License](https://img.shields.io/npm/l/tsresult)](https://github.com/Alex6357/tsresult/blob/main/LICENSE)

A TypeScript library that implements Rust-like Result and Option types for safer error handling and nullable value management.

## Features

- 🔒 **Type Safety**: Brings Rust's powerful `Result` and `Option` types to TypeScript
- 🛡️ **Error Handling**: Eliminate null/undefined runtime errors with compile-time safety
- 🧩 **Functional Approach**: Monad operations like `map`, `andThen`, `orElse`, etc.
- 🚀 **Zero Dependencies**: Lightweight library with no external dependencies
- 📦 **Tree-shakable**: Import only what you need
- 💪 **Fully Typed**: Complete TypeScript support with excellent IDE integration
- 🧰 **Rich Utility Extensions**: Extensive practical extensions that can be selectively imported

## Installation

```bash
npm install tsresult
# or
yarn add tsresult
# or
pnpm add tsresult
```

## Usage

### Result Type

The `Result<T, E>` type represents either success (`Ok`) or failure (`Err`).

```typescript
import { ok, err, type Result } from "tsresult";

// Function that might fail
function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return err("Cannot divide by zero");
  }
  return ok(a / b);
}

// Using the result
const result = divide(10, 2);
if (result.isOk()) {
  console.log("Result:", result.unwrap()); // 5
} else {
  console.error("Error:", result.unwrapErr());
}

// Chaining operations
divide(10, 2)
  .map((x) => x * 2)
  .map((x) => `Value is ${x}`)
  .inspect(console.log); // "Value is 10"
```

### Option Type

The `Option<T>` type represents an optional value: every Option is either `Some` and contains a value, or `None` and does not.

```typescript
import { some, none, type Option } from "tsresult";

// Function that might return nothing
function findUser(id: number): Option<User> {
  const user = database.find((u) => u.id === id);
  return user ? some(user) : none();
}

// Using the option
const user = findUser(123);
if (user.isSome()) {
  console.log("Found user:", user.unwrap());
} else {
  console.log("User not found");
}

// Safe operations
user
  .map((u) => u.name)
  .map((name) => `Hello, ${name}!`)
  .inspect(console.log);
```

### Extensions

The library includes helpful extensions:

```typescript
import "tsresult/extensions/all";

// Convert Result to tuple
const [value, error] = result.toTuple();

// Convert Option to nullable
const nullableValue = option.toNullable();
```

### Core-only Import (without extensions)

If you prefer to selectively load only the functionality you need, import from the core module:

```typescript
import { Result, Option, ok, err, some, none } from "tsresult/core";
// Extensions are not loaded by default
// You can import them explicitly if needed
```

With core-only imports, extensions like [toTuple](file://e:\Develop\github\tsresult\src\extensions\result\toTuple.ts#L3-L9) and [toNullable](file://e:\Develop\github\tsresult\test.ts#L6-L6) are not automatically available. You must explicitly import the extensions you want to use:

```typescript
import "tsresult/extensions/result/toTuple";
import "tsresult/extensions/option/toNullable";

// Now these extensions are available
const [value, error] = result.toTuple();
const nullable = option.toNullable();
```

This approach allows for more fine-grained control over bundle size and only includes the extensions you actually use.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Feel free to open issues and pull requests.
