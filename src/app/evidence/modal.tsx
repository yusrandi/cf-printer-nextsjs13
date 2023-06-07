'use client'
import ButtonSubmit from '@/components/ButtonSubmit';
import Logo from '@/components/Logo';
import { LoadingDots } from '@/components/shared/icons';
import Modal from '@/components/shared/modal';
import { TextInput } from '@tremor/react';
import { useRouter } from 'next/navigation';
import { Evidence } from 'prisma/prisma-client';
import React, { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react'

export default function EvidenceModal({ showEvidenceModal, setShowEvidenceModal, evidence, setEvidence, title, handleSubmit, submitClicked, setSubmitClicked, errorCode, errorName
}: {
    showEvidenceModal: boolean;
    setShowEvidenceModal: Dispatch<SetStateAction<boolean>>;
    evidence: Evidence; setEvidence: Dispatch<SetStateAction<Evidence>>;
    title: string;
    handleSubmit: (e: SyntheticEvent) => void
    submitClicked: boolean;
    setSubmitClicked: Dispatch<SetStateAction<boolean>>;
    errorCode: boolean;
    errorName: boolean;
}) {


    const router = useRouter()

    return (
        <Modal showModal={showEvidenceModal} setShowModal={setShowEvidenceModal}>
            <div className="w-full h-full bg-white overflow-hidden md:max-w-md md:rounded-2xl md:border md:border-gray-100 md:shadow-xl">
                <div className="flex flex-col items-center justify-center space-y-3 bg-white px-4 py-6 pt-8 text-center md:px-16">

                    <Logo />
                    <h3 className="orange_gradient font-display text-2xl font-bold">{title} Data</h3>
                    <p className="text-sm text-gray-500">
                        Precedent is an opinionated collection of components, hooks, and
                        utilities for your Next.js project.
                    </p>

                    <TextInput error={errorCode} placeholder="Evidence Kode" autoFocus value={evidence.evidenceCode!} onChange={(e) => setEvidence({ ...evidence, evidenceCode: e.target.value })} />
                    <TextInput error={errorName} placeholder="Evidence Nama" value={evidence.evidenceName!} onChange={(e) => setEvidence({ ...evidence, evidenceName: e.target.value })} />



                </div>

                <div className="flex flex-row space-x-4 bg-gray-50 px-4 py-8 md:px-16">
                    <button
                        onClick={() => {
                            setShowEvidenceModal(false)
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
