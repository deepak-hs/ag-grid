"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.month = void 0;
const interval_1 = require("./interval");
function encode(date) {
    return date.getFullYear() * 12 + date.getMonth();
}
function decode(encoded) {
    const year = Math.floor(encoded / 12);
    const month = encoded - year * 12;
    return new Date(year, month, 1);
}
exports.month = new interval_1.CountableTimeInterval(encode, decode);
exports.default = exports.month;
