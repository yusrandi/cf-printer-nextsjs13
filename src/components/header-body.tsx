'use client'
import React from 'react'
import Search from './search'

interface ButtonProps {
    title: string
    handleClick: () => void
}

export default function HeaderBody({ title, handleClick }: ButtonProps) {
    return (
        <>
            <div className="sm:mt-6 hidden sm:flex sm:start sm:space-x-2 justify-between">

                <Search />
                <button
                    onClick={handleClick}
                    className="text-white text-[13px] font-mono bg-black border hover:bg-white hover:text-black transition-all rounded-md px-10 py-2 duration-75 flex items-center justify-center whitespace-nowrap hover:border-gray-800"
                >
                    {title}
                </button>
            </div>
            <div className="mt-6 sm:hidden space-y-2 sm:space-y-0">
                <Search />

                <button
                    onClick={handleClick}
                    className="w-full text-white text-[13px] font-mono bg-black border hover:bg-white hover:text-black transition-all rounded-md px-10 py-2 duration-75 flex items-center justify-center whitespace-nowrap hover:border-gray-800 "
                >
                    {title}
                </button>
            </div>
        </>
    )
}
