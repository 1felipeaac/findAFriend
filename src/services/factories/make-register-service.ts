import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-reposirory";
import { RegisterService } from "../org-service";
import { PrismaEnderecoRepository } from "@/repositories/prisma/prisma-enderecos-repository";

export function makeRegisterService(){
    const repository = new PrismaOrgsRepository()
    const enderecoRepository = new PrismaEnderecoRepository()
    const service = new RegisterService(repository, enderecoRepository)

    return service
}