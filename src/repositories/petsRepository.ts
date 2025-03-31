import { Pet, Prisma } from "@prisma/client";


export interface PetsRepository {
    create(data: Prisma.PetUncheckedCreateInput) : Promise<Pet>
    findById(id: string): Promise<Pet | null>
    findAll(): Promise<Pet[] | null>
    // findAllByIdade(idade: string, page: number): Promise<Pet[] | null>
    // findAllByEnergia(energia: string, page: number): Promise<Pet[] | null>
    // findAllByPorte(porte: string, page: number): Promise<Pet[] | null>
    // findAllByIndependencia(independencia: string, page: number): Promise<Pet[] | null>
    // // findAllByCidade(cidade: string, page: number): Promise<Pet[] | null>
    // findAllByAmbiente(ambiente: string, page: number): Promise<Pet[] | null>
}