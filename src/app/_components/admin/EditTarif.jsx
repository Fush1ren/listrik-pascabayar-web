'use client'

import { useEffect, useState } from "react"
import { redirect } from "next/navigation";
/**
 * Komponen untuk mengedit data tarif listrik.
 * 
 * @component
 * @param {Object} props - Properti yang diberikan ke komponen ini.
 * @param {Object} props.data - Data tarif yang akan diedit.
 * @param {Function} props.setModalEdit - Fungsi untuk menutup modal edit.
 * @param {Function} props.submitEditButton - Fungsi untuk mengirimkan data yang sudah diedit.
 */
const EditTarif = ({ data, setModalEdit, submitEditButton }) => {
    const [daya, setDaya] = useState(data?.daya);
    const [tarifperkwh, setTarifPerkwh] = useState(data?.tarifperkwh);

    /**
     * Mengubah nilai daya.
     * 
     * @param {Object} e - Event yang dipicu oleh input.
     */
    const dayaHandle = (e) => {
        setDaya(e.target.value)
    }

    /**
    * Mengubah nilai tarif per kWh.
    * 
    * @param {Object} e - Event yang dipicu oleh input.
    */
    const tpkHandler = (e) => {
        setTarifPerkwh(e.target.value)
    }

    /**
     * Mengirimkan data yang sudah diedit.
     */
    const submitHandle = async () => {
        try {
            const value = {
                daya: parseInt(daya),
                tarifperkwh: parseFloat(tarifperkwh),
            }
            submitEditButton(data?.id_tarif, value)
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
                        <label className="block text-gray-700">Daya</label>
                        <input
                            type="text"
                            value={daya}
                            onChange={dayaHandle}
                            className="w-full border border-gray-300 px-2 py-1 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Tarif perkwh</label>
                        <input
                            type="text"
                            value={tarifperkwh}
                            onChange={tpkHandler}
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

export default EditTarif;