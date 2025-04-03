import { OrgsRepository } from "@/repositories/orgsRepository";
import { PetsRepository } from "@/repositories/petsRepository";
import { $Enums, Ambiente, Energia, Especie, Idade, Independencia, Pet, Porte } from "@prisma/client";
import { ValidacaoEnumError } from "./errors/validacao-enum-error";

interface PetServiceRequest {
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


interface PetServiceReponse {
    pet: Pet
}

interface PetServiceListReponse {
    pets: Pet[]
}

export class PetService {
    constructor(
        private petRepository: PetsRepository, 
        private orgRepository: OrgsRepository
    ){}

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
    }:PetServiceRequest):Promise<PetServiceReponse>{

        const org = await this.orgRepository.findById(org_id)

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

    async findAll(page: number):Promise<PetServiceListReponse>{

        const pets = await this.petRepository.findAll(page)

        return {pets}

    }

    async findAllByIdade(idade: string, page: number): Promise<PetServiceListReponse>{

        if(!Object.values($Enums.Idade).includes(idade as $Enums.Idade)){
            throw new ValidacaoEnumError(idade)
        }

        const pets = await this.petRepository.findAllByIdade(idade, page);

        return {pets}
    }

    async findAllByEnergia(energia: string, page: number): Promise<PetServiceListReponse>{

        if(!Object.values($Enums.Energia).includes(energia as $Enums.Energia)){
            throw new ValidacaoEnumError(energia)
        }

        const pets = await this.petRepository.findAllByEnergia(energia, page);

        return {pets}
    }

    async findAllByIndependencia(independencia: string, page: number): Promise<PetServiceListReponse>{

        if(!Object.values($Enums.Independencia).includes(independencia as $Enums.Independencia)){
            throw new ValidacaoEnumError(independencia)
        }

        const pets = await this.petRepository.findAllByIndependencia(independencia, page);

        return {pets}
    }

    async findAllByPorte(porte: string, page: number): Promise<PetServiceListReponse>{

        if(!Object.values($Enums.Porte).includes(porte as $Enums.Porte)){
            throw new ValidacaoEnumError(porte)
        }

        const pets = await this.petRepository.findAllByPorte(porte, page);

        return {pets}
    }

    async findAllByAmbiente(ambiente: string, page: number): Promise<PetServiceListReponse>{

        if(!Object.values($Enums.Ambiente).includes(ambiente as $Enums.Ambiente)){
            throw new ValidacaoEnumError(ambiente)
        }

        const pets = await this.petRepository.findAllByAmbiente(ambiente, page);

        return {pets}
    }

    async findAllByCidade(cidade: string, page: number): Promise<PetServiceListReponse>{

        const pets = await this.petRepository.findAllByCidade(cidade, page);

        return {pets}
    }
}