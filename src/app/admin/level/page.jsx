/**
 * @file /admin/level/page.js
 * @module KelolalevelPel
 * @description Komponen untuk mengelola data Level admin.
 */

'use client'

import { useEffect, useState } from "react"
import { deleteApiRes, getApiRes, patchApiRes } from "@/utils/api_lib"
import { redirect, useRouter } from "next/navigation";
import SideBar from "@/app/_components/admin/SideBar";
import EditLevel from "@/app/_components/admin/EditLevel";

/**
 * Komponen utama untuk mengelola level.
 * @returns {JSX.Element} Elemen JSX yang mewakili halaman pengelolaan level.
 */
const KelolalevelPel = () => {
    const [level, setLevel] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [modalEdit, setModalEdit] = useState(false);

    const router = useRouter();

    /**
     * Mengambil data level dari API.
     * @async
     * @function
     * @returns {Promise<void>}
     */
    const getLevel = async () => {
        const api = await getApiRes(`/level`);
        if (api.result.error.length > 0) return console.log(api.result.error);
        return setLevel(api?.result?.data);
    }

    /**
     * Mengatur data yang akan diedit dan menampilkan modal edit.
     * @param {Object} item - Data level yang akan diedit.
     */
    const handleEditButton = (item) => {
        setSelectedData(item);
        setModalEdit(true);
    }

    /**
     * Mengirim data yang telah diedit ke API.
     * @async
     * @function
     * @param {number} data - ID level yang akan diedit.
     * @param {Object} value - Data baru untuk level.
     * @returns {Promise<void>}
     */
    const submitEditButton = async (data, value) => {
        try {
            const api = await patchApiRes(`/level?id_level=${parseInt(data)}`, value);

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
     * Mengarahkan ke halaman tambah level.
     */
    const handleTambahButton = () => {
        router.push(`/admin/level/add`);
    }

    /**
     * Menghapus level dari API.
     * @async
     * @function
     * @param {number} id_level - ID level yang akan dihapus.
     * @returns {Promise<void>}
     */
    const handleDeleteButton = async (id_level) => {
        let text = "Apakah anda yakin ingin menghapus data?\nTekan OK atau Cancel."

        if (confirm(text) == true) {
            try {
                const api = await deleteApiRes(`/level?id_level=${id_level}`);
                if (api.result.error.length > 0) return console.log(api.result.error);
                alert('Data berhasil dihapus!')

                setTimeout(() => {
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
            getLevel()
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
                        <h1 className="text-2xl font-bold">Kelola Level</h1>
                        <button className="bg-blue-400 hover:bg-blue-500 rounded" onClick={(e) => { handleTambahButton() }}>
                            <span className="text-white p-4">Tambah Data</span>
                        </button>
                    </div>
                    <div className="">
                        <table className="w-full border-collapse py-2 overflow-auto rounded-l-full">
                            <thead>
                                <tr className="border-2 text-white">
                                    <th className="py-4 bg-[#451CB8]">No</th>
                                    <th className="py-4 bg-[#451CB8]">Nama Level</th>
                                    <th className="py-4 bg-[#451CB8]">Action</th>
                                </tr>
                            </thead>
                            {
                                level?.length > 0 ?
                                    <tbody className="text-center">
                                        {
                                            level?.map((item, index) => {
                                                return (
                                                    <tr key={index} className=" odd:bg-white even:bg-[#E7E9EB]">
                                                        <td>{index + 1}</td>
                                                        <td>{item?.nama_level}</td>
                                                        <td>
                                                            <div className="flex justify-center items-center gap-1">
                                                                <button onClick={() => { handleEditButton(item) }} className="bg-green-400 rounded hover:bg-green-500">
                                                                    <span className="text-white p-2">Edit</span>
                                                                </button>
                                                                <span className="text-gray-400">/</span>
                                                                <button className="bg-red-400 rounded hover:bg-red-500" onClick={() => handleDeleteButton(item?.id_level)}>
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
                                        <tr>
                                            <td colSpan="3" className="text-center font-bold">Data Kosong</td>
                                        </tr>
                                    </tbody>
                            }
                        </table>
                    </div>
                </div>
                {
                    modalEdit &&
                    <EditLevel data={selectedData} setModalEdit={() => { setModalEdit(false) }} submitEditButton={submitEditButton} />
                }
            </div>
        </div>
    )

}

export default KelolalevelPel;