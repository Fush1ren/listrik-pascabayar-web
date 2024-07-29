/**
 * @file /admin/tarif/add/page.js
 * @module AddKelolaTarif
 * @description Komponen untuk menambah data Tarif baru.
 */


'use client'

import { useEffect, useState } from "react"
import { postApiRes } from "@/utils/api_lib"
import { redirect, useRouter } from "next/navigation";
import SideBar from "@/app/_components/admin/SideBar";

/**
 * Komponen untuk menambahkan tarif baru.
 * @returns {JSX.Element} Elemen JSX yang mewakili halaman tambah tarif.
 */
const AddKelolaTarif = () => {
    const [daya, setDaya] = useState('');
    const [tarifperkwh, setTarifperkwh] = useState('');

    const router = useRouter();

    /**
     * Mengubah nilai daya sesuai dengan input.
     * @param {Object} e - Event yang dipicu oleh perubahan input.
     */
    const handleDayaChange = (e) => {
        setDaya(e.target.value);
    };

    /**
     * Mengubah nilai tarif per kWh sesuai dengan input.
     * @param {Object} e - Event yang dipicu oleh perubahan input.
     */
    const handleTpkChange = (e) => {
        setTarifperkwh(e.target.value);
    }

    /**
     * Mengatur ulang nilai input daya dan tarif per kWh.
     */
    const handleReset = () => {
        setDaya('')
        setTarifperkwh('')
    }

    /**
     * Mengirimkan data tarif baru ke API.
     * @async
     * @function
     * @param {Object} e - Event form submission.
     * @returns {Promise<void>}
     */
    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const value = {
                daya: parseInt(daya),
                tarifperkwh: parseFloat(tarifperkwh),
            }
            const api = await postApiRes(`/tarif`, value);

            if (api.result.error.length > 0) return console.log(api.result.error);
            alert('Data berhasil ditambahkan');

            setTimeout(() => {
                router.push(`/admin/tarif`)
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
                            <h1 className="text-2xl font-bold">Tambah Data Tarif</h1>
                        </div>
                        <div className="w-full">
                            <form method="POST" onSubmit={submitForm}>
                                <div className="flex flex-row py-2 w-[600px] gap-8">
                                    <div className="flex flex-col py-2">
                                        <label>Daya</label>
                                        <input value={daya} onChange={handleDayaChange} required type="number" className="text-black border border-black" />
                                    </div>
                                </div>
                                <div className="flex flex-row py-2 gap-8">
                                    <div className="flex flex-col py-2">
                                        <label>Tarif perkwh</label>
                                        <input value={tarifperkwh} onChange={handleTpkChange} required type="number" className="text-black border border-black" />
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

export default AddKelolaTarif;