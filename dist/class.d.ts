type UnicBit<Flags extends FlagsRecord = FlagsRecord> = bigint | Keys<Flags> | Bitfield<Flags>;
type Bit<Flags extends FlagsRecord = FlagsRecord> = UnicBit<Flags> | Array<UnicBit<Flags>>;
type FlagsRecord = {
    [key: string]: bigint;
};
type Keys<Flags extends FlagsRecord> = Extract<keyof Flags, string>;
export declare class Bitfield<Flags extends FlagsRecord = FlagsRecord> {
    bits: bigint;
    Flags: { [key in Keys<Flags>]: bigint; };
    resolve: (...bit: Bit<Flags>[]) => bigint;
    Object: typeof Bitfield;
    constructor(...bits: Bit<Flags>[]);
    has(bit: Bit<Flags>): boolean;
    missing(bits: Bit<Flags>): Array<Keys<Flags>>;
    add(...bits: Array<Bit<Flags>>): this | Bitfield<FlagsRecord>;
    remove(...bits: Array<Bit<Flags>>): this | Bitfield<FlagsRecord>;
    serialize(): Record<Extract<keyof Flags, string>, boolean>;
    toArray(): Array<Keys<Flags>>;
    toJSON(): number;
    [Symbol.iterator](): Generator<Extract<keyof Flags, string>, void, unknown>;
    static get ALL(): bigint;
    static resolve<Flags extends FlagsRecord = FlagsRecord>(..._bit: Bit<Flags>[]): bigint;
    private static _resolve;
    static Flags: FlagsRecord;
    static defaulBits: bigint;
}
export {};
