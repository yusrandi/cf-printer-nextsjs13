import prisma from "@/lib/prisma"
import * as bcrypt from 'bcrypt'
import { Role } from "prisma/prisma-client";


interface RequestBody{
    name: string;
    email: string;
    password: string;
    role: string;
}
export async function POST(request:Request) {

    const body: RequestBody = await request.json();

    const userExist = await prisma.user.findFirst({
        where:{
            email: body.email
        }
    })

    
    if (userExist) return new Response(JSON.stringify({
            id: 0,
            name: "Email telah tersedia",
            email: "",
            role: "",
            password: "",

    }))

    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            role: body.role as Role,
            password: await bcrypt.hash(body.password, 10),
        }
    })

    const {password, createdAt,updatedAt, ...result} = user
    return new Response(JSON.stringify(result))
}