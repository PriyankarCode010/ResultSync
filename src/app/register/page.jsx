import React from 'react';
import Register from '@/Components/Register';
import { authOptions } from '@/app/api/auth/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const register = async () => {

  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  if (session) redirect(`/${role}`)

  return (
    <div>
      <Register />
    </div>
  )
}

export default register
