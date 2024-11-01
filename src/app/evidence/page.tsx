'use client'
import ButtonSubmit from '@/components/ButtonSubmit'
import Logo from '@/components/Logo'
import HeaderBody from '@/components/header-body'
import Loading from '@/components/loading'
import Modal from '@/components/shared/modal'
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import { Callout, Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, TextInput, Title } from '@tremor/react'
import Image from 'next/image'
import { Evidence } from 'prisma/prisma-client'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import EvidenceModal from './modal'
import EvidenceModalDelete from './modal-delete'
import { EvidenceService } from './services'

const emptyEvidence: Evidence = { id: 0, evidenceCode: '', evidenceName: '', createdAt: null, updatedAt: null }
export default function EvidencePage() {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [evidences, setEvidences] = useState<Evidence[]>([]);
    const [evidencesSelected, setEvidencesSelected] = useState<Evidence[]>([]);
    const [evidence, setEvidence] = useState<Evidence>(emptyEvidence);
    const [isSucces, setSuccess] = useState(false)

    const [showModal, setShowModal] = useState(false)
    const [title, setTitle] = useState('Create')

    const [submitClicked, setSubmitClicked] = useState(false);
    const [errorCode, setErrorCode] = useState(false);
    const [errorName, setErrorName] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false)


    useEffect(() => {
        EvidenceService.getData().then((data) => {
            console.log({ data });
            setEvidences(data.responsedata)
            setEvidencesSelected(data.responsedata)
            setLoading(false)
        })
    }, []);

    function clearText() {
        setErrorCode(false)
        setErrorName(false)
    }


    function handleCreate() {
        clearText()
        setEvidence(emptyEvidence)
        setShowModal(true)

    }
    function handleEdit(evidence: Evidence) {
        clearText()
        setTitle('Update')
        setEvidence(evidence)
        setShowModal(true)
    }
    function handleDelete(evidence: Evidence) {
        console.log({ evidence });
        setEvidence(evidence)
        setShowDeleteModal(true)
    }
    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()

        console.log({ evidence });

        if (evidence.evidenceCode === '') {
            setErrorCode(true)
            return
        }
        if (evidence.evidenceName === '') {
            setErrorName(true)
            return
        }

        setSubmitClicked(true);

        if (title === 'Create') {
            handleStore()
        } else {
            handleUpdate()
        }

        setShowModal(false)
        setSubmitClicked(false)

    }

    async function handleStore() {
        try {
            await EvidenceService.createData(evidence).then((data) => {
                console.log({ data });
                setEvidences(data.responsedata)
                setEvidencesSelected(data.responsedata)
                setLoading(false)

                setTimeoutSuccess()
            })
        } catch (error) {
            console.log(error);
        }
    }
    async function handleUpdate() {
        try {
            await EvidenceService.updateData(evidence).then((data) => {
                console.log({ data });
                setEvidences(data.responsedata)
                setEvidencesSelected(data.responsedata)
                setLoading(false)

                setTimeoutSuccess()

            })

        } catch (error) {
            console.log(error);
        }
    }

    async function handleSubmitDelete(e: SyntheticEvent) {
        e.preventDefault()
        console.log({ evidence });

        try {
            setSubmitClicked(true);

            const api = `http://aksipriteps.site/api/evidence/${evidence.id}`
            const method = 'DELETE'

            const result = await fetch(api, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },

            }).then((res) => res.json());

            setEvidences(result.responsedata)
            setEvidencesSelected(result.responsedata)


            setShowDeleteModal(false)
            setSubmitClicked(false);

            setTimeoutSuccess()

        } catch (error) {
            console.log(error);
        }

    }
    function handleSearch(term: string) {
        console.log({ term });

        console.log();
        setEvidencesSelected(evidences.filter((evidence: Evidence) => evidence.evidenceName?.includes(term)))

    }

    function TableEvidence() {
        return (
            <Table className='w-full'>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>#</TableHeaderCell>
                        <TableHeaderCell>Kode Evidence</TableHeaderCell>
                        <TableHeaderCell >Nama Evidence</TableHeaderCell>
                        <TableHeaderCell className="text-right">Aksi</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {evidencesSelected
                        .map((item: Evidence, index) => (
                            <TableRow key={index}>
                                <TableCell width={50}>{index + 1}</TableCell>
                                <TableCell width={50}>{item.evidenceCode}</TableCell>
                                <TableCell>{item.evidenceName}</TableCell>
                                <TableCell className="text-right items-end gap-2 flex flex-row justify-end">

                                    <PencilSquareIcon
                                        onClick={() => handleEdit(item)}
                                        className="h-5 w-5 text-black cursor-pointer"
                                        aria-hidden="true"
                                    />
                                    <TrashIcon
                                        onClick={() => handleDelete(item)}
                                        className="h-5 w-5 text-black cursor-pointer"
                                        aria-hidden="true"

                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        )
    }

    function setTimeoutSuccess() {
        setSuccess(true)
        setTimeout(function () {
            setSuccess(false)
        }, 5000)
    }




    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <EvidenceModalDelete showModal={showDeleteModal} setShowModal={setShowDeleteModal} evidence={evidence} handleSubmit={handleSubmitDelete} submitClicked={submitClicked} />
            <EvidenceModal showEvidenceModal={showModal} setShowEvidenceModal={setShowModal} evidence={evidence} setEvidence={setEvidence} title={title} handleSubmit={handleSubmit} submitClicked={submitClicked} setSubmitClicked={setSubmitClicked} errorCode={errorCode} errorName={errorName} />

            <Title className=''>Data Evidence</Title>
            <Text>
                list data gejala dan ciri-ciri kerusakan pada printer.
            </Text>

            {/* <HeaderBody title='Create Data' handleClick={handleCreate} /> */}
            <div>
                <div className="sm:mt-6 hidden sm:flex sm:start sm:space-x-2 justify-between">

                    {/* <Search /> */}
                    <div className="relative w-full max-w-md">
                        <label htmlFor="search" className="sr-only">
                            Search
                        </label>
                        <div className="rounded-md shadow-sm">
                            <div
                                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                                aria-hidden="true"
                            >
                                <MagnifyingGlassIcon
                                    className="mr-3 h-4 w-4 text-gray-400"
                                    aria-hidden="true"
                                />
                            </div>
                            <input
                                type="text"
                                name="search"
                                id="search"
                                className="h-10 block w-full rounded-md border border-gray-200 pl-9 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Cari berdasarkan Nama Evidence... (case sensitif) "
                                spellCheck={false}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </div>


                    </div>
                    <button
                        onClick={handleCreate}
                        className="text-white text-[13px] font-mono bg-black border hover:bg-white hover:text-black transition-all rounded-md px-10 py-2 duration-75 flex items-center justify-center whitespace-nowrap hover:border-gray-800"
                    >
                        {title}
                    </button>
                </div>
                <div className="mt-6 sm:hidden space-y-2 sm:space-y-0">
                    <div className="relative w-full max-w-md">
                        <label htmlFor="search" className="sr-only">
                            Search
                        </label>
                        <div className="rounded-md shadow-sm">
                            <div
                                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                                aria-hidden="true"
                            >
                                <MagnifyingGlassIcon
                                    className="mr-3 h-4 w-4 text-gray-400"
                                    aria-hidden="true"
                                />
                            </div>
                            <input
                                type="text"
                                name="search"
                                id="search"
                                className="h-10 block w-full rounded-md border border-gray-200 pl-9 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Cari berdasarkan Nama Kerusakan... (case sensitif) "
                                spellCheck={false}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </div>


                    </div>

                    <button
                        onClick={handleCreate}
                        className="w-full text-white text-[13px] font-mono bg-black border hover:bg-white hover:text-black transition-all rounded-md px-10 py-2 duration-75 flex items-center justify-center whitespace-nowrap hover:border-gray-800 "
                    >
                        {title}
                    </button>
                </div>
            </div>
            {
                isSucces && <Callout
                    className="h-12 mt-4"
                    title="Success"
                    icon={CheckCircleIcon}
                    color="teal"
                >
                    Success .
                </Callout>
            }
            <Card className="flex w-full items-center justify-center mt-6">
                {
                    isLoading ?
                        <Image
                            src='loader.svg'
                            width={50}
                            height={50}
                            alt='loader'
                            className='object-contain'
                        />
                        :
                        evidences.length === 0 ? <Text>List is Empty</Text>
                            : <TableEvidence />
                }
            </Card>


        </main>
    )
}
