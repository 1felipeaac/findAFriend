import { Prisma, $Enums, Pet } from "@prisma/client";
import { PetsRepository } from "../petsRepository";
import { randomUUID } from "node:crypto";

export class InMemoryPetsRepository implements PetsRepository{
    public items:Pet[] = []
    //@ts-ignore
    async create(data: Prisma.PetUncheckedCreateInput){
        const requisitos = Array.isArray(data.requisitos) ? data.requisitos : data.requisitos?.set || [];
        const pet = {
            id: randomUUID(),
            nome: data.nome,
            sobre: data.sobre,
            idade: data.idade,
            porte: data.porte, 
            energia: data.energia,
            independencia: data.independencia,
            ambiente: data.ambiente, 
            fotos: data.fotos, 
            especie: data.especie, 
            requisitos,
            org_id: data.org_id,
        }

        //@ts-ignore
        this.items.push(pet)

        return pet
    }
    async findById(id: string) {
        const pet = this.items.find(p => p.id === id)

        if (!pet) {
            return null
        }

        return pet
    }
    async findAll(){
        return this.items.map(p => p)
    }
    async findAllByIdade(idade: string, page: number){
        return this.items.filter((pet) => pet.idade.includes(idade))
            .slice((page - 1) * 20, page *20)
    }
    async findAllByEnergia(energia: string, page: number){
        return this.items.filter((pet) => pet.energia.includes(energia))
            .slice((page - 1) * 20, page *20)
    }
    async findAllByPorte(porte: string, page: number){
        return this.items.filter((pet) => pet.porte.includes(porte))
            .slice((page - 1) * 20, page *20)
    }
    async findAllByIndependencia(independencia: string, page: number): Promise<Pet[]> {
        return this.items.filter((pet) => pet.independencia.includes(independencia))
            .slice((page - 1) * 20, page *20)
    }

    async findAllByAmbiente(ambiente: string, page: number): Promise<Pet[]> {
        return this.items.filter((pet) => pet.ambiente.includes(ambiente))
        .slice((page - 1) * 20, page *20)    }

}