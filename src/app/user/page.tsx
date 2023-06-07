'use client'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Button, Flex, Text, Title } from '@tremor/react'
import TableUser from './table'
import Search from '@/components/search'
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { useUserModal } from './user-modal'
import { useDemoModal } from '@/components/demo-modal'
import HeaderBody from '@/components/header-body'


const inter = Inter({ subsets: ['latin'] })



export default function UserPage() {
  const { UserModal, setShowUserModal } = useUserModal();
  const { DemoModal, setShowDemoModal } = useDemoModal();


  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <UserModal />
      <Title className=''>Users</Title>
      <Text>
        A list of users retrieved from a MySQL database (PlanetScale).
      </Text>

      <HeaderBody title='Create User' handleClick={() => setShowUserModal(true)} />




      <TableUser />

    </main>
  )
}
