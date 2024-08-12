import NavBar from "@/Components/NavBar";
import SideBar from "@/Components/SideBar";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/route';
import { MdDashboard, MdSupervisedUserCircle } from "react-icons/md";

export default async function layout({children}){

  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  const menuItem = [
    {
        title: "student",
        list: [
            {
                id: 1,
                title: "Profile",
                path: `/student`,
                icon: <MdDashboard className='h-10 w-10'/>,
            },
            {
              id: 2,
                title: "Results",
                path: "/student/result",
                icon: <MdSupervisedUserCircle className='h-10 w-10'/>,
            },
        ],
      },
  ];

    return (
    <div className="flex h-screen dark:bg-gray-900">
      <SideBar menuItem={menuItem} session={session}/>
      <div className="grow m-3 overflow-y-scroll no-scrollbar">
        <NavBar role={role}/>
        {children}
      </div>
    </div>
  );
}