import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-reposirory'
import { describe, beforeEach, it, expect } from 'vitest'
import { RegisterService } from '../register'
import { compare } from 'bcryptjs'
import { OrgAlreadyExistsError } from '../errors/org-already-existis-error'

let orgRepository: InMemoryOrgsRepository
let sut: RegisterService

describe('RegisterService', () => {
    beforeEach(() =>{
        orgRepository = new InMemoryOrgsRepository()
        sut = new RegisterService(orgRepository)
        
    })
    it('Deve ser Possível Registar uma Organização', async () =>{
        const {org} = await sut.execute({
            nome:"org ltda.",
            email:"org@email.com",
            endereco:{
                cep:"65632-120",
                logradouro:"Rua D",
                numero:"3216",
                bairro:"Vila do Bec",
                cidade:"Timon",
                estado:"MA"
            },
            whatsapp:"00000000000",
            password:"123456"
        })

        expect(org.id).toEqual(expect.any(String))
    })

    it('Deve ser possível criptografar a senha', async ()=>{
        const {org} = await sut.execute({
            nome:"org ltda.",
            email:"org@email.com",
            endereco:{
                cep:"65632-120",
                logradouro:"Rua D",
                numero:"3216",
                bairro:"Vila do Bec",
                cidade:"Timon",
                estado:"MA"
            },
            whatsapp:"00000000000",
            password:"123456"
        }) 

        const isPasswordCorrectlyHashed = await compare("123456", org.password_hash)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('Não deve ser possível registar duas empresas com o mesmo email', async ()=>{
       
        await sut.execute({
            nome:"org ltda.",
            email: "org@email.com",
            endereco:{
                cep:"65632-120",
                logradouro:"Rua D",
                numero:"3216",
                bairro:"Vila do Bec",
                cidade:"Timon",
                estado:"MA"
            },
            whatsapp:"00000000000",
            password:"123456"
        })

        await expect(() =>
            sut.execute({
                nome:"org ltda.",
                email:"org@email.com",
                endereco:{
                    cep:"65632-120",
                    logradouro:"Rua D",
                    numero:"3216",
                    bairro:"Vila do Bec",
                    cidade:"Timon",
                    estado:"MA"
                },
                whatsapp:"00000000001",
                password:"123456"
            })
        ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
    })

    it('Não deve ser possível registar duas empresas com o mesmo whatsapp', async ()=>{
       
        await sut.execute({
            nome:"org ltda.",
            email: "org1@email.com",
            endereco:{
                cep:"65632-120",
                logradouro:"Rua D",
                numero:"3216",
                bairro:"Vila do Bec",
                cidade:"Timon",
                estado:"MA"
            },
            whatsapp:"00000000000",
            password:"123456"
        })

        await expect(() =>
            sut.execute({
                nome:"org ltda.",
                email:"org2@email.com",
                endereco:{
                    cep:"65632-120",
                    logradouro:"Rua D",
                    numero:"3216",
                    bairro:"Vila do Bec",
                    cidade:"Timon",
                    estado:"MA"
                },
                whatsapp:"00000000000",
                password:"123456"
            })
        ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
    })
})