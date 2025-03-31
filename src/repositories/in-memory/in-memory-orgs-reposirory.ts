import { Org, MyOrgCreateInput } from "@prisma/client";
import { OrgsRepository } from "../orgsRepository";
import { randomUUID } from "node:crypto";

export class InMemoryOrgsRepository implements OrgsRepository{

    public items:Org[] = []
    //@ts-ignore
    async create(data: MyOrgCreateInput) {
        const org = {
            id: randomUUID(),
            nome: data.nome,
            email: data.email,
            endereco: data.endereco,
            whatsapp: data.whatsapp,
            password_hash: data.password_hash,
            created_at: new Date(),
            role: 'ORG'

        }

        //@ts-ignore
        this.items.push(org);

        return org
    }
    async findByEmail(email: string){
        const org = this.items.find(item => item.email === email)

        if(!org){
            return null
        }

        return org
    }
    async findByWhatsapp(whatsapp: string){
        const org = this.items.find(item => item.whatsapp === whatsapp)

        if(!org){
            return null
        }

        return org
    }

    async findById(org_id: string){

        const org = this.items.find(item => item.id === org_id)

        if(!org){
            return null
        }

        return org
    }


}