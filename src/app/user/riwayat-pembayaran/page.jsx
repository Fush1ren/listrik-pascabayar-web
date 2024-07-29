/**
 * @file /user/riwayat-pembayaran/page.js
 * @module RiwayatPembayaran
 * @description Komponen untuk menampilkan Riwayat Pembayaran Pelanggan.
 */

'use client'
import SideBar from "@/app/_components/user/SideBar"
import { getApiRes } from "@/utils/api_lib";
import moment from "moment";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Komponen RiwayatPembayaran.
 * Menampilkan riwayat pembayaran berdasarkan id_pelanggan yang tersimpan di localStorage.
 * @returns {JSX.Element} Elemen JSX yang menampilkan halaman riwayat pembayaran.
 */
const RiwayatPembayaran = () => {
    const [dataPembayaran, setDataPembayaran] = useState([]);

    /**
     * Mengonversi nilai integer ke format mata uang Rupiah.
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
     * Mengambil bagian tanggal dari inputDate.
     * @param {string} inputDate - Tanggal dalam format YYYY-MM-DD.
     * @returns {string} Tanggal dalam format DD-MM-YYYY.
     */
    function getDatePart(inputDate) {
        // Parse the input date
        const date = moment(inputDate, 'YYYY-MM-DD');

        // Extract and return the date part
        return date.format('DD-MM-YYYY');
    }

    /**
     * Mengambil data pembayaran dari API berdasarkan id_pelanggan.
     * @async
     * @function
     * @param {string} id - ID pelanggan.
     * @returns {Promise<void>}
     */
    const getDataPembayaran = async (id) => {
        const api = await getApiRes(`/pembayaran?id_pelanggan=${id}&user=pelanggan`);
        if (api.result.error.length > 0) return console.log(api.result.error);
        return setDataPembayaran(api?.result?.data);
    }

    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem('dataUser'))
        if (storage?.islogin === true && storage?.level === 'pelanggan') {
            getDataPembayaran(storage?.data?.id_pelanggan)
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
                        <h1 className="text-2xl font-bold">Riwayat Pembayaran</h1>
                    </div>
                    <div className="">
                        <table className="w-full border-collapse py-2 overflow-auto rounded-l-full">
                            <thead>
                                <tr className="border-2 text-white">
                                    <th className="py-4 bg-[#451CB8]">No</th>
                                    <th className="py-4 bg-[#451CB8]">Nama Pelanggan</th>
                                    <th className="py-4 bg-[#451CB8]">Tanggal Pembayaran</th>
                                    <th className="py-4 bg-[#451CB8]">Bulan Bayar</th>
                                    <th className="py-4 bg-[#451CB8]">Jumlah Meter</th>
                                    <th className="py-4 bg-[#451CB8]">Biaya Admin</th>
                                    <th className="py-4 bg-[#451CB8]">Total Bayar</th>
                                    <th className="py-4 bg-[#451CB8]">Status</th>
                                    <th className="py-4 bg-[#451CB8]">Admin</th>
                                </tr>
                            </thead>
                            {
                                dataPembayaran.length > 0 ?
                                    <tbody className="text-center">
                                        {
                                            dataPembayaran?.map((item, index) => {
                                                return (
                                                    <tr key={index} className=" odd:bg-white even:bg-[#E7E9EB]">
                                                        <td>{index + 1}</td>
                                                        <td>{item?.pelanggan?.nama_pelanggan}</td>
                                                        <td>{getDatePart(item?.tanggal_pembayaran)}</td>
                                                        <td>{item?.bulan_bayar}</td>
                                                        <td>{item?.tagihan?.jumlah_meter}</td>
                                                        <td>{integerToRupiah(item?.biaya_admin)}</td>
                                                        <td>{integerToRupiah(item?.total_bayar)}</td>
                                                        <td>
                                                            {
                                                                item?.tagihan?.status === 2
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
                                                        <td>
                                                            {
                                                                item?.user != null
                                                                    ?
                                                                    item?.user?.nama_admin
                                                                    :
                                                                    '-'
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                    :
                                    <tbody>
                                        <tr>
                                            <td colSpan="9" className="text-center font-bold">Data Pembayaran Kosong</td>
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

export default RiwayatPembayaran;