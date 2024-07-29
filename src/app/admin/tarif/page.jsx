/**
 * @file /admin/tarif/page.js
 * @module KelolatarifAdm
 * @description Komponen untuk mengelola data tarif listrik.
 */

'use client'

import { useEffect, useState } from "react"
import { deleteApiRes, getApiRes, patchApiRes } from "@/utils/api_lib"
import { redirect, useRouter } from "next/navigation";
import SideBar from "@/app/_components/admin/SideBar";
import EditTarif from "@/app/_components/admin/EditTarif";

/**
 * Komponen untuk mengelola tarif.
 * @returns {JSX.Element} Elemen JSX yang mewakili halaman pengelolaan tarif.
 */
const KelolatTarifAdm = () => {
    const [dataTarif, setTarif] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [modalEdit, setModalEdit] = useState(false);


    const router = useRouter();

    /**
     * Mengambil data tarif dari API.
     * @async
     * @function
     * @returns {Promise<void>}
     */
    const getTarif = async () => {
        const api = await getApiRes(`/tarif`);
        if (api.result.error.length > 0) return console.log(api.result.error);
        return setTarif(api?.result?.data);
    }

    /**
     * Mengatur data yang dipilih untuk diedit dan membuka modal edit.
     * @param {Object} item - Data tarif yang dipilih.
     */
    const handleEditButton = (item) => {
        setSelectedData(item);
        setModalEdit(true);
    }

    /**
     * Mengonversi nilai integer ke dalam format mata uang Rupiah.
     * @param {number} value - Nilai yang akan dikonversi.
     * @returns {string} Nilai dalam format mata uang Rupiah.
     */
    function integerToRupiah(value) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(value)
    }


    /**
     * Mengirimkan data edit tarif ke API.
     * @async
     * @function
     * @param {number} data - ID tarif yang akan diedit.
     * @param {Object} value - Data yang akan dikirimkan.
     * @returns {Promise<void>}
     */
    const submitEditButton = async (data, value) => {
        try {
            const api = await patchApiRes(`/tarif?id_tarif=${parseInt(data)}`, value);

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
     * Mengarahkan pengguna ke halaman tambah tarif.
     */
    const handleTambahButton = () => {
        router.push(`/admin/tarif/add`);
    }

    /**
     * Menghapus data tarif dari API.
     * @async
     * @function
     * @param {number} id_tarif - ID tarif yang akan dihapus.
     * @returns {Promise<void>}
     */
    const handleDeleteButton = async (id_tarif) => {
        let text = "Apakah anda yakin ingin menghapus data?\nTekan OK atau Cancel."

        if (confirm(text) == true) {
            try {
                const api = await deleteApiRes(`/tarif?id_tarif=${id_tarif}`);
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
            getTarif()
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
                        <h1 className="text-2xl font-bold">Kelola Tarif</h1>
                        <button className="bg-blue-400 hover:bg-blue-500 rounded" onClick={(e) => { handleTambahButton() }}>
                            <span className="text-white p-4">Tambah Data</span>
                        </button>
                    </div>
                    <div className="">
                        <table className="w-full border-collapse py-2 overflow-auto rounded-l-full">
                            <thead>
                                <tr className="border-2 text-white">
                                    <th className="py-4 bg-[#451CB8]">No</th>
                                    <th className="py-4 bg-[#451CB8]">Daya</th>
                                    <th className="py-4 bg-[#451CB8]">Tarif per kwh</th>
                                    <th className="py-4 bg-[#451CB8]">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {
                                    dataTarif?.map((item, index) => {
                                        return (
                                            <tr key={index} className=" odd:bg-white even:bg-[#E7E9EB]">
                                                <td>{index + 1}</td>
                                                <td>{item?.daya}VA</td>
                                                <td>{integerToRupiah(item?.tarifperkwh)}</td>
                                                <td>
                                                    <div className="flex justify-center items-center gap-1">
                                                        <button onClick={() => { handleEditButton(item) }} className="bg-green-400 rounded hover:bg-green-500">
                                                            <span className="text-white p-2">Edit</span>
                                                        </button>
                                                        <span className="text-gray-400">/</span>
                                                        <button className="bg-red-400 rounded hover:bg-red-500" onClick={() => handleDeleteButton(item?.id_tarif)}>
                                                            <span className="text-white p-2">Delete</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                {
                    modalEdit &&
                    <EditTarif data={selectedData} setModalEdit={() => { setModalEdit(false) }} submitEditButton={submitEditButton} />
                }
            </div>
        </div>
    )

}

export default KelolatTarifAdm;