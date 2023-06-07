'use client'
import ButtonSubmit from '@/components/ButtonSubmit';
import Logo from '@/components/Logo';
import { LoadingDots } from '@/components/shared/icons';
import Modal from '@/components/shared/modal';
import { TextInput } from '@tremor/react';
import { useRouter } from 'next/navigation';
import { Kerusakan } from 'prisma/prisma-client';
import React, { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react'

export default function KerusakanModal({ showKerusakanModal, setShowKerusakanModal, kerusakan, setKerusakan, setKerusakans, title, setSuccess
}: {
  showKerusakanModal: boolean; setShowKerusakanModal: Dispatch<SetStateAction<boolean>>; kerusakan: Kerusakan; setKerusakan: Dispatch<SetStateAction<Kerusakan>>; setKerusakans: Dispatch<SetStateAction<Kerusakan[]>>; title: string; setSuccess: Dispatch<SetStateAction<boolean>>;
}) {
  const [submitClicked, setSubmitClicked] = useState(false);
  const [errorCode, setErrorCode] = useState(false);
  const [errorName, setErrorName] = useState(false);

  const router = useRouter()


  function clearText() {
    setErrorCode(false)
    setErrorName(false)
  }

  function setTimeoutSuccess() {
    setSuccess(true)
    setTimeout(function () {
      setSuccess(false)
    }, 5000)
  }


  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()

    console.log({ title });
    console.log({ kerusakan });



    if (kerusakan.kerusakanCode === '') {
      setErrorCode(true)
      return
    }
    if (kerusakan.kerusakanName === '') {
      setErrorName(true)
      return

    }
    let api: string = 'http://localhost:3000/api/kerusakan'
    let method: string = 'POST'

    if (title === 'Update') {
      api = `http://localhost:3000/api/kerusakan/${kerusakan.id}`
      method = 'PATCH'

    }


    try {
      setSubmitClicked(true);

      const result = await fetch(api, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          kerusakanCode: kerusakan.kerusakanCode,
          kerusakanName: kerusakan.kerusakanName,
        }),
      }).then((res) => res.json());

      setKerusakans(result.responsedata)

      clearText()
      router.refresh()
      setShowKerusakanModal(false)
      setSubmitClicked(false);

      setTimeoutSuccess()

    } catch (error) {
      console.log(error);
    }



  }
  async function create() {
    try {

    } catch (error) {
      console.log(error);

    }
  }

  return (
    <Modal showModal={showKerusakanModal} setShowModal={setShowKerusakanModal}>
      <div className="w-full h-full bg-white overflow-hidden md:max-w-md md:rounded-2xl md:border md:border-gray-100 md:shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 bg-white px-4 py-6 pt-8 text-center md:px-16">

          <Logo />
          <h3 className="orange_gradient font-display text-2xl font-bold">{title} Data</h3>
          <p className="text-sm text-gray-500">
            Precedent is an opinionated collection of components, hooks, and
            utilities for your Next.js project.
          </p>

          <TextInput error={errorCode} placeholder="Kerusakan Kode" autoFocus value={kerusakan.kerusakanCode!} onChange={(e) => setKerusakan({ ...kerusakan, kerusakanCode: e.target.value })} />
          <TextInput error={errorName} placeholder="Kerusakan Nama" value={kerusakan.kerusakanName!} onChange={(e) => setKerusakan({ ...kerusakan, kerusakanName: e.target.value })} />

        </div>

        <div className="flex flex-row space-x-4 bg-gray-50 px-4 py-8 md:px-16">
          <button
            onClick={() => {
              clearText()
              setShowKerusakanModal(false)
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
