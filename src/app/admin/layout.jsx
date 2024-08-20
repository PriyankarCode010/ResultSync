import NavBar from "@/Components/NavBar";
import SideBar from "@/Components/SideBar";
import { MdDashboard, MdSupervisedUserCircle } from "react-icons/md";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { GiTeacher } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import { TbReportSearch } from "react-icons/tb";
import { GrTrophy } from "react-icons/gr";

export default async function layout({children}){

  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  const menuItem = [
    {
        title: "admin",
        list: [
            {
                id: 1,
                title: "Profile",
                path: `/admin`,
                icon: <MdDashboard className='h-10 w-10'/>,
            },
            {
              id: 2,
              title: "Manage Teacher",
              path: `/admin/teachers`,
              icon: <GiTeacher className='h-10 w-10'/>,
            },
            {
                id: 3,
                title: "Student Results",
                path: "/admin/result",
                icon: <PiStudentFill className='h-10 w-10'/>,
            },
            {
              id: 4,
              title: "Reports",
              path: "/admin/reports",
              icon: <TbReportSearch className='h-10 w-10'/>,
            },
            {
              id: 5,
              title: "Scorers",
              path: "/admin/students",
              icon: <GrTrophy className='h-10 w-10'/>,
            },
        ],
      },
  ];


    return (
    <div className={`flex h-screen dark:bg-emerald-950`}>
      <SideBar menuItem={menuItem} session={session}/>
      <div className="grow m-3 overflow-y-scroll no-scrollbar">
        <NavBar role={role}/>
        {children}
      </div>
    </div>
  );
}