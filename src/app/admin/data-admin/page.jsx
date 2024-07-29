/**
 * @file /admin/data-admin/page.js
 * @module DataAdmin
 * @description Komponen untuk mengelola data admin.
 */

'use client'

import { useEffect, useState } from "react"
import { deleteApiRes, getApiRes, patchApiRes } from "@/utils/api_lib"
import { redirect, useRouter } from "next/navigation";
import SideBar from "@/app/_components/admin/SideBar";
import EditAdmin from "@/app/_components/admin/EditAdmin";

/**
 * Komponen DataAdmin.
 * Menampilkan tabel data admin dan menyediakan fitur untuk menambah, mengedit, dan menghapus admin.
 * @returns {JSX.Element} Elemen JSX yang menampilkan tabel data admin.
 */
const DataAdmin = () => {
    const [admin, setadmin] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [modalEdit, setModalEdit] = useState(false);

    const router = useRouter();

    /**
     * Mengambil data admin dari API dan mengatur state admin.
     * @async
     * @function
     */
    const getAdmin = async () => {
        const api = await getApiRes(`/user`);
        if (api.result.error.length > 0) return console.log(api.result.error);
        return setadmin(api?.result?.data);
    }

    /**
     * Menangani klik tombol edit dengan membuka modal edit.
     * @param {Object} item - Data admin yang akan diedit.
     */
    const handleEditButton = (item) => {
        setSelectedData(item);
        setModalEdit(true);
    }

    /**
     * Mengirim data yang telah diedit ke API dan mengatur ulang modal edit.
     * @async
     * @function
     * @param {number} data - ID pengguna yang akan diedit.
     * @param {Object} value - Data baru yang akan dikirim.
     */
    const submitEditButton = async (data, value) => {
        try {
            const api = await patchApiRes(`/user?id_user=${parseInt(data)}`, value);

            if (api.result.error.length > 0) return console.log(api.result.error);
            alert('Data Berhasil Diubah!')

            setModalEdit(false)
            setTimeout(() => {
                window.location.reload();
            }, 2000);

        } catch (e) {
            console.log(e)
        }
    }

    /**
     * Menangani klik tombol tambah dengan mengarahkan ke halaman tambah admin.
     */
    const handleTambahButton = () => {
        router.push(`/admin/data-admin/add`);
    }

    /**
    * Menangani klik tombol hapus dengan menghapus data admin dari API.
    * @async
    * @function
    * @param {number} id_user - ID pengguna yang akan dihapus.
    */
    const handleDeleteButton = async (id_user) => {
        let text = "Apakah anda yakin ingin menghapus data?\nTekan OK atau Cancel."

        if (confirm(text) == true) {
            try {
                const api = await deleteApiRes(`/user?id_user=${id_user}`);
                if (api.result.error.length > 0) return console.log(api.result.error);
                alert('Data Berhasil Dihapus!')
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
            getAdmin()
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
                        <h1 className="text-2xl font-bold">Kelola Data Admin</h1>
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
                                    <th className="py-4 bg-[#451CB8]">Nama Admin</th>
                                    <th className="py-4 bg-[#451CB8]">Level</th>
                                    <th className="py-4 bg-[#451CB8]">Action</th>
                                </tr>
                            </thead>
                            {
                                admin?.length > 0 ?
                                    <tbody className="text-center">
                                        {
                                            admin?.map((item, index) => {
                                                return (
                                                    <tr key={index} className=" odd:bg-white even:bg-[#E7E9EB]">
                                                        <td>{index + 1}</td>
                                                        <td>{item?.username}</td>
                                                        <td>{item?.password}</td>
                                                        <td>{item?.nama_admin}</td>
                                                        <td>{item?.level?.nama_level}</td>
                                                        <td>
                                                            <div className="flex justify-center items-center gap-1">
                                                                <button onClick={() => { handleEditButton(item) }} className="bg-green-400 rounded hover:bg-green-500">
                                                                    <span className="text-white p-2">Edit</span>
                                                                </button>
                                                                <span className="text-gray-400">/</span>
                                                                <button className="bg-red-400 rounded hover:bg-red-500" onClick={() => handleDeleteButton(item?.id_user)}>
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
                                            <td colSpan={6} className="text-center font-bold">Data Kosong</td>
                                        </tr>
                                    </tbody>
                            }
                        </table>
                    </div>
                </div>
                {
                    modalEdit &&
                    <EditAdmin data={selectedData} setModalEdit={() => { setModalEdit(false) }} submitEditButton={submitEditButton} />
                }
            </div>
        </div>
    )

}

export default DataAdmin;