/**
 * @file /user/data-tagihan/page.js
 * @module DataTagihan
 * @description Komponen untuk menampilkan Tagihan Pelanggan.
 */

'use client'

import SideBar from "@/app/_components/user/SideBar";
import { getApiRes, patchApiRes } from "@/utils/api_lib";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Komponen DataTagihan.
 * Menampilkan data tagihan berdasarkan id_pelanggan yang tersimpan di localStorage.
 * @returns {JSX.Element} Elemen JSX yang menampilkan Halaman data tagihan.
 */
const DataTagihan = () => {
    const [dataTagihan, setDataTagihan] = useState([]);

    /**
     * Mengambil data tagihan dari API berdasarkan id_pelanggan.
     * @async
     * @function
     * @param {string} id - ID pelanggan.
     * @returns {Promise<void>}
     */
    const getDataTagihan = async (id) => {
        const api = await getApiRes(`/tagihan?id_pelanggan=${id}&user=pelanggan`);
        if (api.result.error.length > 0) return console.log(api.result.error);
        return setDataTagihan(api?.result?.data);
    }

    /**
     * Menangani pembayaran tagihan.
     * @async
     * @function
     * @param {string} id_tagihan - ID tagihan.
     * @param {number} status - Status tagihan.
     * @returns {Promise<void>}
     */
    const bayarHandle = async (id_tagihan, status) => {
        let text = "Apakah anda ingin membayar tagihan?\nTekan OK atau Cancel."
        let value = {
            status: parseInt(status + 1)
        }

        if (confirm(text) == true) {
            try {
                const api = await patchApiRes(`/tagihan?id_tagihan=${id_tagihan}`, value);
                if (api.result.error.length > 0) return alert('Pembayaran Gagal!');
                alert('Pembayaran Berhasil!');
                setInterval(() => {
                    return window.location.reload();
                }, 1000);
            } catch (e) {
                console.log(e)
            }
        }
        return window.location.reload();
    }

    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem('dataUser'))
        if (storage?.islogin === true && storage?.level === 'pelanggan') {
            getDataTagihan(storage?.data?.id_pelanggan)
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
                        <h1 className="text-2xl font-bold">Data Tagihan</h1>
                    </div>
                    <div className="">
                        <table className="w-full border-collapse py-2 overflow-auto rounded-l-full">
                            <thead>
                                <tr className="border-2 text-white">
                                    <th className="py-4 bg-[#451CB8]">No</th>
                                    <th className="py-4 bg-[#451CB8]">Bulan</th>
                                    <th className="py-4 bg-[#451CB8]">Tahun</th>
                                    <th className="py-4 bg-[#451CB8]">Jumlah Meter</th>
                                    <th className="py-4 bg-[#451CB8]">Status</th>
                                    <th className="py-4 bg-[#451CB8]">Action</th>
                                </tr>
                            </thead>
                            {
                                dataTagihan?.length > 0 ?
                                    <tbody className="text-center">
                                        {
                                            dataTagihan?.map((item, index) => {
                                                return (
                                                    <tr key={index} className=" odd:bg-white even:bg-[#E7E9EB]">
                                                        <td>{index + 1}</td>
                                                        <td>{item?.bulan}</td>
                                                        <td>{item?.tahun}</td>
                                                        <td>{item?.jumlah_meter}</td>

                                                        {
                                                            item?.status == 1
                                                                ?
                                                                <td>
                                                                    <span className="bg-red-500 rounded">
                                                                        <span className="text-white p-4 text-sm">
                                                                            Belum dibayar
                                                                        </span>
                                                                    </span>
                                                                </td>
                                                                :
                                                                <td>
                                                                    <span className="bg-blue-500 rounded">
                                                                        <span className="text-white p-4 text-sm">
                                                                            Sedang Diproses
                                                                        </span>
                                                                    </span>
                                                                </td>
                                                        }
                                                        {
                                                            item?.status == 1
                                                                ?
                                                                <td className="flex justify-center items-center">
                                                                    <button className="bg-blue-500 rounded w-[80px]" onClick={(e) => { bayarHandle(item?.id_tagihan, item?.status) }}>
                                                                        <span className="text-white p-4 text-sm">Bayar</span>
                                                                    </button>
                                                                </td>
                                                                :
                                                                <td className="flex justify-center items-center">
                                                                    <button disabled className="bg-gray-400 rounded w-[80px]" onClick={(e) => { bayarHandle(item?.id_tagihan, item?.status) }}>
                                                                        <span className="text-white p-4 text-sm">Bayar</span>
                                                                    </button>
                                                                </td>
                                                        }
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                    :
                                    <tbody>
                                        <tr>
                                            <td colSpan="6" className="text-center font-bold">Data Tagihan Kosong</td>
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

export default DataTagihan;