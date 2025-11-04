/**
 * Tipagens principais para Bitfield
 * @module types
 */

/**
 * Representa um mapa de flags, onde cada chave é uma string
 * e o valor é um bigint representando o bit correspondente.
 */
export type FlagsRecord = { [key: string]: bigint }

/**
 * Extrai as chaves válidas de um registro de flags.
 */
export type Keys<Flags extends FlagsRecord> = Extract<keyof Flags, string>

/**
 * Representa uma unidade de bit única, que pode ser:
 * - Um bigint literal
 * - Uma chave do conjunto de flags
 * - Outra instância de Bitfield
 */
export type UnicBit<Flags extends FlagsRecord = FlagsRecord> =
  | bigint
  | Keys<Flags>
  | import('./index').Bitfield<Flags>

/**
 * Representa um ou mais bits combinados, podendo ser um único
 * valor (`bigint`, `string`, ou `Bitfield`) ou um array desses tipos.
 */
export type Bit<Flags extends FlagsRecord = FlagsRecord> =
  | UnicBit<Flags>
  | Array<UnicBit<Flags>>

/**
 * Classe base para manipulação de bitfields.
 * 
 * Representa um conjunto de bits (flags) usando BigInt, permitindo
 * adicionar, remover e verificar flags de forma tipada.
 * 
 * @typeParam Flags - Objeto de flags onde cada chave representa um nome e cada valor um bit (bigint).
 * 
 * @example
 * ```ts
 * const FLAGS = { READ: 1n << 0n, WRITE: 1n << 1n, EXECUTE: 1n << 2n }
 * class Permissions extends Bitfield<typeof FLAGS> {
 *   static Flags = FLAGS
 * }
 * 
 * const p = new Permissions(["READ", "WRITE"])
 * console.log(p.has("EXECUTE")) // false
 * p.add("EXECUTE")
 * console.log(p.toArray()) // ['READ', 'WRITE', 'EXECUTE']
 * ```
 */
export declare class Bitfield<Flags extends FlagsRecord = FlagsRecord> {
  /** Valor numérico (BigInt) representando os bits ativos. */
	public bits: bigint

  /** Mapa de flags disponíveis. */
	public Flags: { [key in Keys<Flags>]: bigint }

  /** Função que resolve valores (bitfields, nomes, bigint, arrays) para bigint. */
	public resolve: (...bit: Bit<Flags>[]) => bigint

  /** Referência estática para a própria classe. */
	public Object: typeof Bitfield

  /**
   * Cria uma nova instância de Bitfield.
   * @param bits - Um ou mais bits ou nomes de flags a serem inicializados.
   */
	constructor(...bits: Bit<Flags>[])

  /**
   * Verifica se todos os bits passados estão presentes.
   * @param bit - Bit ou flag a verificar.
   * @returns `true` se todos estiverem presentes.
   */
	public has(bit: Bit<Flags>): boolean

  /**
   * Retorna as flags que estão faltando, em relação a um conjunto informado.
   * @param bits - Bits ou flags a comparar.
   * @returns Lista de nomes das flags ausentes.
   */
	public missing(bits: Bit<Flags>): Array<Keys<Flags>>

  /**
   * Adiciona um ou mais bits/flags ao conjunto atual.
   * @param bits - Bits ou flags a adicionar.
   * @returns `this` ou uma nova instância se congelado.
   */
	public add(...bits: Array<Bit<Flags>>): this | Bitfield<Flags>

  /**
   * Remove um ou mais bits/flags do conjunto atual.
   * @param bits - Bits ou flags a remover.
   * @returns `this` ou uma nova instância se congelado.
   */
	public remove(...bits: Array<Bit<Flags>>): this | Bitfield<Flags>

  /**
   * Serializa o bitfield para um objeto `{ [flag]: boolean }`.
   * @returns Objeto com o estado (ligado/desligado) de cada flag.
   */
	public serialize(): Record<Keys<Flags>, boolean>

  /**
   * Retorna um array com as flags atualmente ativas.
   */
	public toArray(): Array<Keys<Flags>>

  /**
   * Converte os bits para número (Number).
   */
	public toJSON(): number

  /**
   * Permite iterar diretamente as flags ativas.
   */
	public [Symbol.iterator](): Generator<Keys<Flags>, void, unknown>

  /**
   * Combina todos os bits definidos em `Flags` em um único valor.
   */
	public static get ALL(): bigint

  /**
   * Resolve múltiplos valores de bits (bigint, string, array ou instância).
   */
	public static resolve<Flags extends FlagsRecord = FlagsRecord>(
    ...bit: Bit<Flags>[]
  ): bigint

  /**
   * Define o mapa de flags disponíveis na subclasse.
   */
	public static Flags: FlagsRecord

  /**
   * Define os bits padrão ao inicializar uma instância sem parâmetros.
   */
	public static defaulBits: bigint
}

export declare const bit: (flag: bigint | number) => bigint
declare export default Bitfield