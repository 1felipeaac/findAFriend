import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-reposirory'
import { describe, beforeEach, it, expect } from 'vitest'
import { RegisterService } from '../org-service'
import { compare } from 'bcryptjs'
import { OrgAlreadyExistsError } from '../errors/org-already-existis-error'
import { InMemoryEnderecosRepository } from '@/repositories/in-memory/in-memory-enderecos-repository'

let orgRepository: InMemoryOrgsRepository
let enderRepository: InMemoryEnderecosRepository
let sut: RegisterService

describe('RegisterService', () => {
    beforeEach(() =>{
        orgRepository = new InMemoryOrgsRepository()
        enderRepository = new InMemoryEnderecosRepository()
        //@ts-ignore
        sut = new RegisterService(orgRepository, enderRepository)
        
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

    it('Não deve ser possível registar duas Organizações com o mesmo email', async ()=>{
       
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

    it('Não deve ser possível registar duas Organizações com o mesmo whatsapp', async ()=>{
       
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

    it('Deve ser possível listar todas as Organizações por cidade', async ()=>{
       for(let i = 0; i < 4; i++){
           await sut.execute({
               nome:`org${i} ltda.`,
               email: `org${i}@email.com`,
               endereco:{
                   cep:"65632-120",
                   logradouro:`Rua ${i}`,
                   numero:`000${i}`,
                   bairro:"Bairro",
                   cidade:"Timon",
                   estado:"MA"
               },
               whatsapp:`0000000000${i}`,
               password:"123456"
           })
       }

       await sut.execute({
        nome:"org ltda.",
        email:"org@email.com",
        endereco:{
            cep:"65632-120",
            logradouro:"Rua 9",
            numero:"0009",
            bairro:"Bairro",
            cidade:"Teresina",
            estado:"PI"
        },
        whatsapp:"00000000009",
        password:"123456"
    })

    const {orgs} = await sut.findAllOrgsByCidade('Timon', 1)

    expect(orgs).toHaveLength(4)
    expect(orgs).toEqual(expect.arrayContaining([
        expect.objectContaining({ nome: "org2 ltda." }),
        expect.objectContaining({ nome: "org3 ltda." }),
    ]))
    })

})