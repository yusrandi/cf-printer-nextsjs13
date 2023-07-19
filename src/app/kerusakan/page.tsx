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
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import ModalDelete from '@/components/modal-delete';
import HeaderBody from '@/components/header-body';


const emptyKerusakan: Kerusakan = {
    kerusakanCode: '',
    kerusakanName: '',
    id: 0,
    createdAt: null,
    updatedAt: null,
    perbaikan: ''
}

export default function KerusakanPage() {
    const router = useRouter()
    const [showKerusakanModal, setShowKerusakanModal] = useState(false)
    const [title, setTile] = useState<string>('Create')

    const [kerusakan, setKerusakan] = useState(emptyKerusakan)
    const [kerusakans, setKerusakans] = useState<Kerusakan[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true)

    const [isSucces, setSuccess] = useState(false)

    const [showDeleteModal, setShowDeleteModal] = useState(false)



    async function getKerusakans() {
        setLoading(true)

        const result = await fetch('http://aksipriteps.site/api/kerusakan', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json());
        // console.log(result.responsedata);

        setKerusakans(result.responsedata)
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

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <ModalDelete showModal={showDeleteModal} setShowModal={setShowDeleteModal} kerusakan={kerusakan} setKerusakan={setKerusakan} setSuccess={setSuccess} setKerusakans={setKerusakans} />
            <KerusakanModal showKerusakanModal={showKerusakanModal} setShowKerusakanModal={setShowKerusakanModal} kerusakan={kerusakan} setKerusakan={setKerusakan} title={title} setKerusakans={setKerusakans} setSuccess={setSuccess} />

            <Title className=''>Data Kerusakan</Title>
            <Text>
                list data kerusakan pada printer.
            </Text>

            <HeaderBody title='Create Data' handleClick={handleCreate} />

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

            <TableKerusakan kerusakans={kerusakans} isLoading={isLoading} handleDelete={handleDelete} setKerusakan={setKerusakan} setShowKerusakanModal={setShowKerusakanModal} setTitle={setTile} />

        </main>
    )
}
