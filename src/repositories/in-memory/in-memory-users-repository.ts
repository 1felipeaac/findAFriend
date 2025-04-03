import { Prisma, $Enums, User } from "@prisma/client";
import { UsersRepository } from "../usersRepository";
import { randomUUID } from "crypto";

export class InMemoryUsersRepository implements UsersRepository{
    public items: User[] = [];
    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = {
            id: randomUUID(),
            nome: data.nome,
            email: data.email,
            password_hash: data.password_hash,
            role: $Enums.Role.CONSUMER
        }

        return user
    }
    async findById(user_id: string): Promise<User | null> {
        const user = this.items.find(item => item.id === user_id)

        if(!user) {
            throw new Error(`User ${user_id} not found`);
        }
        return user
    }
    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find(item => item.email === email)

        if(!user) {
            throw new Error(`User ${email} not found`);
        }
        return user
    }

}