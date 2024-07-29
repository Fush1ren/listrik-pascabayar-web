/**
 * @file /admin/data-pelanggan/page.js
 * @module DataPelanggan
 * @description Komponen untuk mengelola data Pelanggan.
 */

'use client'

import { useEffect, useState } from "react"
import { deleteApiRes, getApiRes, patchApiRes } from "@/utils/api_lib"
import { redirect, useRouter } from "next/navigation";
import SideBar from "@/app/_components/admin/SideBar";
import EditPelanggan from "@/app/_components/admin/EditPelanggan";

/**
 * Komponen DataPelanggan.
 * Menampilkan tabel data pelanggan dan menyediakan fitur untuk menambah, mengedit, dan menghapus pelanggan.
 * @returns {JSX.Element} Elemen JSX yang menampilkan tabel data pelanggan.
 */
const DataPelanggan = () => {
    const [pelanggan, setPelanggan] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [modalEdit, setModalEdit] = useState(false);

    const router = useRouter();

    /**
     * Mengambil data pelanggan dari API.
     * @async
     */
    const getPelanggan = async () => {
        try {
            const api = await getApiRes(`/pelanggan`) ?? [];
            if (api.result.error.length > 0) return console.log(api.result.error);
            return setPelanggan(api?.result?.data) ?? [];
        } catch (e) {
            console.log(e)
        }
    }

    /**
     * Mengatur data pelanggan yang dipilih untuk diedit.
     * @param {Object} item - Data pelanggan yang dipilih.
     */
    const handleEditButton = (item) => {
        setSelectedData(item);
        setModalEdit(true);
    }

    /**
     * Mengirim data yang diedit ke API.
     * @param {number} data - ID pelanggan.
     * @param {Object} value - Data pelanggan yang diedit.
     * @async
     */
    const submitEditButton = async (data, value) => {
        try {
            const api = await patchApiRes(`/pelanggan?id_pelanggan=${parseInt(data)}`, value);

            if (api.result.error.length > 0) return console.log(api.result.error);
            alert('Data Berhasil Diubah!')
            setModalEdit(false)
            location.reload();

        } catch (e) {
            console.log(e)
        }
    }

    /**
     * Mengarahkan pengguna ke halaman tambah data pelanggan.
     */
    const handleTambahButton = () => {
        router.push(`/admin/data-pelanggan/add`);
    }

    /**
     * Menghapus data pelanggan berdasarkan ID.
     * @param {number} id_pelanggan - ID pelanggan yang akan dihapus.
     * @async
     */
    const handleDeleteButton = async (id_pelanggan) => {
        let text = "Apakah anda yakin ingin menghapus data?\nTekan OK atau Cancel."

        if (confirm(text) == true) {
            try {
                const api = await deleteApiRes(`/pelanggan?id_pelanggan=${id_pelanggan}`);
                if (api.result.error.length > 0) return console.log(api.result.error);
                alert('Data Berhasil Dihapus!')
                location.reload();
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
            getPelanggan()
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
                        <h1 className="text-2xl font-bold">Kelola Data Pelanggan</h1>
                        <button className="bg-blue-400 hover:bg-blue-500 rounded" onClick={(e) => { handleTambahButton() }}>
                            <span className="text-white p-4">Tambah Data</span>
                        </button>
                    </div>
                    <div className="">
                        <table className="w-full border-collapse py-2 overflow-auto rounded-l-full">
                            <thead>
                                <tr className="border-2 text-white">
                                    <th className="py-4 bg-[#451CB8]">No</th>
                                    <th className="py-4 bg-[#451CB8]">Username</th>
                                    <th className="py-4 bg-[#451CB8]">Password</th>
                                    <th className="py-4 bg-[#451CB8]">Nama Pelanggan</th>
                                    <th className="py-4 bg-[#451CB8]">Nomor kWh</th>
                                    <th className="py-4 bg-[#451CB8]">Alamat</th>
                                    <th className="py-4 bg-[#451CB8]">Daya</th>
                                    <th className="py-4 bg-[#451CB8]">Action</th>
                                </tr>
                            </thead>
                            {
                                pelanggan?.length > 0 ?
                                    <tbody className="text-center">
                                        {
                                            pelanggan?.map((item, index) => {
                                                return (
                                                    <tr key={index} className=" odd:bg-white even:bg-[#E7E9EB]">
                                                        <td>{index + 1}</td>
                                                        <td>{item?.username}</td>
                                                        <td>{item?.password}</td>
                                                        <td>{item?.nama_pelanggan}</td>
                                                        <td>{item?.nomor_kwh}</td>
                                                        <td>{item?.alamat}</td>
                                                        <td>{item?.tarif?.daya}VA</td>
                                                        <td>
                                                            <div className="flex justify-center items-center gap-1">
                                                                <button onClick={() => { handleEditButton(item) }} className="bg-green-400 rounded hover:bg-green-500">
                                                                    Edit
                                                                    {/* <span className="text-white p-2">Edit</span> */}
                                                                </button>
                                                                <span className="text-gray-400">/</span>
                                                                <button className="bg-red-400 rounded hover:bg-red-500" onClick={() => handleDeleteButton(item?.id_pelanggan)}>
                                                                    Delete
                                                                    {/* <span className="text-white p-2">Delete</span> */}
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                    :
                                    <tbody className="text-center">
                                        <tr>
                                            <td colSpan="8" className="font-bold">Data Kosong</td>
                                        </tr>
                                    </tbody>
                            }
                        </table>
                    </div>
                </div>
                {
                    modalEdit &&
                    <EditPelanggan data={selectedData} setModalEdit={() => { setModalEdit(false) }} submitEditButton={submitEditButton} />
                }
            </div>
        </div>
    )

}

export default DataPelanggan;