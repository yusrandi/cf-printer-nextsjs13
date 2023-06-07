'use client'

import { signIn, signOut, useSession } from "next-auth/react"

export default function SignInButton() {
    const { data: session } = useSession();
    console.log(session?.user);


    if (session && session.user) {
        return (
            <div className="flex gap-4 ml-auto">
                <p className="text-sky-600">{session.user.name}</p>
                <button onClick={() => signOut()} className="text-red-600">
                    Sign Out
                </button>
            </div>
        )
    }

    return (
        <button onClick={() => signIn()} className="text-blue-700 ml-auto" >Sign In</button>
    )
}
