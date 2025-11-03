"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bitfield = exports.bit = exports.create = void 0;
const class_1 = require("./class");
Object.defineProperty(exports, "Bitfield", { enumerable: true, get: function () { return class_1.Bitfield; } });
const create = (flags, defaultBits) => {
    class Bitfield extends class_1.Bitfield {
    }
    Bitfield.Flags = flags;
    Bitfield.defaultBit = class_1.Bitfield.resolve(defaultBits ?? 0n);
    return Bitfield;
};
exports.create = create;
const bit = (flag) => {
    flag = typeof flag === 'bigint' ? flag : BigInt(flag);
    return 1n << flag;
};
exports.bit = bit;
