import { OrgsRepository } from "@/repositories/orgsRepository";
import { Estados, MyOrgCreateInput } from "@prisma/client";
import { hash } from "bcryptjs";
import { OrgAlreadyExistsError } from "./errors/org-already-existis-error";
import { EnderecoRepository } from "@/repositories/enderecoRepository";
import { EnderecoAlreadyExistsError } from "./errors/endereco-already-existis-error";

interface RegisterServiceRequest{
    nome: string,
    email: string,
    endereco: EnderecoRequest,
    whatsapp: string,
    password: string,
}

interface EnderecoRequest{
    bairro: string,
    cep: string,
    logradouro: string,
    numero: string,
    cidade: string,
    estado: Estados
}

interface RegisterServiceResponse{
    org: MyOrgCreateInput
}

interface OrgsByCidadeResponse {
    orgs: MyOrgCreateInput[]
}

export class RegisterService{

    constructor(private orgsRepository: OrgsRepository, private enderecoRepository: EnderecoRepository){}

    async execute({
        nome,
        email,
        endereco,
        whatsapp,
        password,
    }:RegisterServiceRequest):Promise<RegisterServiceResponse>{
        const password_hash = await hash(password, 6)
        const orgWithSameEmail = await this.orgsRepository.findByEmail(email)
        const orgWithSameWhatsapp = await this.orgsRepository.findByWhatsapp(whatsapp)
        const enderecoWithSameLogradouroAndNUmero = await this.enderecoRepository
            .findEnderecoByLogradouroAndNumero({logradouro: endereco.logradouro, numero: endereco.numero})


        if(orgWithSameEmail || orgWithSameWhatsapp){
            throw new OrgAlreadyExistsError()
        }

        if(enderecoWithSameLogradouroAndNUmero){
            throw new EnderecoAlreadyExistsError()
        }

        const org = await this.orgsRepository.create({nome, email, endereco, whatsapp, password_hash})

        return {org}
    }

    async findAllOrgsByCidade(cidade: string, page: number): Promise<OrgsByCidadeResponse>{

        const orgs = await this.orgsRepository.findAllOrgsByCidade(cidade, page)

        return {orgs}
    }

}