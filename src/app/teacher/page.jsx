import React from 'react'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import TeacherDashboard from '@/Components/TeacherDashboard';

export default async function teacher() {

  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  console.log("student page-- ",role);
 
  if (!session) return redirect('/login');
  if (role != "teacher") redirect(`/${role}`);

  return (
    <div className='h-screen flex-1 m-2'>
      <TeacherDashboard name={session?.user?.name} email={session?.user?.email}/>
    </div>
  )
}
