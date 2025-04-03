import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { createPet, findPetByCidade } from "./controllers/pet-controller";

export async function appRoutes(app: FastifyInstance){
    app.post('/orgs', register)
    app.post('/pets', createPet)
    app.get('/pets/cidade', findPetByCidade)
}