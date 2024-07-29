/**
 * @file /admin/kelola-tagihan/page.js
 * @module KelolaTagihan
 * @description Komponen untuk mengelola data Tagihan pelanggan listrik.
 */

'use client'

import { useEffect, useState } from "react"
import { getApiRes, patchApiRes } from "@/utils/api_lib"
import { redirect } from "next/navigation";
import SideBar from "@/app/_components/admin/SideBar";
import EditTagihan from "@/app/_components/admin/EditTagihan";

/**
 * Komponen utama untuk mengelola tagihan.
 * @return {JSX.Element} Elemen JSX yang mewakili halaman pengelolaan tagihan.
 */
const KelolaTagihan = () => {
    const [dataTagihan, setDataTagihan] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [modalEdit, setModalEdit] = useState(false);

    /**
     * Mengambil data tagihan dari API.
     * @async
     * @function
     * @returns {Promise<void>}
     */
    const getDataTagihan = async () => {
        const api = await getApiRes(`/tagihan`);
        if (api.result.error.length > 0) return console.log(api.result.error);
        return setDataTagihan(api?.result?.data);
    }

    /**
     * Mengatur data yang akan diedit dan menampilkan modal edit.
     * @param {Object} item - Item tagihan yang akan diedit.
     */
    const handleEditButton = (item) => {
        setSelectedData(item);
        setModalEdit(true);
    }

    /**
     * Mengirim data yang telah diedit ke API.
     * @async
     * @function
     * @param {number} data - ID tagihan yang akan diedit.
     * @param {Object} value - Data baru untuk tagihan.
     * @returns {Promise<void>}
     */
    const submitEditButton = async (data, value) => {
        try {
            const api = await patchApiRes(`/tagihan?id_tagihan=${parseInt(data)}`, value);

            if (api.result.error.length > 0) return console.log(api.result.error);
            alert('Update Data was Successfully!')
            setModalEdit(false)
            setTimeout(() => {
                window.location.reload();
            }, 2000);

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem('dataUser'))
        if (storage?.islogin === true && storage?.level === 'admin') {
            getDataTagihan()
        } else {
            redirect('/login/admin')
        }

    }, [])


    return (
        <div className="flex bg-[#F8F8F8] w-full h-screen">
            <SideBar />
            <div className="w-full text-[#6B6B6B] h-full">
                <div className="p-8 h-full overflow-auto">
                    <div className="flex pb-2 justify-between">
                        <h1 className="text-2xl font-bold">Kelola Tagihan</h1>
                    </div>
                    <div className="">
                        <table className="w-full border-collapse py-2 overflow-auto rounded-l-full">
                            <thead>
                                <tr className="border-2 text-white">
                                    <th className="py-4 bg-[#451CB8]">No</th>
                                    <th className="py-4 bg-[#451CB8]">Nama Pelanggan</th>
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
                                            dataTagihan?.filter((i) => {
                                                return i?.status === 1 || i?.status === 2
                                            }).map((item, index) => {
                                                return (
                                                    <tr key={index} className=" odd:bg-white even:bg-[#E7E9EB]">
                                                        <td>{index + 1}</td>
                                                        <td>{item?.pelanggan?.nama_pelanggan}</td>
                                                        <td>{item?.penggunaan?.bulan}</td>
                                                        <td>{item?.penggunaan?.tahun}</td>
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
                                                                    {
                                                                        item?.status == 2
                                                                            ?
                                                                            <span className="bg-blue-500 rounded">
                                                                                <span className="text-white p-4 text-sm">
                                                                                    Sedang Diproses
                                                                                </span>
                                                                            </span>
                                                                            :
                                                                            <span className="bg-green-500 rounded">
                                                                                <span className="text-white p-4 text-sm">
                                                                                    Sudah dibayar
                                                                                </span>
                                                                            </span>
                                                                    }
                                                                </td>
                                                        }
                                                        <td>
                                                            <div className="flex justify-center items-center gap-1">
                                                                <button onClick={() => { handleEditButton(item) }} className="bg-green-400 rounded hover:bg-green-500">
                                                                    <span className="text-white p-2">Edit</span>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                    :
                                    <tbody>
                                        <tr>
                                            <td colSpan={7} className="text-center font-bold">Data Kosong</td>
                                        </tr>
                                    </tbody>
                            }
                        </table>
                    </div>
                </div>
                {
                    modalEdit &&
                    <EditTagihan data={selectedData} setModalEdit={() => { setModalEdit(false) }} submitEditButton={submitEditButton} />
                }
            </div>
        </div>
    )

}

export default KelolaTagihan;