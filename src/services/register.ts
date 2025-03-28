import { OrgsRepository } from "@/repositories/orgsRepository";
import { Org } from "@prisma/client";
import { hash } from "bcryptjs";
import { OrgAlreadyExistsError } from "./errors/org-already-existis-error";

interface RegisterServiceRequest{
    nome: string,
    email: string,
    endereco: object,
    whatsapp: string,
    password: string,
}

interface RegisterServiceResponse{
    org: Org
}

export class RegisterService{

    constructor(private orgsRepository: OrgsRepository){}

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


        if(orgWithSameEmail || orgWithSameWhatsapp){
            throw new OrgAlreadyExistsError()
        }

        const org = await this.orgsRepository.create({nome, email, endereco, whatsapp, password_hash})

        return {org}
    }

}