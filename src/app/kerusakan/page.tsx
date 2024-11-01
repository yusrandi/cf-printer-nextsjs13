'use client'
import Button from '@/components/Button'
import Search from '@/components/search'
import { Callout, Text, TextInput, Title } from '@tremor/react'
import TableKerusakan from './table';
import { useRouter } from 'next/navigation';
import Modal from '@/components/shared/modal';
import Logo from '@/components/Logo';
import { LoadingDots } from '@/components/shared/icons';
import { useEffect, useState } from 'react';
import KerusakanModal from './kerusakan-modal';
import { Kerusakan } from 'prisma/prisma-client';
import { CheckCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import ModalDelete from '@/components/modal-delete';
import HeaderBody from '@/components/header-body';


const emptyKerusakan: Kerusakan = {
    kerusakanCode: '',
    kerusakanName: '',
    id: 0,
    createdAt: null,
    updatedAt: null,
    perbaikan: '',
    pengetahuans: []
}

export default function KerusakanPage() {
    const router = useRouter()
    const [showKerusakanModal, setShowKerusakanModal] = useState(false)
    const [title, setTile] = useState<string>('Create')

    const [kerusakan, setKerusakan] = useState(emptyKerusakan)
    const [kerusakans, setKerusakans] = useState<Kerusakan[]>([]);
    const [kerusakansSelected, setKerusakansSelected] = useState<Kerusakan[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true)

    const [isSucces, setSuccess] = useState(false)

    const [showDeleteModal, setShowDeleteModal] = useState(false)



    async function getKerusakans() {
        setLoading(true)

        const result = await fetch('http://aksipriteps.site/api/kerusakan', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json());
        // console.log(result.responsedata);

        setKerusakans(result.responsedata)
        setKerusakansSelected(result.responsedata)
        setLoading(false)

        return result
    }

    function handleCreate() {
        console.log('hello');
        setTile('Create')

        setKerusakan(emptyKerusakan)
        setShowKerusakanModal(true)

    }

    function handleDelete(kerusakan: Kerusakan) {
        console.log({ kerusakan });
        setKerusakan(kerusakan)
        setShowDeleteModal(true)
    }

    useEffect(() => {
        getKerusakans()
    }, []);

    function handleSearch(term: string) {
        console.log({ term });

        console.log();
        setKerusakansSelected(kerusakans.filter((kerusakan: Kerusakan) => kerusakan.kerusakanName?.includes(term)))

    }

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <ModalDelete showModal={showDeleteModal} setShowModal={setShowDeleteModal} kerusakan={kerusakan} setKerusakan={setKerusakan} setSuccess={setSuccess} setKerusakans={setKerusakans} />
            <KerusakanModal showKerusakanModal={showKerusakanModal} setShowKerusakanModal={setShowKerusakanModal} kerusakan={kerusakan} setKerusakan={setKerusakan} title={title} setKerusakans={setKerusakans} setSuccess={setSuccess} />

            <Title className=''>Data Kerusakan</Title>
            <Text>
                list data kerusakan pada printer.
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
                                placeholder="Cari berdasarkan Nama Kerusakan... (case sensitif) "
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
                    Turbine reached critical speed .
                </Callout>
            }

            <TableKerusakan kerusakans={kerusakansSelected} isLoading={isLoading} handleDelete={handleDelete} setKerusakan={setKerusakan} setShowKerusakanModal={setShowKerusakanModal} setTitle={setTile} />

        </main>
    )
}
