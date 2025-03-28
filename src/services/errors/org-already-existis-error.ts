export class OrgAlreadyExistsError extends Error{
    constructor(){
        super("Email/Whatsapp já existe!")
    }
}