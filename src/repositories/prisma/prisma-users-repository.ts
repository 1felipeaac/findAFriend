import { Prisma, $Enums, User } from "@prisma/client";
import { UsersRepository } from "../usersRepository";
import { prisma } from "@/lib/prisma";

export class PrismaUsersRepository implements UsersRepository{
    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = await prisma.user.create({data})

        return user
    }
    async findById(user_id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where:{
                id: user_id
            }
        })

        return user
    }
    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })

        return user
    }

}