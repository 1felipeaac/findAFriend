import { MyOrgCreateInput, Org } from "@prisma/client";


export interface OrgsRepository {
    create(data: MyOrgCreateInput) : Promise<Org>
    findById(id: string) : Promise<Org | null>
    findByEmail(email: string): Promise<Org | null>
    findByWhatsapp(whatsapp: string): Promise<Org | null>
}