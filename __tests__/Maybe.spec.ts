import { Maybe, Nothing, Result } from '..';

function somethingOrNothing(something: boolean): Maybe<Result<string>> {
    return something
        ? new Result("Tada!")
        : new Nothing();
}

describe('Maybe', () => {
    it('Returns a Nothing', () => {
        const result = somethingOrNothing(false);
        expect(result.isError).toBe(false);
        expect(result.isNothing).toBe(true);
        expect((result as any).value).toBe(undefined);
    });
    it('Returns an Result', () => {
        const result = somethingOrNothing(true);
        expect(result.isError).toBe(false);
        expect(result.isNothing).toBe(false);
        expect(((result as Result<string>).value as any)).toBe("Tada!");
    });
});
