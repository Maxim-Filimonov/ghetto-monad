"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
function isError(result) {
    return result instanceof Error;
}
exports.isError = isError;
