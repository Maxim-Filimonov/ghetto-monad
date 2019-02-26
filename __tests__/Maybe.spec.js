"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
function somethingOrNothing(something) {
    return something
        ? new __1.Result("Tada!")
        : new __1.Nothing();
}
describe('Maybe', () => {
    it('Returns a Nothing', () => {
        const result = somethingOrNothing(false);
        expect(result.isError).toBe(false);
        expect(result.isNothing).toBe(true);
        expect(result.value).toBe(undefined);
    });
    it('Returns an Result', () => {
        const result = somethingOrNothing(true);
        expect(result.isError).toBe(false);
        expect(result.isNothing).toBe(false);
        expect(result.value).toBe("Tada!");
    });
});
