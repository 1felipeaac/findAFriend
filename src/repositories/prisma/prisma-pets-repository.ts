import { Prisma, $Enums, Pet } from "@prisma/client";
import { FindByIdade, PetsRepository } from "../petsRepository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRepository implements PetsRepository{
    async findAllByIdade(idade: string, page: number){
        const pets = await prisma.pet.findMany({
            where: {
                idade: idade as $Enums.Idade
            },
            take: 20,
            skip: (page - 1) * 20
        })

        return pets
    }
    async findAllByEnergia(energia: string, page: number){
        const pets = await prisma.pet.findMany({
            where: {
                energia: energia as $Enums.Energia
            },
            take: 20,
            skip: (page - 1) * 20
        })

        return pets
    }
    async findAllByPorte(porte: string, page: number){
        const pets = await prisma.pet.findMany({
            where: {
                porte: porte as $Enums.Porte
            },
            take: 20,
            skip: (page - 1) * 20
        })

        return pets
    }
    async findAllByIndependencia(independencia: string, page: number){
        const pets = await prisma.pet.findMany({
            where: {
                independencia: independencia as $Enums.Independencia
            },
            take: 20,
            skip: (page - 1) * 20
        })

        return pets
    }
    async findAllByAmbiente(ambiente: string, page: number){
        const pets = await prisma.pet.findMany({
            where: {
                ambiente: ambiente as $Enums.Ambiente
            },
            take: 20,
            skip: (page - 1) * 20
        })

        return pets
    }
    async create(data: Prisma.PetUncheckedCreateInput){

        const pet = await prisma.pet.create({
            data
        })

        return pet
    }
    async findById(id: string): Promise<Pet | null> {
        const pet = await prisma.pet.findUnique({
            where:{
                id
            }
        })

        return pet
    }
    async findAll(page: number){
        const pets = await prisma.pet.findMany({
            take: 20,
            skip: (page - 1) * 20
        })

        return pets
    }

}