/**
 * @file /admin/level/add/page.js
 * @module AddKelolaLevel
 * @description Komponen untuk menambah data level admin baru.
 */


'use client'

import { useEffect, useState } from "react"
import { postApiRes } from "@/utils/api_lib"
import { redirect, useRouter } from "next/navigation";
import SideBar from "@/app/_components/admin/SideBar";

/**
 * Komponen untuk menambahkan data level.
 * @returns {JSX.Element} Elemen JSX yang mewakili halaman penambahan data level.
 */
const AddKelolaLevel = () => {
    const [namaLevel, setNamaLevel] = useState('');

    const router = useRouter();

    /**
     * Mengatur nilai nama level dari input pengguna.
     * @param {Object} e - Event yang dipicu oleh perubahan input.
     */
    const handleLevelChange = (e) => {
        setNamaLevel(e.target.value);
    };

    /**
     * Mengatur ulang nilai input nama level.
     */
    const handleReset = () => {
        setNamaLevel('')
    }

    /**
     * Mengirimkan data level baru ke API.
     * @async
     * @function
     * @param {Object} e - Event yang dipicu oleh pengiriman form.
     * @returns {Promise<void>}
     */
    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const value = {
                nama_level: namaLevel
            }
            const api = await postApiRes(`/level`, value);

            if (api.result.error.length > 0) return console.log(api.result.error);
            alert('Insert Data was Successfully!');
            setTimeout(() => {
                router.push(`/admin/level`)
            }, 2000);

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem('dataUser'))
        if (storage?.islogin === true && storage?.level === 'admin') {
            return;
        } else {
            redirect('/login/admin')
        }

    }, [])

    return (
        <div className="flex bg-[#F8F8F8] w-full h-screen">
            <SideBar />
            <div className="w-full text-[#6B6B6B] h-full">
                <div>
                    <div className={`p-8 h-full overflow-auto`}>
                        <div className="pb-2">
                            <h1 className="text-2xl font-bold">Tambah Data Level</h1>
                        </div>
                        <div className="w-full">
                            <form method="POST" onSubmit={submitForm}>
                                <div className="flex flex-row py-2 w-[600px] gap-8">
                                    <div className="flex flex-col py-2">
                                        <label>Nama Level</label>
                                        <input value={namaLevel} onChange={handleLevelChange} required type="text" className="text-black border border-black" />
                                    </div>
                                </div>
                                <div className="flex flex-row gap-4 py-4">
                                    <button type="submit" className="border bg-green-400 rounded hover:bg-green-500">
                                        <span className="text-white p-4">Submit</span>
                                    </button>
                                    <button onClick={handleReset} type="reset" className="border bg-red-400 rounded hover:bg-red-500 bg-5">
                                        <span className="text-white p-4">Reset</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default AddKelolaLevel;