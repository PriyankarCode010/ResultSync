import NavBar from "../../Components/NavBar";
import SideBar from "../../Components/SideBar";
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { PiStudentFill } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";

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
                icon: <CgProfile className='h-10 w-10'/>,
            },
            {
              id: 2,
                title: "Results",
                path: "/student/result",
                icon: <PiStudentFill className='h-10 w-10'/>,
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