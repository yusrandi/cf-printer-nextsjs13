import React, { SyntheticEvent } from 'react'
import { LoadingDots } from './shared/icons'

interface ButtonProps {
    title: string
    submitClicked: boolean
    handleClick: (e: SyntheticEvent) => void
}
export default function ButtonSubmit({ title, handleClick, submitClicked }: ButtonProps) {
    return (
        <button
            disabled={submitClicked}
            className={`${submitClicked
                ? "cursor-not-allowed border-gray-200 bg-gray-100 hover:border-gray-800"
                : "border bg-black text-white font-mono hover:bg-gray-50 hover:border-gray-800 hover:text-black transition-all"
                } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
            onClick={handleClick}
        >
            {submitClicked ? (
                <LoadingDots color="#000" />
            ) : (
                <>
                    <p>{title}</p>
                </>
            )}
        </button>
    )
}
