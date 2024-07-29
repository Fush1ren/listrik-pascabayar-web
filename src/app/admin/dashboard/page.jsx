/**
 * @file /admin/dashboard/page.js
 * @module DashboardAdmin
 * @description Komponen untuk menampilkan Dashboard Admin.
 */

'use client'

import { useEffect, useState } from "react"; // Mengimpor hooks useEffect dan useState dari library react
import { redirect } from "next/navigation"; // Mengimpor fungsi redirect dari library next/navigation
import SideBar from "@/app/_components/admin/SideBar"; // Mengimpor komponen SideBar dari direktori app/_components/admin/SideBar


/**
 * Komponen Dashboard.
 * Menampilkan dashboard untuk admin berdasarkan data pengguna yang tersimpan di localStorage.
 * @returns {JSX.Element} Elemen JSX yang menampilkan halaman dashboard admin.
 */
const DashboardAdmin = () => {
    const [data, setData] = useState([]); // Mendeklarasikan state data dan fungsi setData dengan nilai awal array kosong

    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem('dataUser')) // Mengambil data user dari localStorage
        if (storage?.islogin === true && storage?.level === 'admin') { // Cek apakah user sudah login dan levelnya admin
            return; // Jika sudah login dan level admin, maka simpan data user ke state data
        } else {
            redirect('/login/admin'); // Jika belum login atau bukan admin, maka redirect ke halaman login admin
        }

    }, [])

    return (
        <div className="flex bg-[#F8F8F8] w-full h-screen">
            <SideBar />
            <div className="text-[#666666]">
                <div className="p-8">
                    <div className="text-[#451CB8]">
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                        <span className="text-lg font-normal">Welcome in Dashboard</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DashboardAdmin;