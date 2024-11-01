'use client'
import HeaderBody from '@/components/header-body'
import { CheckCircleIcon, MagnifyingGlassIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { Callout, Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, Title } from '@tremor/react'
import { Evidence, Kerusakan, Pengetahuan } from 'prisma/prisma-client'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { PengetahuanService } from './service'
import Image from 'next/image'
import PengetahuanModal from './modal'
import PengetahuanModalDelete from './modal-delete'
import { EvidenceService } from '../evidence/services'
import { KerusakanService } from '../kerusakan/services'

const emptyEvidence: Evidence = { id: 0, evidenceCode: '', evidenceName: '', createdAt: null, updatedAt: null }
const emptyKerusakan: Kerusakan = {
    kerusakanCode: '', kerusakanName: '', id: 0, createdAt: null, updatedAt: null, perbaikan: '',
    pengetahuans: []
}

const emptyPengetahuan: Pengetahuan = { id: 0, evidenceId: 0, evidence: emptyEvidence, kerusakanId: 0, kerusakan: emptyKerusakan, bobot: 0, createdAt: null, updatedAt: null }

export default function PengetahuanPage() {
    const [isSucces, setSuccess] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isLoading, setLoading] = useState<boolean>(true)

    const [pengetahuans, setPengetahuans] = useState<Pengetahuan[]>([]);
    const [pengetahuansSelected, setPengetahuansSelected] = useState<Pengetahuan[]>([]);
    const [pengetahuan, setPengetahuan] = useState<Pengetahuan>(emptyPengetahuan);



    const [showModal, setShowModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [submitClicked, setSubmitClicked] = useState(false);

    const [title, setTitle] = useState('Create')
    const [message, setMessage] = useState('')

    const [errorKerusakanId, setErrorKerusakanId] = useState(false)
    const [errorEvidenceId, setErrorEvidenceId] = useState(false)
    const [errorBobot, setErrorBobot] = useState(false)

    useEffect(() => {
        PengetahuanService.getData().then((data) => {
            console.log({ data });
            setPengetahuans(data.responsedata)
            setPengetahuansSelected(data.responsedata)
            setLoading(false)
        })
    }, []);



    function clearText() {
        setErrorBobot(false)
        setErrorEvidenceId(false)
        setErrorKerusakanId(false)

    }

    function handleCreate() {
        clearText()
        setTitle('Create')
        setPengetahuan(emptyPengetahuan)
        setShowModal(true)
    }
    function handleEdit(pengetahuan: Pengetahuan) {
        clearText()
        setTitle('Update')
        setPengetahuan(pengetahuan)
        setShowModal(true)
    }

    function handleDelete(pengetahuan: Pengetahuan) {
        console.log({ pengetahuan });
        setPengetahuan(pengetahuan)
        setShowDeleteModal(true)
    }

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        clearText()

        console.log({ pengetahuan });

        if (pengetahuan.kerusakanId === 0) {
            setErrorKerusakanId(true)
            return
        }
        if (pengetahuan.evidenceId === 0) {
            setErrorEvidenceId(true)
            return
        }
        if (pengetahuan.bobot === 0) {
            setErrorBobot(true)
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
            await PengetahuanService.createData(pengetahuan).then((data) => {
                console.log({ data });
                if (data.responsecode === 1) {
                    setPengetahuans(data.responsedata)
                    setPengetahuansSelected(data.responsedata)

                    setTimeoutSuccess()
                } else {
                    setMessage(data.responsemsg)
                    setTimeoutError()
                }
                setLoading(false)

            })
        } catch (error) {
            console.log(error);
        }
    }
    async function handleUpdate() {
        try {
            await PengetahuanService.updateData(pengetahuan).then((data) => {
                console.log({ data });
                setPengetahuans(data.responsedata)
                setPengetahuansSelected(data.responsedata)
                setLoading(false)

                setTimeoutSuccess()

            })

        } catch (error) {
            console.log(error);
        }
    }
    async function handleSubmitDelete(e: SyntheticEvent) {
        e.preventDefault()
        console.log({ pengetahuan });

        try {
            setSubmitClicked(true);

            await PengetahuanService.deleteData(pengetahuan).then((data) => {
                console.log({ data });
                setPengetahuans(data.responsedata)
                setPengetahuansSelected(data.responsedata)
                setLoading(false)
                setTimeoutSuccess()
            })
            setShowDeleteModal(false)
            setSubmitClicked(false);

            setTimeoutSuccess()

        } catch (error) {
            console.log(error);
        }

    }
    function setTimeoutSuccess() {
        setSuccess(true)
        setTimeout(function () {
            setSuccess(false)
        }, 5000)
    }
    function setTimeoutError() {
        setIsError(true)
        setTimeout(function () {
            setIsError(false)
        }, 5000)
    }

    function TablePengetahuan() {
        return (
            <Table className='w-full'>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>#</TableHeaderCell>
                        <TableHeaderCell>Kode Kerusakan</TableHeaderCell>
                        <TableHeaderCell >Nama Kerusakan</TableHeaderCell>
                        <TableHeaderCell>Kode Evidence</TableHeaderCell>
                        <TableHeaderCell >Nama Evidence</TableHeaderCell>
                        <TableHeaderCell >Bobot</TableHeaderCell>
                        <TableHeaderCell className="text-right">Aksi</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pengetahuansSelected
                        .map((item: Pengetahuan, index) => (
                            <TableRow key={index}>
                                <TableCell width={50}>{index + 1}</TableCell>
                                <TableCell width={50}>{item.kerusakan.kerusakanCode}</TableCell>
                                <TableCell>{item.kerusakan.kerusakanName}</TableCell>
                                <TableCell width={50}>{item.evidence.evidenceCode}</TableCell>
                                <TableCell>{item.evidence.evidenceName}</TableCell>
                                <TableCell width={50}>{item.bobot}</TableCell>
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

    function handleSearch(term: string) {
        console.log({ term });

        console.log();
        setPengetahuansSelected(pengetahuans.filter((pengetahuan: Pengetahuan) => pengetahuan.kerusakan.kerusakanName?.includes(term) || pengetahuan.evidence.evidenceName?.includes(term)))

    }

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">

            <PengetahuanModal showPengetahuanModal={showModal} setShowPengetahuanModal={setShowModal} pengetahuan={pengetahuan} setPengetahuan={setPengetahuan} title={title} handleSubmit={handleSubmit} submitClicked={submitClicked} setSubmitClicked={setSubmitClicked} errorBobot={errorBobot} errorEvidenceId={errorEvidenceId} errorKerusakanId={errorKerusakanId} />
            <PengetahuanModalDelete showModal={showDeleteModal} setShowModal={setShowDeleteModal} pengetahuan={pengetahuan} handleSubmit={handleSubmitDelete} submitClicked={submitClicked} />

            <Title className=''>Data Pengetahuan</Title>
            <Text>
                list data basis pengetahuan beserta bobot gejala pada printer.
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
                                placeholder="Cari berdasarkan Nama Kerusakan / Nama Evidence... (case sensitif) "
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
            {
                isError && <Callout
                    className="h-12 mt-4"
                    title={message}
                    icon={CheckCircleIcon}
                    color="rose"
                >
                    {message} .
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
                        pengetahuansSelected.length === 0 ? <Text>List is Empty</Text>
                            : <TablePengetahuan />
                }
            </Card>


        </main>
    )
}
