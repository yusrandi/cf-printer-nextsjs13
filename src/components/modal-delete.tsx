'use client'
import React, { Dispatch, SetStateAction, useState } from 'react'
import Modal from './shared/modal'
import Logo from './Logo'
import ButtonSubmit from './ButtonSubmit'
import { Kerusakan } from 'prisma/prisma-client'
import { useRouter } from 'next/navigation'
interface Props {
    showModal: boolean
    setShowModal: Dispatch<SetStateAction<boolean>>
    kerusakan: Kerusakan;
    setKerusakan: Dispatch<SetStateAction<Kerusakan>>
    setSuccess: Dispatch<SetStateAction<boolean>>
    setKerusakans: Dispatch<SetStateAction<Kerusakan[]>>
}
export default function ModalDelete({ showModal, setShowModal, kerusakan, setKerusakan, setSuccess, setKerusakans }: Props) {
    const [submitClicked, setSubmitClicked] = useState(false);
    const router = useRouter()

    function setTimeoutSuccess() {
        setSuccess(true)
        setTimeout(function () {
            setSuccess(false)
        }, 5000)
    }

    async function handleSubmit() {
        try {
            setSubmitClicked(true);

            const api = `http://localhost:3000/api/kerusakan/${kerusakan.id}`
            const method = 'DELETE'

            const result = await fetch(api, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },

            }).then((res) => res.json());

            setKerusakans(result.responsedata)


            router.refresh()
            setShowModal(false)
            setSubmitClicked(false);

            setTimeoutSuccess()

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal showModal={showModal} setShowModal={setShowModal} isCenter>
            <div className="w-full bg-white overflow-hidden md:max-w-md md:rounded-2xl md:border md:border-gray-100 md:shadow-xl">
                <div className="flex flex-col items-center justify-center space-y-3 bg-white px-4 py-6 pt-8 text-center md:px-16">

                    <Logo />
                    <h3 className="orange_gradient font-display text-2xl font-bold">Hapus Data </h3>
                    <p className="text-sm text-gray-500">
                        mohon periksa kembali,
                        anda yakin ingin menghapus {kerusakan.kerusakanCode}?.
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
