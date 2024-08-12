import React from 'react'
import Student from '@/Components/Student'
import { authOptions } from '@/app/api/auth/route';
import { getServerSession } from 'next-auth';

export default async function page() {

  // console.log(session?.user?.role);
  const session = await getServerSession(authOptions);

  return (
    <div>
      <Student name={session?.user?.name} uucmsId={session?.user?.uucms} role={session?.user?.role}/>
    </div>
  )
}
