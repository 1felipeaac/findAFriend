export class ValidacaoEnumError extends Error {
    constructor(valorInvalido: string) {
        super(`Valor inválido: ${valorInvalido}`);
        this.name = "ValidacaoEnumError";
    }
}