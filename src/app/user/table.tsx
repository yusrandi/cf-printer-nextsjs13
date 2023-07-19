
import React, { useEffect } from 'react'
import {
    BadgeDelta,
    Card,
    DeltaType,
    Dropdown,
    DropdownItem,
    MultiSelectBox,
    MultiSelectBoxItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    Text,
    Title,
} from '@tremor/react';
import { useState } from 'react';
import { UserService } from '@/services/user-service';
import { User } from 'prisma/prisma-client';
import Image from 'next/image';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

interface props {
    users: User[]
    loading: boolean
    handleDelete(user: User): () => void
}
export default function TableUser({ users, loading, handleDelete }: props) {
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedNames, setSelectedNames] = useState<string[]>([]);


    const isSalesPersonSelected = (user: User) => (user.role === selectedStatus || selectedStatus === 'all')
        && (selectedNames.includes(user.name) || selectedNames.length === 0);



    return (

        <Card className='flex flex-col mt-8 w-full items-center justify-center'>

            {
                loading ? <Image
                    src='loader.svg'
                    width={50}
                    height={50}
                    alt='loader'
                    className='object-contain'
                /> :
                    <>
                        <div className="w-full sm:mt-6 hidden sm:flex sm:start sm:space-x-2">
                            <MultiSelectBox
                                onValueChange={(value) => setSelectedNames(value)}
                                placeholder="Pilih Pengguna"
                                className="max-w-xs"
                            >
                                {users.map((item) => (
                                    <MultiSelectBoxItem
                                        key={item.name}
                                        value={item.name}
                                        text={item.name}
                                    />
                                ))}
                            </MultiSelectBox>
                            <Dropdown
                                className="max-w-xs"
                                defaultValue="all"
                                onValueChange={(value) => setSelectedStatus(value)}
                            >
                                <DropdownItem value="all" text="Semua hak akses" />
                                <DropdownItem value="ADMIN" text="Admin" />
                                <DropdownItem value="PAKAR" text="Pakar" />
                                <DropdownItem value="USER" text="User" />
                            </Dropdown>
                        </div>
                        <div className="w-full mt-6 sm:hidden space-y-2 sm:space-y-0">
                            <MultiSelectBox
                                onValueChange={(value) => setSelectedNames(value)}
                                placeholder="Pilih pengguna"
                                className="max-w-xs"
                            >
                                {users.map((item) => (
                                    <MultiSelectBoxItem
                                        key={item.name}
                                        value={item.name}
                                        text={item.name}
                                    />
                                ))}
                            </MultiSelectBox>
                            <Dropdown
                                className="max-w-xs"
                                defaultValue="all"
                                onValueChange={(value) => setSelectedStatus(value)}
                            >
                                <DropdownItem value="all" text="Semua hak akses" />
                                <DropdownItem value="ADMIN" text="Admin" />
                                <DropdownItem value="PAKAR" text="Pakar" />
                                <DropdownItem value="USER" text="User" />
                            </Dropdown>
                        </div>

                        <Table className="mt-6 w-full">
                            <TableHead>
                                <TableRow>
                                    <TableHeaderCell>Name</TableHeaderCell>
                                    <TableHeaderCell>Email</TableHeaderCell>
                                    <TableHeaderCell className="text-right">Hak Akses</TableHeaderCell>
                                    <TableHeaderCell className="text-right">Aksi</TableHeaderCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {users
                                    .filter((item) => isSalesPersonSelected(item))
                                    .map((item) => (
                                        <TableRow key={item.name}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.email}</TableCell>
                                            <TableCell className="text-right">
                                                <BadgeDelta deltaType={item.role === 'ADMIN' ? 'increase' : item.role === 'PAKAR' ? 'unchanged' : 'decrease'} size="xs">
                                                    {item.role}
                                                </BadgeDelta>
                                            </TableCell>
                                            <TableCell className="text-right items-end gap-2 flex flex-row justify-end">

                                                <PencilSquareIcon
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

                    </>

            }


        </Card>
    )
}
