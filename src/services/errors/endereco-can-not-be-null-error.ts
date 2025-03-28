export class EnderecoCanNotBeNullError extends Error{
    constructor(){
        super("Endereço é obrigatório!")
    }
}