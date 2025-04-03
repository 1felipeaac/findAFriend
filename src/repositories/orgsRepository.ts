import { MyOrgCreateInput, Org } from "@prisma/client";


export interface OrgsRepository {
    create(data: MyOrgCreateInput) : Promise<MyOrgCreateInput>
    findById(org_id: string) : Promise<MyOrgCreateInput | null>
    findByEmail(email: string): Promise<MyOrgCreateInput | null>
    findByWhatsapp(whatsapp: string): Promise<MyOrgCreateInput | null>
    findAllOrgsByCidade(cidade: string, page: number): Promise<MyOrgCreateInput[]>
}