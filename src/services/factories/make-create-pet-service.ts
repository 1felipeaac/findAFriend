import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-reposirory";
import { RegisterService } from "../register";

export function makeCreatePetRegisterService(){
    const repository = new PrismaOrgsRepository()
    const service = new RegisterService(repository)

    return service
}