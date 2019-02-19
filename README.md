# Ghetto Monad

Monad-inspired patterns using TypeScript type guards to enforce null-safety and error handling via the type system.

## Maybe

`Maybe.Type<T>` is a return value that is either `undefined` or a `T`.

To determine what the value is, dereference it like this:

```typescript
import * as Maybe from "ghetto-monad/Maybe";

function sometimesNull(): Maybe.Type<string> {
    if (Math.random() > 0.5) {
       return "Hello";
    } else {
       return undefined;
    }
}

const result = sometimesNull();

if (Maybe.isNothing(result)) {
    // result is a undefined
} else {
    // result is undefined
}
```

## Result

A Either-type.

`Result.Type<T>` is a return value that is either an `Error` or a `T`.

To determine what the value is, dereference it like this:

```typescript
import * as Result from 'ghetto-monad/Result';

function sometimesError(): Result.Type<string> {
    if (Math.random() > 0.5) {
       return "Hello";
    } else {
       return new Error("Doesn't work!");
    }
}

const result = sometimesError();

if (Result.isError(result)) {
   // handle error
} else {
   // result is a string
}
```