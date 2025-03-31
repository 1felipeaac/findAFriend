import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-reposirory";
import { RegisterService } from "../register";
import { PrismaEnderecoRepository } from "@/repositories/prisma/prisma-enderecos-repository";
import { CreatePetService } from "../create-pet";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";

export function makeCreatePetRegisterService(){
    const orgRepository = new PrismaOrgsRepository()
    const petRepository = new PrismaPetsRepository()
    const service = new CreatePetService(petRepository, orgRepository)

    return service
}