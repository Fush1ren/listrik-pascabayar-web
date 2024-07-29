'use client'

import { redirect } from "next/navigation";
import { getApiRes } from "@/utils/api_lib";
import { useEffect, useState } from "react"

/**
 * Komponen EditAdmin untuk mengedit data admin.
 *
 * @param {Object} props - Properti yang diberikan ke komponen ini.
 * @param {Object} props.data - Data awal admin.
 * @param {Function} props.setModalEdit - Fungsi untuk menutup modal edit.
 * @param {Function} props.submitEditButton - Fungsi untuk mengirim data yang telah diedit.
 * @returns {JSX.Element} Komponen EditAdmin.
 */
const EditAdmin = ({ data, setModalEdit, submitEditButton }) => {
    const [username, setUsername] = useState(data?.username);
    const [password, setPassword] = useState(data?.password);
    const [namaAdmin, setNamaAdmin] = useState(data?.nama_admin);
    const [levelAdmin, setLevelAdmin] = useState([]);
    const [selectedLevelAdmin, setSelectedLevelAdmin] = useState(data?.id_level);

    /**
     * Menghandle perubahan pada input username.
     * 
     * @param {Object} e - Event input.
     */
    const usernameHandle = (e) => {
        setUsername(e.target.value);
    };
    /**
     * Menghandle perubahan pada input password.
     * 
     * @param {Object} e - Event input.
     */
    const passwordHandle = (e) => {
        setPassword(e.target.value);
    };
    /**
     * Menghandle perubahan pada input nama admin.
     * 
     * @param {Object} e - Event input.
     */
    const namaAdminHandle = (e) => {
        setNamaAdmin(e.target.value);
    };
    /**
     * Menghandle perubahan pada input level admin.
     * 
     * @param {Object} e - Event input.
     */
    const handleLevelAdminChange = (e) => {
        setSelectedLevelAdmin(e.target.value);
    };

    /**
     * Mengirim data yang telah diedit.
     */
    const submitHandle = async () => {
        try {
            const value = {
                username: username.toLowerCase(),
                password: password,
                nama_admin: namaAdmin,
                id_level: parseInt(selectedLevelAdmin)
            }
            submitEditButton(data?.id_level, value)
        } catch (e) {
            console.log(e)
        }
    }

    /**
    * Mendapatkan data level admin dari API.
    */
    const getLevel = async () => {
        try {
            const api = await getApiRes(`/level`);
            if (api.result.error.length > 0) return console.log(api.result.error);
            setLevelAdmin(api?.result?.data)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem('dataUser'))
        if (storage?.islogin === true && storage?.level === 'admin') {
            getLevel()
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
                            <label className="block text-gray-700">Nama Admin</label>
                            <input
                                type="text"
                                value={namaAdmin}
                                onChange={namaAdminHandle}
                                className="w-full border border-gray-300 px-2 py-1 rounded"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col py-2">
                        <label>Level</label>
                        <select className="w-[200px] border border-black rounded" value={selectedLevelAdmin} required onChange={handleLevelAdminChange}>
                            {
                                levelAdmin?.map((item, index) => {
                                    return (
                                        <option key={index} value={item?.id_level}>
                                            {item?.nama_level}
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

export default EditAdmin;