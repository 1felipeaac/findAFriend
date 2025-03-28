import { prisma } from "@/lib/prisma";
import { OrgAlreadyExistsError } from "@/services/errors/org-already-existis-error";
import { makeRegisterService } from "@/services/factories/make-register-service";
import { hash } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register (request: FastifyRequest, reply: FastifyReply){
    const enderecoBodySchema = z.object({
        cep: z.string(),
        logradouro: z.string(),
        numero: z.string(),
        bairro: z.string(),
        cidade: z.string(),
        estado: z.enum([ 
            'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
            'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
            'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
        ])
    })
    const registerBodySchema = z.object({
        nome: z.string(),
        email: z.string(),
        endereco: enderecoBodySchema,
        whatsapp: z.string(),
        password: z.string().min(6),
    })


    const {
        nome, 
        email, 
        endereco,
        whatsapp,
        password
    } = registerBodySchema.parse(request.body);

    let org
       
    try {
        const registerOrg = makeRegisterService()

        org = await registerOrg.execute(
            {
                nome, 
                email,
                endereco, 
                whatsapp, 
                password
            }
        )
    } catch (error) {
        if(error instanceof OrgAlreadyExistsError){
            return reply.status(409).send({message: error.message})
        }
    }

    return reply.status(201).send(org)
}