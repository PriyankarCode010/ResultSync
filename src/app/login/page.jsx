import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import LoginForm from '@/Components/LoginForm';
import { redirect } from 'next/navigation';

const page = async() => {

  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  if (session) redirect(`/${role}`)
  return (
    <main className={`${role=="admin"?"dark:bg-green-800":(role=="teacher"?"dark:bg-red-800":"dark:bg-blue-800")}`}>
      <LoginForm/>
    </main>
  )
}

export default page
