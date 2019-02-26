export declare type Either<T, P> = P | T;
interface IError {
    isNothing: false;
    isError: true;
    error: Error;
}
interface IResult<T> {
    isNothing: false;
    isError: false;
    value: T;
}
interface INothing {
    isNothing: true;
    isError: false;
}
export declare class Nothing implements INothing {
    isNothing: true;
    isError: false;
}
export declare class Result<T> implements IResult<T> {
    isNothing: false;
    isError: false;
    value: T;
    constructor(value: T);
}
export declare class ErrorResult implements IError {
    isError: true;
    isNothing: false;
    error: Error;
    constructor(error: Error);
}
export declare type Maybe<T> = INothing | T;
export {};
