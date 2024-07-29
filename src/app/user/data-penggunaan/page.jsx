/**
 * @file /user/data-penggunaan/page.js
 * @module DataPenggunaan
 * @description Komponen untuk menampilkan Data penggunaan pelanggan.
 */
'use client'

import { useEffect, useState } from "react"
import { getApiRes } from "@/utils/api_lib"
import { redirect } from "next/navigation";
import SideBar from "@/app/_components/user/SideBar";

/**
 * Komponen DataPenggunaan.
 * Menampilkan data penggunaan berdasarkan id_pelanggan yang tersimpan di localStorage.
 * @returns {JSX.Element} Elemen JSX yang menampilkan halaman data penggunaan.
 */
const DataPenggunaan = () => {
    /**
     * State untuk menyimpan data penggunaan.
     * @type {Array}
     * @default []
     * @description State untuk menyimpan data penggunaan.
     */
    const [dataPenggunaan, setDataPenggunaan] = useState([]);

    /**
     * Mengambil data penggunaan dari API berdasarkan id_pelanggan.
     * @async
     * @function
     * @param {string} id_pelanggan - ID pelanggan.
     * @returns {Promise<void>}
     */
    const getDataPenggunaan = async (id_pelanggan) => {
        const api = await getApiRes(`/penggunaan?id_pelanggan=${id_pelanggan}`);
        if (api.result.error.length > 0) return console.log(api.result.error);
        return setDataPenggunaan(api?.result?.data);
    }

    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem('dataUser'))
        if (storage?.islogin === true && storage?.level === 'pelanggan') {
            getDataPenggunaan(storage?.data?.id_pelanggan)
        } else {
            redirect('/login/user')
        }

    }, [])


    return (
        <div className="flex bg-[#F8F8F8] w-full h-screen">
            <SideBar />
            <div className="w-full text-[#6B6B6B] h-full">
                <div className="p-8 h-full overflow-auto">
                    <div className="pb-2">
                        <h1 className="text-2xl font-bold">Data Penggunaan</h1>
                    </div>
                    <div className="">
                        <table className="w-full border-collapse py-2 overflow-auto rounded-l-full">
                            <thead>
                                <tr className="border-2 text-white">
                                    <th className="py-4 bg-[#451CB8]">No</th>
                                    <th className="py-4 bg-[#451CB8]">Bulan</th>
                                    <th className="py-4 bg-[#451CB8]">Tahun</th>
                                    <th className="py-4 bg-[#451CB8]">Meter Awal</th>
                                    <th className="py-4 bg-[#451CB8]">Meter Akhir</th>
                                </tr>
                            </thead>
                            {
                                dataPenggunaan?.length > 0 ?
                                    <tbody className="text-center">
                                        {
                                            dataPenggunaan?.map((item, index) => {
                                                return (
                                                    <tr key={index} className=" odd:bg-white even:bg-[#E7E9EB]">
                                                        <td>{index + 1}</td>
                                                        <td>{item?.bulan}</td>
                                                        <td>{item?.tahun}</td>
                                                        <td>{item?.meter_awal}</td>
                                                        <td>{item?.meter_akhir}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                    :
                                    <tbody>
                                        <tr>
                                            <td colSpan="5" className="text-center font-bold">Data Penggunaan Kosong</td>
                                        </tr>
                                    </tbody>
                            }
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default DataPenggunaan;