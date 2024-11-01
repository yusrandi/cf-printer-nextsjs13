'use client'
import { Table, TableBody, TableCell, TableRow, Text, Title } from '@tremor/react'
import Image from 'next/image';
import { Kerusakan } from 'prisma/prisma-client';
import React, { useEffect, useState } from 'react'
import RuleTable from './table';

export default function RulePage() {

    const [kerusakans, setKerusakans] = useState<Kerusakan[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true)


    useEffect(() => {
        getKerusakans()
    }, [])

    async function getKerusakans() {
        setLoading(true)

        const result = await fetch('/api/kerusakan', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json());
        // console.log(result.responsedata);

        setKerusakans(result.responsedata)
        setLoading(false)

        return result
    }

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <Title className=''>Data Rules</Title>
            <Text>
                kumpulan data rules kerusakan perinter terhadap gejala-gejala.
            </Text>
            <div className='mt-5'></div>
            {
                isLoading ? <Image
                    src='loader.svg'
                    width={50}
                    height={50}
                    alt='loader'
                    className='object-contain'
                /> : <>
                    <RuleTable kerusakans={kerusakans} />
                </>
            }



        </main>
    )
}
