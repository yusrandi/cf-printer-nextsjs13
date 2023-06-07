'use client'
import { BadgeDelta, Callout, Card, DeltaType, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text } from '@tremor/react'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { KerusakanType } from '@/lib/type/type';
import { Kerusakan } from 'prisma/prisma-client';
import Loading from '@/components/loading';
import { CheckCircleIcon, MagnifyingGlassIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';


interface TableProps {
    kerusakans: Kerusakan[]
    isLoading: boolean
    handleDelete: (kerusakan: Kerusakan) => void
    setKerusakan: Dispatch<SetStateAction<Kerusakan>>
    setShowKerusakanModal: Dispatch<SetStateAction<boolean>>
    setTitle: Dispatch<SetStateAction<string>>
}
export default function TableKerusakan({ kerusakans, isLoading, handleDelete, setKerusakan, setShowKerusakanModal, setTitle }: TableProps) {


    function handleEdit(kerusakan: Kerusakan) {
        setKerusakan(kerusakan)
        setShowKerusakanModal(true)
        setTitle('Update')

    }

    function KerusakanTable() {
        return (
            <>


                {
                    kerusakans.length === 0 ? <Text>List is Empty</Text> : <Table className="mt-6">
                        <TableHead>
                            <TableRow>
                                <TableHeaderCell>Kode Kerusakan</TableHeaderCell>
                                <TableHeaderCell >Nama Kerusakan</TableHeaderCell>
                                <TableHeaderCell className="text-right">
                                    Aksi
                                </TableHeaderCell>

                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {kerusakans
                                .map((item: Kerusakan, index) => (
                                    <TableRow key={index}>
                                        <TableCell width={50}>{item.kerusakanCode}</TableCell>
                                        <TableCell>{item.kerusakanName}</TableCell>
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
                }
            </>
        )
    }


    return (
        <Card className='mt-6'>

            {
                isLoading ? <Loading /> : <KerusakanTable />
            }

        </Card>
    )
}
