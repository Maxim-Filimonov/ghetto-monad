import { Either, ErrorResult, Result } from '..';

function errorOrObject(jsonString: string): Either<ErrorResult, Result<object>> {
    try {
        return new Result(JSON.parse(jsonString));
    } catch (e) {
        return new ErrorResult(e);
    }
}

describe('Either', () => {
    it('Returns an error', () => {
        const result = errorOrObject('boo!');
        expect(result.isError).toBe(true);
        expect(result.isNothing).toBe(false);
        expect((result as any).value).toBe(undefined);
        expect((result as ErrorResult).error instanceof Error).toBe(true);
    });
    it('Returns an Result', () => {
        const result = errorOrObject(JSON.stringify({ a: 6 }));
        expect(result.isError).toBe(false);
        expect(result.isNothing).toBe(false);
        expect(((result as Result<object>).value as any).a).toBe(6);
        expect((result as ErrorResult).error instanceof Error).toBe(false);
    });
});
