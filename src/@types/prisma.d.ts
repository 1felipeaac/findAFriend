import { Estados, Prisma } from "@prisma/client";

declare module "@prisma/client"{
    export interface OrgEnderecoCreateInput{
        cep: string;
        logradouro: string;
        numero: string;
        bairro: string;
        cidade: string;
        estado: Estados;
    }


    export interface MyOrgCreateInput extends Omit<Prisma.OrgCreateInput, "endereco">{
        endereco?: OrgEnderecoCreateInput
    }
}