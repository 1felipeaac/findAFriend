import { Pet, Prisma } from "@prisma/client";

export interface FindByIdade{
    idade: string;
    page: number
}

export interface PetsRepository {
    create(data: Prisma.PetUncheckedCreateInput) : Promise<Pet>
    findById(id: string): Promise<Pet | null>
    findAll(page: number): Promise<Pet[]>
    findAllByIdade(idade: string, page: number): Promise<Pet[]>
    findAllByEnergia(energia: string, page: number): Promise<Pet[]>
    findAllByPorte(porte: string, page: number): Promise<Pet[]>
    findAllByIndependencia(independencia: string, page: number): Promise<Pet[]>
    // findAllByCidade(cidade: string, page: number): Promise<Pet[]>
    findAllByAmbiente(ambiente: string, page: number): Promise<Pet[]>
}