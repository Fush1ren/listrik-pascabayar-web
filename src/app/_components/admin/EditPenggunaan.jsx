'use client'
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
/**
 * Komponen untuk mengedit data penggunaan listrik.
 * 
 * @component
 * @param {Object} props - Properti yang diberikan ke komponen ini.
 * @param {Object} props.data - Data penggunaan yang akan diedit.
 * @param {Function} props.setModalEdit - Fungsi untuk menutup modal edit.
 * @param {Function} props.submitEditButton - Fungsi untuk mengirimkan data yang sudah diedit.
 */
const EditPenggunaan = ({ data, setModalEdit, submitEditButton }) => {

    const [bulan, setBulan] = useState(data?.bulan);
    const [tahun, setTahun] = useState(data?.tahun);
    const [meterAwal, setMeterAwal] = useState(data?.meter_awal);
    const [meterAkhir, setMeterAkhir] = useState(data?.meter_akhir);

    const daftarBulan = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli",
        "Agustus", "September", "Oktober", "November", "Desember"
    ];
    /**
     * Mengubah nilai bulan.
     * 
     * @param {Object} e - Event yang dipicu oleh input.
     */
    const handleBulanChange = (e) => {
        setBulan(e.target.value);
    }

    /**
     * Mengubah nilai tahun.
     * 
     * @param {Object} e - Event yang dipicu oleh input.
     */
    const tahunHandler = (e) => {
        setTahun(e.target.value);
    }

    /**
     * Mengubah nilai meter awal.
     * 
     * @param {Object} e - Event yang dipicu oleh input.
     */
    const meterAwalHandler = (e) => {
        setMeterAwal(e.target.value);
    }

    /**
     * Mengubah nilai meter akhir.
     * 
     * @param {Object} e - Event yang dipicu oleh input.
     */
    const meterAkhirHandler = (e) => {
        setMeterAkhir(e.target.value);
    }

    /**
     * Mengirimkan data yang sudah diedit.
     */
    const submitHandle = async () => {
        try {
            const value = {
                id_pelanggan: parseInt(data?.id_pelanggan),
                bulan: bulan,
                tahun: tahun,
                meter_awal: parseInt(meterAwal),
                meter_akhir: parseInt(meterAkhir),
            }
            submitEditButton(data?.id_penggunaan, value)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem('dataUser'))
        if (storage?.islogin === true && storage?.level === 'admin') {
            return;
        } else {
            redirect('/login/admin')
        }

    }, [])

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
                <h2 className="text-xl mb-4">Edit Data</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nama Pelanggan</label>
                        <input
                            disabled
                            type="text"
                            value={data?.pelanggan?.nama_pelanggan}
                            className="w-full border border-gray-300 px-2 py-1 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Bulan</label>
                        <select className="border border-black rounded" value={bulan} onChange={handleBulanChange}>
                            {
                                daftarBulan?.map((item, index) => {
                                    return (
                                        <option key={index} value={item}>
                                            {item}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Tahun</label>
                        <input
                            type="text"
                            value={tahun}
                            onChange={tahunHandler}
                            className="w-full border border-gray-300 px-2 py-1 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Meter Awal</label>
                        <input
                            type="number"
                            value={meterAwal}
                            onChange={meterAwalHandler}
                            className="w-full border border-gray-300 px-2 py-1 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Meter Akhir</label>
                        <input
                            type="number"
                            value={meterAkhir}
                            onChange={meterAkhirHandler}
                            className="w-full border border-gray-300 px-2 py-1 rounded"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => submitHandle()}
                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={() => setModalEdit()}
                            className="bg-gray-500 text-white px-4 py-2 rounded">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditPenggunaan;