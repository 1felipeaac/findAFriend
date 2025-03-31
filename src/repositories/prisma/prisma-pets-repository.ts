import { Prisma, $Enums, Pet } from "@prisma/client";
import { PetsRepository } from "../petsRepository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRepository implements PetsRepository{
    async create(data: Prisma.PetUncheckedCreateInput){
        // const {nome, sobre, ambiente, energia, especie, fotos, idade, independencia, porte, requisitos, org_id} = data

        const pet = prisma.pet.create({
            data
        })

        return pet
    }
    findById(id: string): Promise<Pet | null> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Pet[] | null> {
        throw new Error("Method not implemented.");
    }

}