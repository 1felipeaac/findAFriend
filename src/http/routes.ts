import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { createPet, findPetByCidade } from "./controllers/pet-controller";
import { verifyJWT } from "./hooks/verify-jwt";

export async function appRoutes(app: FastifyInstance){
    app.post('/orgs', register)
    app.post('/pets', {onRequest: [verifyJWT]}, createPet)
    app.get('/pets/cidade', findPetByCidade)
}