"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Nothing {
    constructor() {
        this.isNothing = true;
        this.isError = false;
    }
}
exports.Nothing = Nothing;
class Result {
    constructor(value) {
        this.isNothing = false;
        this.isError = false;
        this.value = value;
    }
}
exports.Result = Result;
class ErrorResult {
    constructor(error) {
        this.isError = true;
        this.isNothing = false;
        this.error = error;
    }
}
exports.ErrorResult = ErrorResult;
