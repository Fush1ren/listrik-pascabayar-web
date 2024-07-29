'use client'

import { useEffect, useState } from "react"
import { redirect } from "next/navigation";
/**
 * Komponen untuk mengedit level.
 * 
 * @component
 * @param {Object} props Komponen props
 * @param {Object} props.data Data level yang akan diedit
 * @param {Function} props.setModalEdit Fungsi untuk menutup modal edit
 * @param {Function} props.submitEditButton Fungsi untuk mengirim data edit
 * @returns {JSX.Element} Komponen EditLevel
 */

const EditLevel = ({ data, setModalEdit, submitEditButton }) => {
    const [namaLevel, setNamaLevel] = useState(data?.nama_level);

    /**
     * Handler untuk perubahan input nama level.
     * 
     * @param {Object} e Event input
     */
    const namaHandle = (e) => {
        setNamaLevel(e.target.value)
    }

    /**
     * Handler untuk submit data edit.
     */
    const submitHandle = async () => {
        try {
            const value = {
                nama_level: namaLevel
            }
            submitEditButton(data?.id_level, value)
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
                        <label className="block text-gray-700">Nama Level</label>
                        <input
                            type="text"
                            value={namaLevel}
                            onChange={namaHandle}
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

export default EditLevel;