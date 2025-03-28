import { Endereco } from "@prisma/client";
import { EnderecoRepository, SearchByLogradouroAndNumero } from "../enderecoRepository";

export class InMemoryEnderecosRepository implements EnderecoRepository{
    items:Endereco[] = [];
    async findEnderecoByLogradouroAndNumero({ logradouro, numero }: SearchByLogradouroAndNumero) {
        const endereco = this.items.find(item => item.logradouro === logradouro && item.numero === numero)

        if(!endereco){
            return null;
        }

        return endereco
    }

}