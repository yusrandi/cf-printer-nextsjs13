'use client'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { BadgeDelta, Button, Callout, Card, Dropdown, DropdownItem, Flex, MultiSelectBox, MultiSelectBoxItem, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, Title } from '@tremor/react'
import TableUser from './table'
import Search from '@/components/search'
import { CheckCircleIcon, PencilSquareIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useDemoModal } from '@/components/demo-modal'
import HeaderBody from '@/components/header-body'
import UserModal from './modal'
import { User } from 'prisma/prisma-client'
import { SetStateAction, SyntheticEvent, useEffect, useState } from 'react'
import { UserService } from '@/services/user-service'
import UserModalDelete from './modal-delete'


const inter = Inter({ subsets: ['latin'] })


const emptUser: User = { id: 0, email: '', name: '', password: null, role: "ADMIN", createdAt: null, updatedAt: null }
export default function UserPage() {
  const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState("Create")
  const [user, setUser] = useState<User>(emptUser)
  const [users, setUsers] = useState<User[]>([])

  const [submitClicked, setSubmitClicked] = useState(false);

  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const [isSucces, setSuccess] = useState(false)
  const [loading, setLoading] = useState<boolean>(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedNames, setSelectedNames] = useState<string[]>([]);


  const isSalesPersonSelected = (user: User) => (user.role === selectedStatus || selectedStatus === 'all')
    && (selectedNames.includes(user.name) || selectedNames.length === 0);

  useEffect(() => {
    UserService.getData().then((data) => {
      console.log({ data });
      setUsers(data.responsedata)
      setLoading(false)
    })
  }, []);


  function handleCreate() {
    setTitle('Create')
    clearText()
    setUser(emptUser)
    setShowModal(true)

  }
  function clearText() {
    setErrorEmail(false)
    setErrorName(false)
    setErrorPassword(false)
  }
  async function handleSubmit(e: SyntheticEvent) {
    console.log({ user });


    if (user.name === '') {
      setErrorName(true)
      return
    }
    if (user.email === '') {
      setErrorEmail(true)
      return
    }
    if (user.password === '' && title === 'Create') {
      setErrorPassword(true)
      return
    }

    setSubmitClicked(true);

    if (title === 'Create') {
      handleStore()
    } else {
      handleUpdate()
    }

    setShowModal(false)
    setSubmitClicked(false)
  }

  async function handleStore() {
    try {
      await UserService.createData(user).then((data) => {
        console.log({ data });

        if (data.responsecode != 0) {
          setUsers(data.responsedata)
          setTimeoutSuccess()
        }

      })
    } catch (error) {
      console.log(error);
    }
  }
  async function handleUpdate() {
    try {
      await UserService.updateData(user).then((data) => {
        console.log({ data });
        setUsers(data.responsedata)
        setLoading(false)

        setTimeoutSuccess()

      })

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


  async function handleSubmitDelete() {
    console.log({ user });

    try {
      setSubmitClicked(true);

      await UserService.deleteData(user).then((data) => {
        console.log({ data });
        setUsers(data.responsedata)
        setLoading(false)
        setTimeoutSuccess()
      })
      setShowDeleteModal(false)
      setSubmitClicked(false);

    } catch (error) {
      console.log(error);
    }
  }

  function handleDelete(user: User) {
    console.log({ user });
    setUser(user)
    setShowDeleteModal(true)
  }
  function handleEdit(user: User) {
    clearText()
    setTitle('Update')
    setUser(user)
    setShowModal(true)
  }


  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <UserModal showUserModal={showModal} setShowUserModal={setShowModal}
        user={user} setUser={setUser}
        title={title} handleSubmit={handleSubmit} submitClicked={submitClicked} setSubmitClicked={setSubmitClicked}
        errorEmail={errorEmail} errorName={errorName} errorPassword={errorPassword}
      />
      <UserModalDelete showModal={showDeleteModal} setShowModal={setShowDeleteModal} user={user} handleSubmit={handleSubmitDelete} submitClicked={submitClicked} />

      <Title className=''>Data Pengguna</Title>
      <Text>
        A list of users retrieved from a MySQL database .
      </Text>

      <HeaderBody title='Tambah Pengguna' handleClick={handleCreate} />

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

            </>

        }
      </Card>



    </main>
  )
}
