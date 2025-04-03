import { MyOrgCreateInput, Org } from "@prisma/client";
import { OrgsRepository } from "../orgsRepository";
import { prisma } from "@/lib/prisma";
import { EnderecoCanNotBeNullError } from "@/services/errors/endereco-can-not-be-null-error";


export class PrismaOrgsRepository implements OrgsRepository{
    async findAllOrgsByCidade(cidade: string, page: number){
        const orgs = await prisma.org.findMany({
            where: {
                endereco: {
                    cidade
                }
            },
            take: 20,
            skip: (page - 1) * 20,
        })

        return orgs
    }
    async findById(id: string){
        const org = await prisma.org.findUnique({
            where: { id }
        })

        return org
    }
    async create(data: MyOrgCreateInput) {

        const {nome, email, whatsapp, password_hash, endereco} = data
        
        const org = await prisma.org.create({
            data: {
                nome,
                email,
                whatsapp,
                password_hash,
                endereco: {
                    create:endereco ? {
                        bairro: endereco.bairro,
                        cep: endereco.cep,
                        logradouro: endereco.logradouro,
                        numero: endereco.numero,
                        cidade: endereco.cidade,
                        estado: endereco.estado,
                    } : undefined
                }
            }
        })
        
        return org
    }
    async findByEmail(email: string){
        const org = await prisma.org.findUnique({
            where: { email }
        })

        return org
    }
    async findByWhatsapp(whatsapp: string){
        const org = await prisma.org.findUnique({
            where: { whatsapp }
        })

        return org
    }


}