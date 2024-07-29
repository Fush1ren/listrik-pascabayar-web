/**
 * @file /admin/kelola-penggunaan/add/page.js
 * @module AddKelolaPenggunaan
 * @description Komponen untuk menambah data Penggunaan Listrik baru.
 */


'use client'

import { useEffect, useState } from "react"
import { getApiRes, postApiRes } from "@/utils/api_lib"
import { redirect, useRouter } from "next/navigation";
import SideBar from "@/app/_components/admin/SideBar";

/**
 * Komponen addKelolaPenggunaan.
 * Menampilkan form untuk menambah data penggunaan listrik baru.
 * @returns {JSX.Element} Elemen JSX yang menampilkan form tambah data penggunaan listrik.
 */
const AddKelolaPenggunaan = () => {
    const [bulan, setBulan] = useState(0);
    const [tahun, setTahun] = useState('');
    const [meterAwal, setMeterAwal] = useState('');
    const [meterAkhir, setMeterAkhir] = useState('');
    const [pelanggan, setPelanggan] = useState([]);
    const [selectedPelanggan, setSelectedPelanggan] = useState(0);

    const router = useRouter();

    const daftarBulan = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli",
        "Agustus", "September", "Oktober", "November", "Desember"
    ];

    /**
     * Mengubah pelanggan yang dipilih.
     * @param {Object} e - Event yang terjadi saat pelanggan diubah.
     */
    const handlePelangganChange = (e) => {
        setSelectedPelanggan(e.target.value);
    };

    /**
     * Mengubah bulan yang dipilih.
     * @param {Object} e - Event yang terjadi saat bulan diubah.
     */
    const handleBulanChange = (e) => {
        setBulan(e.target.value);
    }

    /**
     * Mengubah tahun yang diinput.
     * @param {Object} e - Event yang terjadi saat tahun diubah.
     */
    const tahunHandler = (e) => {
        setTahun(e.target.value);
    }

    /**
     * Mengubah meter awal yang diinput.
     * @param {Object} e - Event yang terjadi saat meter awal diubah.
     */
    const meterAwalHandler = (e) => {
        setMeterAwal(e.target.value);
    }

    /**
     * Mengubah meter akhir yang diinput.
     * @param {Object} e - Event yang terjadi saat meter akhir diubah.
     */
    const meterAkhirHandler = (e) => {
        setMeterAkhir(e.target.value);
    }

    /**
     * Mereset semua input.
     */
    const handleReset = () => {
        setSelectedPelanggan(selectedPelanggan)
        setBulan(bulan)
        setTahun('')
        setMeterAwal('')
        setMeterAkhir('')
    }

    /**
     * Mengirimkan form data penggunaan ke API.
     * @param {Object} e - Event yang terjadi saat form disubmit.
     * @async
     */
    const submitForm = async (e) => {
        e.preventDefault();
        let newPelanggan = pelanggan[selectedPelanggan]?.id_pelanggan;
        let newBulan = daftarBulan[bulan];

        try {
            const value = {
                id_pelanggan: parseInt(newPelanggan),
                bulan: newBulan,
                tahun: tahun,
                meter_awal: parseInt(meterAwal),
                meter_akhir: parseInt(meterAkhir),
            }
            const api = await postApiRes(`/penggunaan`, value);

            if (api.result.error.length > 0) return console.log(api.result.error);
            alert('Data berhasil ditambahkan!');

            setTimeout(() => {
                router.push(`/admin/kelola-penggunaan`)
            }, 2000);

        } catch (e) {
            console.log(e)
        }
    }

    /**
     * Mengambil data pelanggan dari API.
     * @async
     */
    const getPelangganData = async () => {
        try {
            const api = await getApiRes(`/pelanggan`);
            if (api?.result?.error?.length > 0) return console.log(api?.result?.error)
            setPelanggan(api?.result?.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem('dataUser'))
        if (storage?.islogin === true && storage?.level === 'admin') {
            getPelangganData()
        } else {
            redirect('/login/admin')
        }

    }, [])

    return (
        <div className="flex bg-[#F8F8F8] w-full h-screen">
            <SideBar />
            <div className="w-full text-[#6B6B6B] h-full">
                <div>
                    <div className={`p-8 h-full overflow-auto`}>
                        <div className="pb-2">
                            <h1 className="text-2xl font-bold">Tambah Data Penggunaan</h1>
                        </div>
                        <div className="w-full">
                            <form method="POST" onSubmit={submitForm}>
                                <div className="flex flex-row py-2">
                                    <div className="flex flex-col py-2">
                                        <label className="font-bold">Nama Pelanggan</label>
                                        <select required className="border border-black rounded text-black" value={selectedPelanggan} onChange={handlePelangganChange}>
                                            {
                                                pelanggan?.map((item, index) => {
                                                    return (
                                                        <option key={index} value={index}>
                                                            {item?.nama_pelanggan}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-row py-2">
                                    <div className="flex flex-col py-2">
                                        <label className="font-bold">Bulan</label>
                                        <select required className="border border-black rounded" value={bulan} onChange={handleBulanChange}>
                                            {
                                                daftarBulan?.map((item, index) => {
                                                    return (
                                                        <option key={index} value={index}>
                                                            {item}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-row py-2 w-[600px] gap-8">
                                    <div className="flex flex-col py-2">
                                        <label>Tahun</label>
                                        <input value={tahun} onChange={tahunHandler} required type="text" className="text-black border border-black" />
                                    </div>
                                </div>
                                <div className="flex flex-row py-2 gap-8">
                                    <div className="flex flex-col py-2">
                                        <label>Meter Awal</label>
                                        <input value={meterAwal} onChange={meterAwalHandler} required type="number" className="text-black border border-black" />
                                    </div>
                                    <div className="flex flex-col py-2">
                                        <label>Meter Akhir</label>
                                        <input value={meterAkhir} onChange={meterAkhirHandler} required type="number" className="text-black border border-black" />
                                    </div>
                                </div>
                                <div className="flex flex-row gap-4 py-4">
                                    <button type="submit" className="border bg-green-400 rounded hover:bg-green-500">
                                        <span className="text-white p-4">Submit</span>
                                    </button>
                                    <button onClick={handleReset} type="reset" className="border bg-red-400 rounded hover:bg-red-500 bg-5">
                                        <span className="text-white p-4">Reset</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default AddKelolaPenggunaan;