'use client'
import { Table, TableBody, TableCell, TableRow } from '@tremor/react'
import Image from 'next/image'
import { Kerusakan, Pengetahuan } from 'prisma/prisma-client'
import React, { useEffect, useState } from 'react'

interface props {
    kerusakans: Kerusakan[]
}
export default function RuleTable({ kerusakans }: props) {

    const [rules, setRules] = useState<String[]>([])
    const [isLoading, setLoading] = useState<boolean>(true)


    function getCombinations(chars: string[]) {
        var result: string[] = [];
        var f = function (prefix: string, chars: string[]) {
            for (var i = 0; i < chars.length; i++) {
                // console.log(prefix)
                // console.log("prefix "+prefix.length)
                if (prefix.length > 0) {
                    result.push(prefix + " AND " + chars[i]);
                }
                // console.log("prefix "+prefix.length)

                if (prefix.length > 0) {
                    f(prefix + " AND " + chars[i], chars.slice(i + 1));
                } else {
                    f(prefix + chars[i], chars.slice(i + 1));

                }

            }
        }
        f('', chars);
        return result;
    }

    function sort(s: string[], n: number) {
        for (let i = 1; i < n; i++) {
            let temp = s[i];

            // Insert s[j] at its correct position
            let j = i - 1;
            while (j >= 0 && temp.length < s[j].length) {
                s[j + 1] = s[j];
                j--;
            }
            s[j + 1] = temp;
        }
    }

    // Function to print the sorted array of string
    function printArraystring(str: string[], n: number, kerusakan: string) {
        for (let i = 0; i < n; i++)
            if (str[i].length > 1) {
                // document.write("IF " + str[i] + " THEN " + kerusakan);
                let newValue: string = "IF " + str[i] + " THEN " + kerusakan
                setRules(rules => [...rules, newValue])
            }
    }


    useEffect(() => {
        kerusakans.map((kerusakan: Kerusakan) => {
            setLoading(true)
            console.log(kerusakan.pengetahuans);
            let evdCodes: string[] = []
            // setRules(rules => [...rules, kerusakan.kerusakanName!])

            kerusakan.pengetahuans.map((pengetahuan: Pengetahuan) => {
                console.log(pengetahuan.evidence.evidenceCode);
                evdCodes.push(pengetahuan.evidence.evidenceCode)
            })

            console.log(`lenghth ${evdCodes.length}`);
            var combinations = getCombinations(evdCodes);
            // console.log(combinations)
            let sortArray = sort(combinations, combinations.length);
            printArraystring(combinations, combinations.length, kerusakan.kerusakanName!);
            setLoading(false)

        })

    }, [])
    return (
        <div>
            {
                isLoading ? <Image
                    src='loader.svg'
                    width={50}
                    height={50}
                    alt='loader'
                    className='object-contain'
                /> : <>
                    <Table className="mt-6 w-full">
                        <TableBody>
                            {rules
                                .map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </>
            }
        </div>


    )
}
