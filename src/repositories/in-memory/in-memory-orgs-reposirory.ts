import { Org, MyOrgCreateInput, $Enums } from "@prisma/client";
import { OrgsRepository } from "../orgsRepository";
import { randomUUID } from "node:crypto";

export class InMemoryOrgsRepository implements OrgsRepository{

    public items:MyOrgCreateInput[] = []
 
    async create(data: MyOrgCreateInput) {
        const org = {
            id: randomUUID(),
            nome: data.nome,
            email: data.email,
            endereco: data.endereco,
            whatsapp: data.whatsapp,
            password_hash: data.password_hash,
            created_at: new Date(),
            role: $Enums.Role.ORG

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

    async findById(org_id: string){

        const org = this.items.find(item => item.id === org_id)

        if(!org){
            return null
        }

        return org
    }

    async findAllOrgsByCidade(cidade: string, page: number){

        // console.log("findAllOrgsByCidade: "+cidade)

        const orgs = this.items.filter(item =>{ 
            if (!item.endereco){
                throw new Error(`Cidade ${cidade} not found`)
            }
            // console.log("filter: "+ item.endereco.cidade)
            
            const mesmaCidade = item.endereco.cidade === cidade
            // console.log(item.endereco.cidade === cidade)

            return mesmaCidade
        }).slice((page - 1) * 20, page * 20);

        return orgs
    }


}