export type Either<T, P> = P | T;

interface IError {
    isNothing: false;
    isError: true;
    error: Error;
}

interface IResult<T> {
    isNothing: false;
    isError: false;
    value: T
}

interface INothing {
    isNothing: true;
    isError: false;
}

export class Nothing implements INothing {
    public isNothing: true = true;
    public isError: false = false;
}

export class Result<T> implements IResult<T> {
    public isNothing: false = false;
    public isError: false = false;
    public value: T

    constructor(value: T) {
        this.value = value;
    }
}

export class ErrorResult<T extends Error> implements IError {
    public isError: true = true;
    public isNothing: false = false;
    public error: T;

    constructor(error: T) {
        this.error = error;
    }
}

export type Maybe<T> = INothing | T;
