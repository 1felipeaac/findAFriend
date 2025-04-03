import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-reposirory"
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository"
import { PetService } from "../pet-service"
import { beforeEach, describe, it, expect } from "vitest"
import { Org } from "@prisma/client"


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
                cep: "00000-000",
                logradouro: "Rua 1",
                numero: "0000",
                bairro: "Bairro",
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

        const {pets} = await sut.findAllByIdade('ADULTO', 1)

        // console.log(pets)

        expect(pets).toHaveLength(6)
        expect(pets).toEqual(expect.arrayContaining([
            expect.objectContaining({ nome: "Pet 12" }),
            expect.objectContaining({ nome: "Pet 13" }),
        ]))
    })
    it('Deve ser possível listar os Pets por Energia',async () => {
        for(let i = 0; i < 22; i++) {

            if(i % 2 === 0){
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
            
            }else{
                await petRepository.create({
                    nome: `Pet ${i}`,
                    sobre: "sobre",
                    ambiente: "AMPLO",
                    energia: "BAIXA",
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

        const {pets} = await sut.findAllByEnergia('ALTA', 1)


        expect(pets).toHaveLength(11)
        expect(pets).toEqual(expect.arrayContaining([
            expect.objectContaining({ nome: "Pet 10" }),
            expect.objectContaining({ nome: "Pet 12" }),
        ]))
    })
     it('Deve ser possível listar os Pets por Independencia',async () => {
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
                    independencia: "MEDIA",
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
                    independencia: "ALTA",
                    porte: "MEDIO",
                    requisitos: ["1", "2", "3", "4", "5", "6"],
                    org_id: created_org.id,
                })
            }
        }

        const {pets} = await sut.findAllByIndependencia('ALTA', 1)

        // console.log(pets)

        expect(pets).toHaveLength(4)
        expect(pets).toEqual(expect.arrayContaining([
            expect.objectContaining({ nome: "Pet 20" }),
            expect.objectContaining({ nome: "Pet 21" }),
        ]))
    })
    it('Deve ser possível listar os Pets por Porte',async () => {
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
                    porte: "PEQUENINO",
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
                    porte: "GRANDE",
                    requisitos: ["1", "2", "3", "4", "5", "6"],
                    org_id: created_org.id,
                })
            }
        }

        const {pets} = await sut.findAllByPorte('PEQUENINO', 1)

        // console.log(pets)

        expect(pets).toHaveLength(12)
        expect(pets).toEqual(expect.arrayContaining([
            expect.objectContaining({ nome: "Pet 10" }),
            expect.objectContaining({ nome: "Pet 11" }),
        ]))
    })
    it('Deve ser possível listar os Pets por Ambiente',async () => {
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
                    porte: "PEQUENINO",
                    requisitos: ["1", "2", "3", "4", "5", "6"],
                    org_id: created_org.id,
                })
            }else{
                await petRepository.create({
                    nome: `Pet ${i}`,
                    sobre: "sobre",
                    ambiente: "RESTRITO",
                    energia: "ALTA",
                    especie: "CACHORRO",
                    fotos: "",
                    idade: "IDOSO",
                    independencia: "BAIXA",
                    porte: "GRANDE",
                    requisitos: ["1", "2", "3", "4", "5", "6"],
                    org_id: created_org.id,
                })
            }
        }

        const {pets} = await sut.findAllByAmbiente('RESTRITO', 1)

        // console.log(pets)

        expect(pets).toHaveLength(10)
        expect(pets).toEqual(expect.arrayContaining([
            expect.objectContaining({ nome: "Pet 20" }),
            expect.objectContaining({ nome: "Pet 21" }),
        ]))
    })
});
