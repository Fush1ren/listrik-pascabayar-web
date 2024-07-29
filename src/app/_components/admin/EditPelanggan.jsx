'use client'

import { getApiRes } from "@/utils/api_lib";
import { useEffect, useState } from "react"
import { redirect } from "next/navigation";

/**
 * Komponen untuk mengedit data pelanggan.
 * 
 * @component
 * @param {Object} props - Properti yang diberikan ke komponen ini.
 * @param {Object} props.data - Data pelanggan yang akan diedit.
 * @param {Function} props.setModalEdit - Fungsi untuk menutup modal edit.
 * @param {Function} props.submitEditButton - Fungsi untuk mengirimkan data yang sudah diedit.
 */
const EditPelanggan = ({ data, setModalEdit, submitEditButton }) => {
    const [username, setUsername] = useState(data?.username);
    const [password, setPassword] = useState(data?.password);
    const [namaPelanggan, setnamaPelanggan] = useState(data?.nama_pelanggan);
    const [nomorKwh, setNomorKwh] = useState(data?.nomor_kwh);
    const [alamat, setAlamat] = useState(data?.alamat);
    const [tarif, setTarif] = useState([]);
    const [selectedTarif, setSelectedTarif] = useState(data?.id_tarif);

    /**
     * Mengubah nilai username.
     * 
     * @param {Object} e - Event yang dipicu oleh input.
     */
    const usernameHandle = (e) => {
        setUsername(e.target.value);
    };

    /**
     * Mengubah nilai password.
     * 
     * @param {Object} e - Event yang dipicu oleh input.
     */
    const passwordHandle = (e) => {
        setPassword(e.target.value);
    };

    /**
     * Mengubah nilai nomor Kwh.
     * 
     * @param {Object} e - Event yang dipicu oleh input.
     */
    const nomorKwhHandle = (e) => {
        setNomorKwh(e.target.value);
    };

    /**
     * Mengubah nilai alamat.
     * 
     * @param {Object} e - Event yang dipicu oleh input.
     */
    const alamatHandle = (e) => {
        setAlamat(e.target.value);
    };

    /**
     * Mengubah nilai nama pelanggan.
     * 
     * @param {Object} e - Event yang dipicu oleh input.
     */
    const handleNamaPelanggan = (e) => {
        setnamaPelanggan(e.target.value);
    };

    /**
     * Mengubah nilai tarif yang dipilih.
     * 
     * @param {Object} e - Event yang dipicu oleh input.
     */
    const handleTarifChange = (e) => {
        setSelectedTarif(e.target.value);
    };

    /**
     * Mengirimkan data yang sudah diedit.
     */
    const submitHandle = async () => {
        try {
            const value = {
                username: username.toLowerCase(),
                password: password,
                nama_pelanggan: namaPelanggan,
                nomor_kwh: nomorKwh,
                alamat: alamat,
                id_tarif: parseInt(selectedTarif)
            }
            submitEditButton(data?.id_pelanggan, value)
        } catch (e) {
            console.log(e)
        }
    }

    /**
     * Mendapatkan data tarif dari API.
     */
    const getTarif = async () => {
        try {
            const api = await getApiRes(`/tarif`);
            if (api.result.error.length > 0) return console.log(api.result.error);
            setTarif(api?.result?.data)
        } catch (e) {
            console.log(e);
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
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
                <h2 className="text-xl mb-4">Edit Data</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={usernameHandle}
                            className="w-full border border-gray-300 px-2 py-1 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={passwordHandle}
                            className="w-full border border-gray-300 px-2 py-1 rounded"
                        />
                        <div className="mb-4">
                            <label className="block text-gray-700">Nama Pelanggan</label>
                            <input
                                type="text"
                                value={namaPelanggan}
                                onChange={handleNamaPelanggan}
                                className="w-full border border-gray-300 px-2 py-1 rounded"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nomor Kwh</label>
                        <input
                            type="text"
                            value={nomorKwh}
                            onChange={nomorKwhHandle}
                            className="w-full border border-gray-300 px-2 py-1 rounded"
                        />
                        <div className="mb-4">
                            <label className="block text-gray-700">Alamat</label>
                            <input
                                type="text"
                                value={alamat}
                                onChange={alamatHandle}
                                className="w-full border border-gray-300 px-2 py-1 rounded"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col py-2">
                        <label>Daya</label>
                        <select className="w-[200px] border border-black rounded" value={selectedTarif} required onChange={handleTarifChange}>
                            {
                                tarif?.map((item, index) => {
                                    return (
                                        <option key={index} value={item?.id_tarif}>
                                            {item?.daya}VA
                                        </option>
                                    )
                                })
                            }
                        </select>
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

export default EditPelanggan;