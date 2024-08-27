import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const register = async () => {

  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  if (session) redirect(`/${role}`)

  return (
    <div>
      reset
    </div>
  )
}

export default register
