import { OrgsRepository } from "@/repositories/orgsRepository";
import { PetsRepository } from "@/repositories/petsRepository";
import { Ambiente, Energia, Especie, Idade, Independencia, Pet, Porte } from "@prisma/client";

interface CreatePetServiceResponse {
    nome: string,
    sobre:         string,
    idade:         Idade,
    porte:         Porte,
    energia:       Energia,
    independencia: Independencia,
    ambiente:      Ambiente,
    fotos:         string,
    especie:       Especie,
    requisitos:    string[],
    org_id: string
  }


interface CreatePetServiceReponse {
    pet: Pet
}

export class CreatePetService {
    constructor(private petRepository: PetsRepository, private orgRepository: OrgsRepository){}

    async execute({
        nome,
        sobre,
        idade,
        porte, 
        energia,
        independencia,
        ambiente, 
        fotos, 
        especie, 
        requisitos,
        org_id
    }:CreatePetServiceResponse):Promise<CreatePetServiceReponse>{

        console.log("ID da organização recebida no execute:", org_id);
    // console.log("Lista de organizações no repositório:", this.orgRepository.items);

        const org = await this.orgRepository.findById(org_id)

        console.log("ORG: "+org)

        if(!org){
            throw new Error("Organização não encontrada")
        }

        const pet = await this.petRepository.create({
            nome,
            sobre,
            idade,
            porte, 
            energia,
            independencia,
            ambiente, 
            fotos, 
            especie, 
            requisitos,
            org_id})

        return {pet}
    }
}