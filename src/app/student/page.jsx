import React from 'react'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import StudentDashboard from '../../Components/StudentDashboard';


export default async function student() {

  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
 
  if (!session) return redirect('/login');
  if (role != "student") redirect(`/${role}`);

  return (
    <div className='h-screen m-2'>
      <StudentDashboard name={session?.user?.name} email={session?.user?.email}/>
    </div>
  )
}
