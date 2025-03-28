import { Org, MyOrgCreateInput } from "@prisma/client";
import { OrgsRepository } from "../orgsRepository";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "node:crypto";

export class InMemoryOrgsRepository implements OrgsRepository{

    public items:Org[] = []
    async create(data: MyOrgCreateInput) {
        const org = {
            id: randomUUID(),
            email: data.email,
            endereco: data.endereco,
            whatsapp: data.whatsapp,
            password_hash: data.password_hash,
            created_at: new Date(),
        }

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


}