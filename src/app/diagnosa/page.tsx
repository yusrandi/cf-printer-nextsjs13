'use client'
import { DiagnosaService } from '@/services/DiagnosaServices';
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Callout, Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, Title } from '@tremor/react'
import Image from 'next/image';
import { Diagnosa } from 'prisma/prisma-client';
import React, { useEffect, useState } from 'react'
import DiagnosaModalDelete from './modal-delete';

export default function DiagnosaPage() {

    const [isLoading, setLoading] = useState<boolean>(true)
    const [diagnosas, setDiagnosas] = useState<Diagnosa[]>([]);
    const [diagnosa, setDiagnosa] = useState<Diagnosa>();
    const [isSucces, setSuccess] = useState(false)

    const [submitClicked, setSubmitClicked] = useState(false);
    const [showModal, setShowModal] = useState(false)



    useEffect(() => {
        DiagnosaService.getData().then((data) => {
            console.log({ data });
            setDiagnosas(data.responsedata)
            setLoading(false)
        })
    }, []);

    function TableDiagnosa() {
        return (
            <Table className='w-full'>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>#</TableHeaderCell>
                        <TableHeaderCell>Tanggal</TableHeaderCell>
                        <TableHeaderCell>Kode Kerusakan</TableHeaderCell>
                        <TableHeaderCell>Nama Kerusakan</TableHeaderCell>
                        <TableHeaderCell>Pengguna</TableHeaderCell>
                        <TableHeaderCell>Nilai (%)</TableHeaderCell>
                        <TableHeaderCell className="text-right">Aksi</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {diagnosas
                        .map((item: Diagnosa, index) => (
                            <TableRow key={index}>
                                <TableCell width={50}>{index + 1}</TableCell>
                                <TableCell width={50}>{item.datetime}</TableCell>
                                <TableCell>{item.kerusakan?.kerusakanCode}</TableCell>
                                <TableCell>{item.kerusakan?.kerusakanName}</TableCell>
                                <TableCell>{item.user?.name}</TableCell>
                                <TableCell>{item.nilai}%</TableCell>
                                <TableCell className="text-right items-end gap-2 flex flex-row justify-end">
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

    async function handleDelete(diagnosa: Diagnosa) {
        console.log({ diagnosa });
        setDiagnosa(diagnosa)
        setShowModal(true)
    }

    async function handleSubmitDelete() {
        console.log({ diagnosa });

        try {
            setSubmitClicked(true);

            await DiagnosaService.deleteData(diagnosa?.id!).then((data) => {
                console.log({ data });
                setDiagnosas(data.responsedata)
                setLoading(false)
                setTimeoutSuccess()
            })
            setShowModal(false)
            setSubmitClicked(false);

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


    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <DiagnosaModalDelete setShowModal={setShowModal} showModal={showModal} submitClicked={submitClicked} handleSubmit={handleSubmitDelete} />
            <Title className=''>Data Riwayat Konsultasi</Title>
            <Text>
                list data hasil konsultasi dari user, detail kerusakan dan nilai persentase.
            </Text>
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
                        diagnosas.length === 0 ? <Text>List is Empty</Text>
                            : <TableDiagnosa />
                }
            </Card>
        </main>
    )
}
