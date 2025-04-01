import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-reposirory"
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository"
import { PetService } from "../pet-service"
import { beforeEach, describe, it, expect } from "vitest"
import { Org } from "@prisma/client"
import { RegisterService } from "../register"
import { InMemoryEnderecosRepository } from "@/repositories/in-memory/in-memory-enderecos.repository"

let orgRepository: InMemoryOrgsRepository
let petRepository: InMemoryPetsRepository
let sut: PetService

describe('CreatePetService', () => {

    let created_org: Org;

    beforeEach(async () => {
        orgRepository = new InMemoryOrgsRepository();
        petRepository = new InMemoryPetsRepository();
        //@ts-ignore
        sut = new PetService(petRepository, orgRepository);

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

    it('Deve ser possível listar todos os Pets', async () => {
        for(let i = 0; i < 22; i++) {
            await petRepository.create({
                nome: `Pet ${i}`,
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
            })
        }

        const {pets} = await sut.findAll(2)

        expect(pets).toHaveLength(2)

        expect(pets).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ nome: "Pet 20" }),
                expect.objectContaining({ nome: "Pet 21" }),
            ]))
    })

    it('Deve ser possível listar os Pets por idade',async () => {
        for(let i = 0; i < 22; i++) {

            if(i < 12){
                await petRepository.create({
                    nome: `Pet ${i}`,
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
                })
            }else if(i < 18){
                await petRepository.create({
                    nome: `Pet ${i}`,
                    sobre: "sobre",
                    ambiente: "AMPLO",
                    energia: "ALTA",
                    especie: "CACHORRO",
                    fotos: "",
                    idade: "ADULTO",
                    independencia: "BAIXA",
                    porte: "MEDIO",
                    requisitos: ["1", "2", "3", "4", "5", "6"],
                    org_id: created_org.id,
                })
            }else{
                await petRepository.create({
                    nome: `Pet ${i}`,
                    sobre: "sobre",
                    ambiente: "AMPLO",
                    energia: "ALTA",
                    especie: "CACHORRO",
                    fotos: "",
                    idade: "IDOSO",
                    independencia: "BAIXA",
                    porte: "MEDIO",
                    requisitos: ["1", "2", "3", "4", "5", "6"],
                    org_id: created_org.id,
                })
            }
        }

        const {pets} = await sut.findAllByIdade('ADULTO', 0)

        console.log(pets)
    })
});
