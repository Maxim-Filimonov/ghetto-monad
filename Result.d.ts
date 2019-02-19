/**
 * Result.Type<T> is a return value that is either an Error or a T
 *
 * To determine what the value is, dereference it like this:
 *
 * function sometimesError(): Result.Type<string> {
 *    if (Math.random() > 0.5) {
 *        return "Hello";
 *    } else {
 *        return new Error("Doesn't work!");
 *    }
 * }
 * const result = sometimesError();
 *
 * if (Result.isError(result)) {
 *    // handle error
 * } else {
 *    // result is a string
 * }
 *
 */
declare type Result<T> = Error | T;
export declare type Type<T> = Result<T>;
export declare function isError<T>(result: Result<T>): result is Error;
export {};
