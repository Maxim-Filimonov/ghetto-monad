"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
function errorOrObject(jsonString) {
    try {
        return new __1.Result(JSON.parse(jsonString));
    }
    catch (e) {
        return new __1.ErrorResult(e);
    }
}
describe('Either', () => {
    it('Returns an error', () => {
        const result = errorOrObject('boo!');
        expect(result.isError).toBe(true);
        expect(result.isNothing).toBe(false);
        expect(result.value).toBe(undefined);
        expect(result.error instanceof Error).toBe(true);
    });
    it('Returns an Result', () => {
        const result = errorOrObject(JSON.stringify({ a: 6 }));
        expect(result.isError).toBe(false);
        expect(result.isNothing).toBe(false);
        expect(result.value.a).toBe(6);
        expect(result.error instanceof Error).toBe(false);
    });
});
