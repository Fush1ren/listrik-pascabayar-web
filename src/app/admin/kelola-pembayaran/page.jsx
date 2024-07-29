/**
 * @file /admin/kelola-pembayaran/page.js
 * @module KelolaPembayaran
 * @description Komponen untuk mengelola data Pembayaran.
 */

'use client'

import { useEffect, useState } from "react"
import { deleteApiRes, getApiRes } from "@/utils/api_lib"
import { redirect } from "next/navigation";
import moment from "moment";
import SideBar from "@/app/_components/admin/SideBar";

/**
 * Komponen KelolaPembayaran.
 * Menampilkan tabel data pembayaran dan menyediakan fitur untuk menghapus data pembayaran pelanggan.
 * @returns {JSX.Element} Elemen JSX yang menampilkan tabel data pembayaran.
 */
const KelolaPembayaran = () => {
    const [dataPembayaran, setDataPembayaran] = useState([]);

    /**
     * Mengambil data pembayaran dari API.
     * @async
     */
    const getDataPembayaran = async () => {
        const api = await getApiRes(`/pembayaran?user=admin`);
        if (api.result.error.length > 0) return console.log(api.result.error);
        return setDataPembayaran(api?.result?.data);
    }

    /**
     * Mengubah format tanggal menjadi DD-MM-YYYY.
     * @param {string} inputDate - Tanggal dalam format YYYY-MM-DD.
     * @returns {string} - Tanggal dalam format DD-MM-YYYY.
     */
    function getDatePart(inputDate) {
        const date = moment(inputDate, 'YYYY-MM-DD');
        return date.format('DD-MM-YYYY');
    }

    /**
     * Mengubah nilai integer menjadi format mata uang Rupiah.
     * @param {number} value - Nilai integer yang akan diubah.
     * @returns {string} - Nilai dalam format mata uang Rupiah.
     */
    function integerToRupiah(value) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(value)
    }

    /**
     * Menghapus data pembayaran berdasarkan id_pembayaran.
     * @param {number} id_pembayaran - ID pembayaran yang akan dihapus.
     * @async
     */
    const handleDeleteButton = async (id_pembayaran) => {
        let text = "Apakah anda yakin ingin menghapus data?\nTekan OK atau Cancel."

        if (confirm(text) == true) {
            try {
                const api = await deleteApiRes(`/pembayaran?id_pembayaran=${id_pembayaran}`);
                if (api.result.error.length > 0) return console.log(api.result.error);
                alert('Data berhasil dihapus!');

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
            getDataPembayaran()
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
                        <h1 className="text-2xl font-bold">Kelola Pembayaran</h1>
                    </div>
                    <div className="">
                        <table className="w-full border-collapse py-2 overflow-auto rounded-l-full">
                            <thead>
                                <tr className="border-2 text-white">
                                    <th className="py-4 bg-[#451CB8]">No</th>
                                    <th className="py-4 bg-[#451CB8]">Nama Pelanggan</th>
                                    <th className="py-4 bg-[#451CB8]">Tanggal Pembayaran</th>
                                    <th className="py-4 bg-[#451CB8]">Bulan</th>
                                    <th className="py-4 bg-[#451CB8]">Biaya Admin</th>
                                    <th className="py-4 bg-[#451CB8]">Total Bayar</th>
                                    <th className="py-4 bg-[#451CB8]">Status</th>
                                    <th className="py-4 bg-[#451CB8]">Nama Admin</th>
                                    <th className="py-4 bg-[#451CB8]">Action</th>
                                </tr>
                            </thead>
                            {
                                dataPembayaran?.length > 0 ?
                                    <tbody className="text-center">
                                        {
                                            dataPembayaran?.filter((i) => {
                                                return i?.tagihan?.status === 3
                                            }).map((item, index) => {
                                                return (
                                                    <tr key={index} className=" odd:bg-white even:bg-[#E7E9EB]">
                                                        <td>{index + 1}</td>
                                                        <td>{item?.pelanggan?.nama_pelanggan}</td>
                                                        <td>{getDatePart(item?.tanggal_pembayaran)}</td>
                                                        <td>{item?.bulan_bayar}</td>
                                                        <td>{integerToRupiah(item?.biaya_admin)}</td>
                                                        <td>{integerToRupiah(item?.total_bayar)}</td>
                                                        <td>
                                                            {
                                                                item?.tagihan?.status == 3 || item?.tagihan?.status == null
                                                                    ?
                                                                    <span className="bg-green-500 rounded">
                                                                        <span className="text-white p-4 text-sm">
                                                                            Sudah dibayar
                                                                        </span>
                                                                    </span>
                                                                    :
                                                                    ''
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item?.user?.nama_admin != null
                                                                    ?
                                                                    <span className="font-semibold">
                                                                        {item.user?.nama_admin}
                                                                    </span>
                                                                    :
                                                                    ''
                                                            }
                                                        </td>
                                                        <td>
                                                            <div className="flex justify-center items-center gap-1">
                                                                <button className="bg-red-400 rounded hover:bg-red-500" onClick={() => handleDeleteButton(item?.id_pembayaran)}>
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
                                    <tbody className="text-center">
                                        <tr>
                                            <td colSpan="8" className="font-bold">Data Kosong</td>
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

export default KelolaPembayaran;