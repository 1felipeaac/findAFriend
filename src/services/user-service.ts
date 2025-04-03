import { hash } from "bcryptjs"
import {User} from '@prisma/client'
import { UsersRepository } from "@/repositories/usersRepository"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"

interface UserServiceRequest{
    nome: string,
    email: string
    password: string
}

interface UserServiceResponse{
    user: User
}
export class UserService{

    constructor(private usersRepository: UsersRepository){}

    async execute({
        nome,
        email,
        password,
    }:UserServiceRequest):Promise<UserServiceResponse>{
        const password_hash = await hash(password, 6)
        const userWithSameEmail = await this.usersRepository.findByEmail(email)
        const user = await this.usersRepository.create({nome, email, password_hash})

        if (userWithSameEmail){
            throw new UserAlreadyExistsError()
        }

        return {user}
    }


}