import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-reposirory"
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository"
import { CreatePetService } from "../create-pet"
import { beforeEach, describe, it, expect } from "vitest"
import { Org } from "@prisma/client"
import { RegisterService } from "../register"
import { InMemoryEnderecosRepository } from "@/repositories/in-memory/in-memory-enderecos.repository"

let orgRepository: InMemoryOrgsRepository
let petRepository: InMemoryPetsRepository
let sut: CreatePetService

describe('CreatePetService', () => {

    let created_org: Org;

    beforeEach(async () => {
        orgRepository = new InMemoryOrgsRepository();
        petRepository = new InMemoryPetsRepository();
        //@ts-ignore
        sut = new CreatePetService(petRepository, orgRepository);

        // Criando uma organização antes do teste
        //@ts-ignore
        created_org = await orgRepository.create({
            nome: "org ltda.",
            email: "org@email.com",
            endereco: {
                cep: "65632-120",
                logradouro: "Rua D",
                numero: "3216",
                bairro: "Vila do Bec",
                cidade: "Timon",
                estado: "MA"
            },
            whatsapp: "00000000000",
            password_hash: "123456",
        });

        const test_org = await orgRepository.findById(created_org.id);
        

        console.log("teste org:"+ JSON.stringify(test_org));
    });

    it('Deve ser possível criar um Pet se a Org existir', async () => {



        const { pet } = await sut.execute({
            nome: "Nome",
            sobre: "sobre",
            ambiente: "AMPLO",
            energia: "ALTA",
            especie: "CACHORRO",
            fotos: "",
            idade: "FILHOTE",
            independencia: "BAIXA",
            porte: "MEDIO",
            requisitos: ["1", "2", "3", "4", "5", "6"],
            org_id: created_org.id,
        });

        expect(pet.id).toEqual(expect.any(String));
    });
});
