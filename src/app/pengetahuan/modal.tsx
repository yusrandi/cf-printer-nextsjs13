'use client'
import ButtonSubmit from '@/components/ButtonSubmit';
import Logo from '@/components/Logo';
import { LoadingDots } from '@/components/shared/icons';
import Modal from '@/components/shared/modal';
import { useRouter } from 'next/navigation';
import { Evidence, Kerusakan, Pengetahuan } from 'prisma/prisma-client';
import React, { Dispatch, SetStateAction, SyntheticEvent, useEffect, useState } from 'react'
import { EvidenceService } from '../evidence/services';
import { KerusakanService } from '../kerusakan/services';
import { CalculatorIcon } from '@heroicons/react/24/solid';
import { MultiSelectBox, MultiSelectBoxItem, SelectBox, SelectBoxItem } from '@tremor/react';
import { KeyakinanType, ListKeyakinan } from '@/type/keyakinan-type';

export default function PengetahuanModal(
    {
        showPengetahuanModal,
        setShowPengetahuanModal,
        pengetahuan,
        setPengetahuan,
        title,
        handleSubmit,
        submitClicked,
        setSubmitClicked,
        errorKerusakanId,
        errorEvidenceId,
        errorBobot
    }: {
        showPengetahuanModal: boolean;
        setShowPengetahuanModal: Dispatch<SetStateAction<boolean>>;
        pengetahuan: Pengetahuan; setPengetahuan: Dispatch<SetStateAction<Pengetahuan>>;
        title: string;
        handleSubmit: (e: SyntheticEvent) => void
        submitClicked: boolean;
        setSubmitClicked: Dispatch<SetStateAction<boolean>>;
        errorKerusakanId: boolean;
        errorEvidenceId: boolean;
        errorBobot: boolean;

    }) {


    const router = useRouter()
    const [kerusakans, setKerusakans] = useState([]);
    const [evidences, setEvidences] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('1');


    useEffect(() => {
        EvidenceService.getData().then((data) => {
            console.log({ data });
            setEvidences(data.responsedata)

        })
    }, []);

    useEffect(() => {
        KerusakanService.getData().then((data) => {
            console.log({ data });
            setKerusakans(data.responsedata)
        })
    }, []);


    return (
        <Modal showModal={showPengetahuanModal} setShowModal={setShowPengetahuanModal}>
            <div className="w-full h-full bg-white overflow-hidden md:max-w-md md:rounded-2xl md:border md:border-gray-100 md:shadow-xl">
                <div className="flex flex-col items-center justify-center space-y-3 bg-white px-4 py-6 pt-8 text-center md:px-16">

                    <Logo />
                    <h3 className="orange_gradient font-display text-2xl font-bold">{title} Data</h3>
                    <p className="text-sm text-gray-500">
                        Precedent is an opinionated collection of components, hooks, and
                        utilities for your Next.js project.
                    </p>

                    {/* <TextInput error={errorCode} placeholder="Pengetahuan Kode" autoFocus value={Pengetahuan.PengetahuanCode!} onChange={(e) => setPengetahuan({ ...Pengetahuan, PengetahuanCode: e.target.value })} />
                    <TextInput error={errorName} placeholder="Pengetahuan Nama" value={Pengetahuan.PengetahuanName!} onChange={(e) => setPengetahuan({ ...Pengetahuan, PengetahuanName: e.target.value })} /> */}


                    <SelectBox
                        aria-required

                        value={pengetahuan.kerusakanId.toString()}
                        onValueChange={(value) => setPengetahuan({ ...pengetahuan, kerusakanId: Number(value) })}
                        placeholder="Pilih Kerusakan"
                        className={`max-w-xs`}
                    >
                        {kerusakans.map((item: Kerusakan) => (
                            <SelectBoxItem
                                key={item.id}
                                value={item.id!.toString()}
                                text={`${item.kerusakanCode!} ${item.kerusakanName!}`}
                            />
                        ))}


                    </SelectBox>


                    {
                        errorKerusakanId ? <span className='text-xs text-red-500 float-left'>
                            this field is required
                        </span> : null
                    }

                    <SelectBox
                        onValueChange={(value) => setPengetahuan({ ...pengetahuan, evidenceId: Number(value) })}
                        value={pengetahuan.evidenceId.toString()}
                        placeholder="Pilih Evidence"
                        className="max-w-xs"
                    >
                        {evidences.map((item: Evidence) => (
                            <SelectBoxItem
                                key={item.id}
                                value={item.id!.toString()}
                                text={`${item.evidenceCode!} ${item.evidenceName!}`}
                            />
                        ))}
                    </SelectBox>
                    {
                        errorEvidenceId ? <span className='text-xs text-red-500 float-left'>
                            this field is required
                        </span> : null
                    }

                    <SelectBox
                        value={pengetahuan.bobot.toString()}
                        onValueChange={(value) => setPengetahuan({ ...pengetahuan, bobot: Number(value) })}
                        placeholder="Pilih nilai CF"
                        className="max-w-xs"
                    >
                        {ListKeyakinan.map((item: KeyakinanType) => (
                            <SelectBoxItem
                                key={item.id}
                                value={item.id!.toString()}
                                text={`${item.id!} | ${item.value!}`}
                            />
                        ))}
                    </SelectBox>
                    {
                        errorBobot ? <span className='text-xs text-red-500 float-left'>
                            this field is required
                        </span> : null
                    }



                </div>

                <div className="flex flex-row space-x-4 bg-gray-50 px-4 py-8 md:px-16">
                    <button
                        onClick={() => {
                            setShowPengetahuanModal(false)
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
