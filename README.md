# Ghetto Monad

Monad-inspired patterns using TypeScript type guards to enforce null-safety and error handling via the type system.

_Version 2_: Version 2 of the library is backward-compatible with Version 1, but provides first-class objects.

## Installing

Install from [npm](https://www.npmjs.com/package/ghetto-monad):

```
npm i ghetto-monad
```

## Either

The Either type uses type guards to enforce error handling before allowing access to a return value. Use it when a function may return _either_ an Error or a result.

```typescript
import {Either, ErrorResult, Result} from 'ghetto-monad';

function errorOrString(jsonString: string): Either<ErrorResult<Error>, Result<object>> {
    try {
        return new Result(JSON.parse(jsonString));
    } catch (e) {
        return new ErrorResult(e);
    }
}

const result = errorOrString(something);

if (result.isError) {
    console.log(result.error); // .error property available
} else {
    console.log(result.value); // .value property available
}
```

## Typed Errors with `ErrorResult<T>`

Sometimes a function can return an Error. The `ErrorResult` type can wrap an Error, and provides metadata on the type of error, allowing you to communicate to consuming code the types of error that can be returned.

This is similar to the Java construct `throws` (see: [Specifying the Exceptions Thrown by a Method](https://docs.oracle.com/javase/tutorial/essential/exceptions/declaring.html)).

You don't have to use it, in which case just use `ErrorResult<Error>` everywhere.

If you do want error typings, then you need to create wrappers for errors.

For example, if your code can return a `NotImplementedError` or a `ValidationError`, then you declare classes for each of these Error types, extending Error. Then you can specify part of your return as `ErrorResult<NotImplementedError | ValidationError>`.

You need to implement your typed errors so that you can test them in consuming code using `instanceof`. So:

```typescript
export class NotImplementedError implements Error {
	name: string; message: string;
	stack?: string | undefined;
	constructor(error: Error) {
		this.name = error.name;
		this.message = error.message;
		this.stack = error.stack;
	}
};

export class ValidationError implements Error {
	name: string; message: string;
	stack?: string | undefined;
	constructor(error: Error) {
		this.name = error.name;
		this.message = error.message;
		this.stack = error.stack;
	}
};
```

And return errors like this:

```typescript
const coinToss = () => Math.random() > 0.5 ? "heads" : "tails";

function errorOrResult(): Either<ErrorResult<NotImplementedError | ValidationError>, Result<number>> {
    if (coinToss() === "heads") {
        return new Result(Math.random());
    }
    if (coinToss() === "heads") {
        return new ErrorResult(new NotImplementedError(new Error("Not implemented (yet)!")))
    }
    return new ErrorResult(new ValidationError(new Error("Validation Error")));
}
```

Then in the consuming code you can test the `ErrorResult` like this:

```typescript
const result = errorOrResult();
if (result.isError) {
    if (result.error instanceof NotImplementedError) {
        // NotImplementedError
    } else {
        // ValidationError
    }
} else {
    console.log(result.value);
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

function eitherOrNothing(): Either<ErrorResult<Error>, Maybe<IResult<string>>> {
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