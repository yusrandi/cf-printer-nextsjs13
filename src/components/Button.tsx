import React from 'react'

interface ButtonProps {
    title: string
    handleClick: () => void
}
export default function Button({ title, handleClick }: ButtonProps) {
    return (
        <button
            onClick={handleClick}
            className="sm:flex text-white text-[13px] font-mono bg-black border hover:bg-white hover:text-black transition-all rounded-md px-10 py-2 duration-75 flex items-center justify-center whitespace-nowrap hover:border-gray-800"
            rel="noreferrer"
        >
            {title}
        </button>
    )
}
