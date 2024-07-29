'use client'
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
/**
 * Komponen untuk mengedit data tagihan listrik.
 * 
 * @component
 * @param {Object} props - Properti yang diberikan ke komponen ini.
 * @param {Object} props.data - Data tagihan yang akan diedit.
 * @param {Function} props.setModalEdit - Fungsi untuk menutup modal edit.
 * @param {Function} props.submitEditButton - Fungsi untuk mengirimkan data yang sudah diedit.
 */
const EditTagihan = ({ data, setModalEdit, submitEditButton }) => {
    const [idAdmin, setIdAdmin] = useState('');
    const [bulan, setBulan] = useState(data?.penggunaan?.bulan);
    const [tahun, setTahun] = useState(data?.penggunaan?.tahun);
    const [jumlahMeter, setJumlahMeter] = useState(data?.jumlah_meter);
    const [status, setStatus] = useState(false);

    /**
     * Daftar bulan.
     * @type {Array<string>}
     * @constant
     * @default
     * @description List Daftar Bulan
    */
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
     * Mengubah nilai jumlah meter.
     * 
     * @param {Object} e - Event yang dipicu oleh input.
     */
    const jumlahMeterHandler = (e) => {
        setJumlahMeter(e.target.value);
    }

    /**
     * Mengubah nilai status.
     */
    const statusHandler = () => {
        setStatus(!status);
    }

    /**
     * Mengirimkan data yang sudah diedit.
     */
    const submitHandle = async () => {
        let newStatus;
        if (status == true) {
            newStatus = parseInt(data?.status + 1)
        }
        try {
            if (newStatus === parseInt(data?.status) || status === false) {
                return window.location.reload();
            }
            else {
                const value = {
                    id_user: parseInt(idAdmin),
                    status: parseInt(newStatus),
                }
                submitEditButton(data?.id_tagihan, value)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem('dataUser'))
        if (storage?.islogin === true && storage?.level === 'admin') {
            setIdAdmin(storage?.data?.id_user)
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
                        <select disabled className="border border-black rounded" required value={bulan} onChange={handleBulanChange}>
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
                            disabled
                            className="w-full border border-gray-300 px-2 py-1 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Jumlah Meter</label>
                        <input
                            type="number"
                            value={jumlahMeter}
                            onChange={jumlahMeterHandler}
                            disabled
                            className="w-full border border-gray-300 px-2 py-1 rounded"
                        />
                    </div>
                    <div className="mb-4 flex gap-2">
                        {
                            data?.status == 2
                                ?
                                <>
                                    <label className=" text-gray-700">Status</label>
                                    <input
                                        type="checkbox"
                                        value={status}
                                        onChange={statusHandler}
                                        className="px-2 border border-gray-300 rounded"
                                    />
                                </>
                                :
                                <>
                                    <label className=" text-gray-700">Status</label>
                                    <input
                                        disabled
                                        type="checkbox"
                                        className="border border-gray-300 px-2 py-1 rounded"
                                    />
                                </>
                        }

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

export default EditTagihan;