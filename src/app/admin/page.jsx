import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import AdminDashboard from "@/Components/AdminDashboard";

export default async function Admin() {

  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
 
  if (!session) return redirect('/login');
  
  if (role != "admin") redirect(`/${role}`);

  return (
    <div className='h-screen m-2'>
      <AdminDashboard name={session?.user?.name} email={session?.user?.email}/>
    </div>
  );
}
