
import { useSession } from 'next-auth/react';
import Navbar from './navbar';
import { getServerSession } from 'next-auth/next';

export default async function Nav() {
  const session = await getServerSession();
  // const { data: session } = useSession();

  return <Navbar />;
}
