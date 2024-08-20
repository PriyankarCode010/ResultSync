import NavBar from "@/Components/NavBar";
import SideBar from "@/Components/SideBar";
import { MdDashboard, MdSupervisedUserCircle } from "react-icons/md";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { MdAssignmentTurnedIn } from "react-icons/md";

export default async function layout({children}){

  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  const menuItem = [
    {
        title: "teacher",
        list: [
            {
                id: 1,
                title: "Profile",
                path: `/teacher`,
                icon: <MdDashboard className='h-10 w-10'/>,
            },
            {
                id: 2,
                title: "Student Results",
                path: "/teacher/result",
                icon: <MdSupervisedUserCircle className='h-10 w-10'/>,
            },
            {
              id: 3,
              title: "Assisgnment",
              path: "/teacher/assignment",
              icon: <MdAssignmentTurnedIn className='h-10 w-10'/>,
          },
        ],
      },
  ];

    return (
    <div className="flex h-screen dark:bg-red-950">
      <SideBar menuItem={menuItem} session={session}/>
      <div className="grow m-3 overflow-y-scroll no-scrollbar">
        <NavBar role={role}/>
        {children}
      </div>
    </div>
  );
}