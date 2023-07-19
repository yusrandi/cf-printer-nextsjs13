'use client'
import React, { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Modal from '@/components/shared/modal'
import Logo from '@/components/Logo'
import ButtonSubmit from '@/components/ButtonSubmit'
import { User } from 'prisma/prisma-client'
interface Props {
    showModal: boolean
    setShowModal: Dispatch<SetStateAction<boolean>>
    user: User
    handleSubmit: (e: SyntheticEvent) => void
    submitClicked: boolean;
}
export default function UserModalDelete({ showModal, setShowModal, user, handleSubmit, submitClicked }: Props) {

    return (
        <Modal showModal={showModal} setShowModal={setShowModal} isCenter>
            <div className="w-full bg-white overflow-hidden md:max-w-md md:rounded-2xl md:border md:border-gray-100 md:shadow-xl">
                <div className="flex flex-col items-center justify-center space-y-3 bg-white px-4 py-6 pt-8 text-center md:px-16">

                    <Logo />
                    <h3 className="orange_gradient font-display text-2xl font-bold">Hapus Data </h3>
                    <p className="text-sm text-gray-500">
                        mohon periksa kembali,
                        anda yakin ingin menghapus data ini ?.
                    </p>


                </div>

                <div className="flex flex-row space-x-4 bg-gray-50 px-4 py-8 md:px-16">
                    <button
                        onClick={() => {
                            setShowModal(false)
                        }}
                        className="flex h-10 items-center justify-center rounded-md border border-gray-300 px-3 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100"
                    >
                        <p className="text-gray-600">Cancel</p>
                    </button>
                    <ButtonSubmit title='Delete' submitClicked={submitClicked} handleClick={handleSubmit} />
                </div>

            </div>
        </Modal>
    )
}
