"use client";
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { RiMenu2Fill,RiMenu3Fill } from "react-icons/ri";
import ThemeToggle from './ThemeToggle';

const SideBar = ({menuItem,session}) => {

    const [expanded, setExpanded] = useState(true);
    const role = session?.user?.role;
    console.log("sasas",session);

    return (
        <div className={`relative h-screen bg-gray-600 select-none ${role=="admin"?"dark:bg-green-800":(role=="teacher"?"dark:bg-red-800":"dark:bg-blue-800")}`}>
            <div className='p-4'>
                <div className='flex justify-center items-center pb-5'>
                    <div className={`flex flex-row  overflow-hidden transition-all ${expanded ? "w-52" : "w-0"}`}>
                        <div className='rounded-full overflow-hidden'>
                            <Image src="favicon.icon" width={50} height={50} />
                        </div>
                        <div className=' mx-4'>
                            <span className='font-bold text-white'></span>
                        </div>
                    </div>
                    <button onClick={() => setExpanded((curr) => !curr)} className="p-4 rounded-lg hover:bg-gray-900"> 
                        {expanded ? <RiMenu3Fill className='text-white text-3xl' /> : <RiMenu2Fill className='text-white text-3xl'/>}
                    </button>
                </div>
                <div className=' flex flex-col justify-between'>
                    {menuItem.map((item) => (
                        <div key={item.title} className='text-white border-t-2'>
                            {item.list.map((i) => (
                                <Link key={i.id} href={i.path}>
                                <div className="flex p-3 mt-5 hover:bg-gray-900 rounded-lg">
                                    <span className={`${expanded?"p-1":"px-4 py-1"}`}>{i.icon}</span>
                                    <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52" : "w-0 "}`}>
                                        <div className="leading-4">
                                            <span className="text-sm p-4">{i.title}</span>
                                        </div>
                                    </div>
                                </div>
                                </Link>
                            ))}
                        </div>
                    ))}
                    <div className="absolute inset-x-0 bottom-0 border-t flex items-center justify-center text-white dark:text-white">
                        <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 p-4" : "w-0 "}`}>
                        <span className={`${expanded?"p-1":"px-4 py-1"}`}>icon</span>
                            <div>
                                <div className="leading-4">
                                    <h4 className="font-semibold">{session?.user?.name}</h4>
                                    <span className="text-xs">{(session?.user?.uucms)}</span>
                                </div>
                            </div>
                        </div>
                        <div className={`text-2xl p-2 m-4 bg-gray-200 rounded-full ${expanded?"":""}`}>
                            <ThemeToggle/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBar;
