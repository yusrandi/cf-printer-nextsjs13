import { User } from "prisma/prisma-client";

export const UserService = {
    async getData() {
        return await fetch('/api/user', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json());
    },
    async createData(user: User) {
        return await fetch('/api/user',
            {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json'

                },
                method: 'POST',
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    role: user.role,
                }),
            }

        )
            .then((res) => res.json());
    },
    async updateData(user: User) {
        return await fetch(`/api/user/${user.id}`,
            {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json'

                },
                method: 'PATCH',
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    role: user.role,
                }),
            }

        )
            .then((res) => res.json());
    },

    async deleteData(user: User) {
        return await fetch(`/api/user/${user.id}`,
            {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json'

                },
                method: 'DELETE'
            }

        )
            .then((res) => res.json());
    },
    
}