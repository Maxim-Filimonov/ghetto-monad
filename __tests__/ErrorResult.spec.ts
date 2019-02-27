import { Either, ErrorResult, Result } from "..";

class NotImplementedError implements Error {
    name: string; message: string;
    stack?: string | undefined;
    constructor(error: Error) {
        this.name = error.name;
        this.message = error.message;
        this.stack = error.stack;
    }
};

class ValidationError implements Error {
    name: string; message: string;
    stack?: string | undefined;
    constructor(error: Error) {
        this.name = error.name;
        this.message = error.message;
        this.stack = error.stack;
    }
};

type State = 'NOT_IMPLEMENTED' | 'VALIDATION' | 'PASS';

function errorOrResult(state: State): Either<ErrorResult<NotImplementedError | ValidationError>, Result<number>> {
    if (state === 'PASS') {
        return new Result(5);
    }
    if (state === 'NOT_IMPLEMENTED') {
        return new ErrorResult(new NotImplementedError(new Error("Not implemented (yet)!")))
    }
    return new ErrorResult(new ValidationError(new Error("Validation Error")));
}

describe("ErrorResult", () => {
    it("Can return a NotImplementedError", () => {
        const result = (errorOrResult('NOT_IMPLEMENTED') as ErrorResult<NotImplementedError>);
        expect(result.isError).toBe(true)
        expect(result.error instanceof NotImplementedError).toBe(true);
    });
    it("Can return a ValidationError", () => {
        const result = (errorOrResult('VALIDATION') as ErrorResult<ValidationError>);
        expect(result.isError).toBe(true)
        expect(result.error instanceof NotImplementedError).toBe(false);
        expect(result.error instanceof ValidationError).toBe(true);
    });
    it("Can return a Result", () => {
        const result = errorOrResult('PASS');
        expect(result.isError).toBe(false)
        expect((result as Result<number>).value).toBe(5);
    });
});

