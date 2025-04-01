import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-reposirory";
import { PetService } from "../pet-service";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";

export function makeCreatePetRegisterService(){
    const orgRepository = new PrismaOrgsRepository()
    const petRepository = new PrismaPetsRepository()
    const service = new PetService(petRepository, orgRepository)

    return service
}