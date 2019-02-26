# Ghetto Monad

Monad-inspired patterns using TypeScript type guards to enforce null-safety and error handling via the type system.

_Version 2_: Version 2 of the library is backward-compatible with Version 1, but provides first-class objects.

## Either

The Either type uses type guards to enforce error handling before allowing access to a return value. Use it when a function may return _either_ an Error or a result.

```typescript
import {Either, ErrorResult, Result} from 'ghetto-monad';

function errorOrString(jsonString: string): Either<ErrorResult, Result<object>> {
    try {
        return new Result(JSON.Parse(jsonString));
    } catch (e) {
        return newErrorResult(e);
    }
}

const result = errorOrString(something);

if (result.isError) {
    console.log(result.error); // .error property available
} else {
    console.log(result.value); // .value property available
}
```

## Maybe

The Maybe type uses type guards to enforce handling an undefined or null value before accessing the value. Use it when a function return value _maybe_ null or undefined.

```typescript
import {Maybe, Nothing, Result} from 'ghetto-monad';

function stringOrNothing(jsonString: string): Maybe<Result<string>>> {
    if (Math.random() > 0.5) {
        return new Nothing();
    } else return new Result<string>("Success!");
}

const result = stringOrNothing();

if (result.isNothing) {
    console.log("Nothing returned!");
} else {
    console.log(result.value); // .value property available
}
```

## Combining the two

```typescript
import {Either, ErrorResult, Maybe, Nothing, Result} from 'ghetto-monad';

function eitherOrNothing(): Either<IError, Maybe<IResult<string>>> {
    if (Math.random() > 0.5) {
        return new ErrorResult(new Error());
    } else return new Result<string>("Success!");
}
const e = eitherOrNothing();

if (e.isError) {
    // Result is Error
    console.log(e.error);
} else {
    if (e.isNothing) {
        // Result is nothing
    } else
        console.log(e.value);
}
```

## Deprecated Version 1 methods

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