import { makeCreatePetRegisterService } from "@/services/factories/make-create-pet-service";
import { Idade } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createPet(request: FastifyRequest, reply: FastifyReply){
    const petBodySchema = z.object({
        nome: z.string(),
        sobre: z.string(),
        idade: z.enum(['FILHOTE', 'ADULTO', 'IDOSO']),
        porte: z.enum(['PEQUENINO','MEDIO','GRANDE']), 
        energia: z.enum(['BAIXA','ALTA']),
        independencia: z.enum(['BAIXA','MEDIA','ALTA']),
        ambiente: z.enum(['RESTRITO','AMPLO']), 
        fotos: z.string(), 
        especie: z.enum(['GATO','CACHORRO']), 
        requisitos: z.array(z.string()),
        org_id: z.string(),
    })

    
    try {
        const {nome,
            sobre,
            idade,
            porte, 
            energia,
            independencia,
            ambiente, 
            fotos, 
            especie, 
            requisitos,
            org_id} = petBodySchema.parse(request.body)
            
        const petService = makeCreatePetRegisterService()
        const pet = await petService.execute(
            {
                nome,
                sobre,
                idade,
                porte, 
                energia,
                independencia,
                ambiente, 
                fotos, 
                especie, 
                requisitos,
                org_id
            })
        return reply.status(201).send({pet})
    } catch (error) {
        if(error instanceof z.ZodError){

            return reply.status(400).send({
                message: "Erro de Validação",
                errors: error.errors
            })
        }

        return reply.status(400).send({message: error})
    }
}

export async function findPetByCidade(request: FastifyRequest, reply: FastifyReply){

    const cidadeQuerySchema = z.object({
        cidade: z.string()
    })

    try {
        const {cidade} = cidadeQuerySchema.parse(request.query)

        const petService = makeCreatePetRegisterService()

        const {pets} = await petService.findAllByCidade(cidade, 1)

        return reply.status(200).send({pets})
    } catch (error) {
        return reply.status(400).send({message: error})
    }
}