"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bitfield = void 0;
class Bitfield {
    constructor(...bits) {
        this.Flags = {};
        this.resolve = Bitfield['resolve'];
        this.Object = (Bitfield);
        const object = this.constructor;
        const resolve = object._resolve.bind(this.constructor);
        this.bits = resolve(bits.length ? bits : object.defaulBits);
        Object.defineProperty(this, 'resolve', {
            value: resolve,
            enumerable: false,
        });
        Object.defineProperty(this, 'Object', {
            value: object,
            enumerable: false,
        });
        Object.defineProperty(this, 'Flags', {
            value: object.Flags,
            enumerable: false,
        });
    }
    has(bit) {
        bit = this.resolve(bit);
        return (this.bits & bit) === bit;
    }
    missing(bits) {
        return new this.Object(bits).remove(this).toArray();
    }
    add(...bits) {
        let total = this.Object.defaulBits;
        for (const bit of bits) {
            total |= this.resolve(bit);
        }
        if (Object.isFrozen(this))
            return new this.Object(this.bits | total);
        this.bits |= total;
        return this;
    }
    remove(...bits) {
        let total = Bitfield.defaulBits;
        for (const bit of bits) {
            total |= this.resolve(bit);
        }
        if (Object.isFrozen(this))
            return new this.Object(this.bits & ~total);
        this.bits &= ~total;
        return this;
    }
    serialize() {
        const serialized = {};
        for (const [flag, bit] of Object.entries(this.Object.Flags)) {
            serialized[flag] = this.has(bit);
        }
        return serialized;
    }
    toArray() {
        return Object.keys(this.Object.Flags).filter(bit => this.has(bit));
    }
    toJSON() {
        return Number(this.bits);
    }
    *[Symbol.iterator]() {
        yield* this.toArray();
    }
    static get ALL() {
        const { Flags } = this;
        return Object.values(Flags).reduce((all, p) => all | p, 0n);
    }
    static resolve(..._bit) {
        return this._resolve(_bit.flat(Infinity));
    }
    static _resolve(bit) {
        const { Flags } = this;
        if (typeof bit === 'bigint')
            return bit;
        if (bit instanceof Bitfield)
            return bit.bits;
        if (Array.isArray(bit))
            return bit.map(p => this._resolve(p)).reduce((prev, p) => prev | p, 0n);
        if (typeof bit === 'string' && typeof Flags[bit] !== 'undefined')
            return Flags[bit];
        throw new Error('BitField Invalid: ' + bit);
    }
}
exports.Bitfield = Bitfield;
Bitfield.Flags = {};
Bitfield.defaulBits = 0n;
