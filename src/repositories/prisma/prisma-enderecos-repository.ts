import { Prisma, Endereco } from "@prisma/client";
import { EnderecoRepository, SearchByLogradouroAndNumero } from "../enderecoRepository";
import { prisma } from "@/lib/prisma";

export class PrismaEnderecoRepository implements EnderecoRepository{

    async findEnderecoByLogradouroAndNumero({ logradouro, numero }: SearchByLogradouroAndNumero) {
        const endereco = await prisma.endereco.findFirst({
            where: {
                logradouro,
                numero
            }
        })

        return endereco
    }

}