
/**
 * {Maybe.Type<T> is a return value that is either undefined or a T
 *
 * To determine what the value is, dereference it like this:
 *
 * function sometimesNull(): Maybe.Type<string> {
 *    if (Math.random() > 0.5) {
 *        return "Hello";
 *    } else {
 *        return undefined;
 *    }
 * }
 * const result = sometimesNull();
 *
 * if (Maybe.isNothing(result)) {
 *    // result is undefined
 * } else {
 *    // result is a string
 * }
 *
 */
type Maybe<T> = T | undefined;
export type Type<T> = Maybe<T>;

export function isNothing<T>(value: Maybe<T>): value is undefined {
    return (typeof value === "undefined" || value === null);
}
