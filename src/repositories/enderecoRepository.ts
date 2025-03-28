import { Endereco, Prisma } from "@prisma/client";

export interface EnderecoRepository{
    create(data: Prisma.OrgCreateInput) : Promise<Endereco>
}