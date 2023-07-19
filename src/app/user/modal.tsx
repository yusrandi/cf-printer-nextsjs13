'use client'
import ButtonSubmit from '@/components/ButtonSubmit';
import Logo from '@/components/Logo';
import { LoadingDots } from '@/components/shared/icons';
import Modal from '@/components/shared/modal';
import { Dropdown, DropdownItem, TextInput } from '@tremor/react';
import { useRouter } from 'next/navigation';
import { Role, User } from 'prisma/prisma-client';
import React, { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react'

export default function UserModal({
    showUserModal,
    setShowUserModal,
    user,
    setUser,
    title,
    handleSubmit,
    submitClicked,
    setSubmitClicked,
    errorName,
    errorEmail,
    errorPassword,
}: {
    showUserModal: boolean;
    setShowUserModal: Dispatch<SetStateAction<boolean>>;
    user: User; setUser: Dispatch<SetStateAction<User>>;
    title: string;
    handleSubmit: (e: SyntheticEvent) => void
    submitClicked: boolean;
    setSubmitClicked: Dispatch<SetStateAction<boolean>>;
    errorName: boolean;
    errorEmail: boolean;
    errorPassword: boolean;
}) {


    const router = useRouter()
    const [valueDrop, setValueDrop] = useState("ADMIN");


    return (
        <Modal showModal={showUserModal} setShowModal={setShowUserModal}>
            <div className="w-full h-full bg-white overflow-hidden md:max-w-md md:rounded-2xl md:border md:border-gray-100 md:shadow-xl">
                <div className="flex flex-col items-center justify-center space-y-3 bg-white px-4 py-6 pt-8 text-center md:px-16">

                    <Logo />
                    <h3 className="orange_gradient font-display text-2xl font-bold">{title} Data</h3>
                    <p className="text-sm text-gray-500">
                        Precedent is an opinionated collection of components, hooks, and
                        utilities for your Next.js project.
                    </p>

                    <TextInput error={errorName} placeholder="fullname" autoFocus value={user.name!} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                    <TextInput error={errorEmail} placeholder="email@mail.mail" value={user.email!} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    <TextInput error={errorPassword} type="password" placeholder="*******" onChange={(e) => setUser({ ...user, password: e.target.value })} />

                    <Dropdown value={user.role!} onValueChange={(e) => setUser({ ...user, role: e as Role })}>
                        <DropdownItem value="ADMIN" text={"Admin"} />
                        <DropdownItem value="PAKAR" text={"Pakar"} />
                        <DropdownItem value="USER" text={"User"} />
                    </Dropdown>


                </div>

                <div className="flex flex-row space-x-4 bg-gray-50 px-4 py-8 md:px-16">
                    <button
                        onClick={() => {
                            setShowUserModal(false)
                            setSubmitClicked(false)

                        }}
                        className="flex h-10 items-center justify-center rounded-md border border-gray-300 px-3 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100"
                    >
                        <p className="text-gray-600">Cancel</p>
                    </button>
                    <ButtonSubmit title='submit' submitClicked={submitClicked} handleClick={handleSubmit} />
                </div>

            </div>
        </Modal>
    )
}
