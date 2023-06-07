import Image from 'next/image'
import React from 'react'

export default function Logo() {
    return (
        <Image
            src="/logo.png"
            alt="Precedent Logo"
            className="h-10 w-10 rounded-full"
            width={20}
            height={20}
        />
    )
}
