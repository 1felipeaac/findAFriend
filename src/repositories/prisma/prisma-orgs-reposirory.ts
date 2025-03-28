import { Prisma, $Enums, Org } from "@prisma/client";
import { OrgsRepository } from "../orgsRepository";
import { prisma } from "@/lib/prisma";


export class PrismaOrgsRepository implements OrgsRepository{
    async create(data: Prisma.OrgCreateInput) {

        const {nome, email, whatsapp, password_hash, endereco} = data

        const {cep, logradouro, numero, bairro, cidade, estado} = endereco
       
        const org = await prisma.org.create({
            data: {
                nome,
                email,
                whatsapp,
                password_hash,
                endereco:{
                    create:{
                        bairro,
                        cep,
                        logradouro,
                        numero,
                        cidade,
                        estado
                    }
                }
            },
            include:{
                endereco: true
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