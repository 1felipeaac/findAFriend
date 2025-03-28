export class EnderecoAlreadyExistsError extends Error{
    constructor(){
        super("Endereco já existe!")
    }
}