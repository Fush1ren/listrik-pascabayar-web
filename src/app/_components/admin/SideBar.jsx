
'use client'

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

/**
 * Komponen Sidebar untuk navigasi admin.
 * 
 * @component
 */
const SideBarAdmin = () => {
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();
    const pathName = usePathname();

    const menuAdmin = [
        {
            name: 'Dashboard',
            path: `/admin/dashboard`
        },
        {
            name: 'Data Pelanggan',
            path: `/admin/data-pelanggan`
        },
        {
            name: 'Tarif',
            path: `/admin/tarif`
        },
        {
            name: 'Kelola Penggunaan',
            path: `/admin/kelola-penggunaan`
        },
        {
            name: 'Kelola Tagihan',
            path: `/admin/kelola-tagihan`
        },
        {
            name: 'Kelola Pembayaran',
            path: `/admin/kelola-pembayaran`
        },
        {
            name: 'Level',
            path: `/admin/level`
        },
        {
            name: 'Data Admin',
            path: `/admin/data-admin`
        }
    ]

    /**
     * Membuka atau menutup sidebar.
     */
    const openButton = () => {
        setIsOpen(!isOpen)
    }

    /**
     * Menghandle logout admin.
     */
    const logoutHandler = () => {
        localStorage.removeItem('dataUser');
        return router.push('/login/admin');
    }


    return (
        <div className={`bg-[#FFFFFF] text-[#B4B4B4] h-screen w-[238px] border rounded border-transparent shadow-[0_3px_10px_-1px_rgba(0,0,0,0.1)] ${isOpen ? 'block w-[240px]' : 'w-[50px]'} `}>
            <div className={`flex flex-col h-full ${isOpen ? '' : 'items-center'}`}>
                <div className={`${isOpen ? 'flex flex-col py-4 gap-2' : 'hidden'}`}>
                    <div className="flex justify-center items-center w-full">
                        <a className="text-2xl font-bold text-center text-[#441BB7]">ElecBill</a>
                    </div>
                    <div className="flex flex-col justify-center items-center w-full py-2">
                        <ul className="w-full pl-4">
                            {
                                menuAdmin.map((item, index) => {
                                    const path = item.path;
                                    return (
                                        <li
                                            key={index}
                                            className={`font-semibold pl-2 ${path.includes(pathName) ? 'rounded-l-full py-4 border-transparent shadow-[0_0px_20px_3px_rgba(0,0,0,0.1)]' : 'py-3'}`}
                                        >
                                            <a className={`hover:text-[#441BB8] ${path.includes(pathName) ? 'text-[#3611B2]' : ''}`} href={item.path}>
                                                {item.name}
                                            </a>
                                        </li>
                                    )
                                })
                            }
                            <li className="font-semibold py-4 px-2">
                                <button className="hover:text-[#441BB8] " onClick={(e) => { logoutHandler() }}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={`${isOpen ? 'flex  justify-center items-center' : 'flex items-center'}`}>
                    {
                        isOpen
                            ?
                            <div className="px-4 flex justify-center items-center absolute">
                                <button className="bg-[#441BB8] rounded-full w-[40px] h-[40px] flex justify-center items-center" onClick={(e) => { openButton() }}>
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
                                    </svg>
                                </button>
                            </div>
                            :
                            <div className="flex justify-center items-center ">
                                <button className="rounded-full w-[40px] h-[40px] flex justify-center items-center px-1" onClick={(e) => { openButton() }}>
                                    <svg className="w-[30px] h-[30px] text-black hover:text-[#441BB8]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
                                    </svg>

                                </button>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default SideBarAdmin;