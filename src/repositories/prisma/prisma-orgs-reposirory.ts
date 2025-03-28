import { MyOrgCreateInput, Org } from "@prisma/client";
import { OrgsRepository } from "../orgsRepository";
import { prisma } from "@/lib/prisma";
import { EnderecoCanNotBeNullError } from "@/services/errors/endereco-can-not-be-null-error";


export class PrismaOrgsRepository implements OrgsRepository{
    async findById(id: string): Promise<Org | null> {
        const org = await prisma.org.findUnique({
            where: { id }
        })

        return org
    }
    async create(data: MyOrgCreateInput) {

        const {nome, email, whatsapp, password_hash, endereco} = data

        if(!endereco){
            throw new EnderecoCanNotBeNullError()
        }

        const { cep, logradouro, numero, bairro, cidade, estado } = endereco;
    
        const org = await prisma.org.create({
            data: {
                nome,
                email,
                whatsapp,
                password_hash,
                endereco: {
                    create:{
                        bairro,
                        cep,
                        logradouro,
                        numero,
                        cidade,
                        estado
                    }
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