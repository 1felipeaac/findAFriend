import { Endereco } from "@prisma/client";

export interface SearchByLogradouroAndNumero{
    logradouro: string,
    numero: string
}

export interface EnderecoRepository{
    findEnderecoByLogradouroAndNumero({logradouro, numero}:SearchByLogradouroAndNumero): Promise<Endereco | null>
}