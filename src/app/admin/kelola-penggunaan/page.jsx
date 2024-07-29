/**
 * @file /admin/kelola-penggunaan/page.js
 * @module DataAdmin
 * @description Komponen untuk mengelola data Penggunaan Listrik.
 */

'use client'

import { useEffect, useState } from "react"
import { deleteApiRes, getApiRes, patchApiRes } from "@/utils/api_lib"
import { redirect, useRouter, useSearchParams } from "next/navigation";
import SideBar from "@/app/_components/admin/SideBar";
import EditPenggunaan from "@/app/_components/admin/EditPenggunaan";

/**
 * Komponen KelolaPenggunaan.
 * Menampilkan tabel data penggunaan dan menyediakan fitur untuk menambah, mengubah, dan menghapus data penggunaan listrik pelanggan.
 * @returns {JSX.Element} Elemen JSX yang menampilkan tabel data penggunaan listrik pelanggan.
 */
const KelolaPenggunaan = () => {
    const [dataPenggunaan, setDataPenggunaan] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [modalEdit, setModalEdit] = useState(false);

    const router = useRouter();

    /**
     * Mengambil data penggunaan dari API.
     * @async
     */
    const getDataPenggunaan = async () => {
        const api = await getApiRes(`/penggunaan`);
        if (api.result.error.length > 0) return console.log(api.result.error);
        return setDataPenggunaan(api?.result?.data);
    }

    /**
     * Menangani tombol edit.
     * @param {Object} item - Data penggunaan yang akan diubah.
     * @returns {void}
     */
    const handleEditButton = (item) => {
        setSelectedData(item);
        setModalEdit(true);
    }

    /**
     * Mengirim perubahan data penggunaan ke API.
     * @param {number} data - ID penggunaan yang akan diedit.
     * @param {Object} value - Data penggunaan yang telah diubah.
     * @async
     */
    const submitEditButton = async (data, value) => {
        try {
            const api = await patchApiRes(`/penggunaan?id_penggunaan=${parseInt(data)}`, value);

            if (api.result.error.length > 0) return console.log(api.result.error);
            alert('Data berhasil diubah!')
            setModalEdit(false)
            setTimeout(() => {
                window.location.reload();
            }, 2000);

        } catch (e) {
            console.log(e)
        }
    }

    /**
     * Mengarahkan pengguna ke halaman tambah data penggunaan.
     */
    const handleTambahButton = () => {
        router.push(`/admin/kelola-penggunaan/add`);
    }

    /**
     * Menghapus data penggunaan berdasarkan id_penggunaan.
     * @param {number} id_penggunaan - ID penggunaan yang akan dihapus.
     * @async
     */
    const handleDeleteButton = async (id_penggunaan) => {
        let text = "Apakah anda yakin ingin menghapus data?\nTekan OK atau Cancel."

        if (confirm(text) == true) {
            try {
                const api = await deleteApiRes(`/penggunaan?id_penggunaan=${id_penggunaan}`);
                if (api.result.error.length > 0) return console.log(api.result.error);
                alert('Data berhasil dihapus!')

                setInterval(() => {
                    return window.location.reload();
                }, 1000);
            } catch (e) {
                console.log(e);
            }
        } else {
            return;
        }
    }

    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem('dataUser'))
        if (storage?.islogin === true && storage?.level === 'admin') {
            getDataPenggunaan()
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
                        <h1 className="text-2xl font-bold">Kelola Penggunaan</h1>
                        <button className="bg-blue-400 hover:bg-blue-500 rounded" onClick={(e) => { handleTambahButton() }}>
                            <span className="text-white p-4">Tambah Data</span>
                        </button>
                    </div>
                    <div className="">
                        <table className="w-full border-collapse py-2 overflow-auto rounded-l-full">
                            <thead>
                                <tr className="border-2 text-white">
                                    <th className="py-4 bg-[#451CB8]">No</th>
                                    <th className="py-4 bg-[#451CB8]">Nama Pelanggan</th>
                                    <th className="py-4 bg-[#451CB8]">Bulan</th>
                                    <th className="py-4 bg-[#451CB8]">Tahun</th>
                                    <th className="py-4 bg-[#451CB8]">Meter Awal</th>
                                    <th className="py-4 bg-[#451CB8]">Meter Akhir</th>
                                    <th className="py-4 bg-[#451CB8]">Action</th>
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
                                                        <td>{item?.pelanggan?.nama_pelanggan}</td>
                                                        <td>{item?.bulan}</td>
                                                        <td>{item?.tahun}</td>
                                                        <td>{item?.meter_awal}</td>
                                                        <td>{item?.meter_akhir}</td>
                                                        <td>
                                                            <div className="flex justify-center items-center gap-1">
                                                                <button onClick={() => { handleEditButton(item) }} className="bg-green-400 rounded hover:bg-green-500">
                                                                    <span className="text-white p-2">Edit</span>
                                                                </button>
                                                                <span className="text-gray-400">/</span>
                                                                <button className="bg-red-400 rounded hover:bg-red-500" onClick={() => handleDeleteButton(item?.id_penggunaan)}>
                                                                    <span className="text-white p-2">Delete</span>
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
                                        <tr className="text-center">
                                            <td colSpan="7" className="font-bold">Data Kosong</td>
                                        </tr>
                                    </tbody>
                            }
                        </table>
                    </div>
                </div>
                {
                    modalEdit &&
                    <EditPenggunaan data={selectedData} setModalEdit={() => { setModalEdit(false) }} submitEditButton={submitEditButton} />
                }
            </div>
        </div>
    )

}

export default KelolaPenggunaan;