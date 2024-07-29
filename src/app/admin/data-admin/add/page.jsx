/**
 * @file /admin/data-admin/add/page.js
 * @module AddKelolaAdmin
 * @description Komponen untuk menambah data admin baru.
 */

'use client'

import { useEffect, useState } from "react"
import { getApiRes, postApiRes } from "@/utils/api_lib"
import { redirect, useRouter } from "next/navigation";
import SideBar from "@/app/_components/admin/SideBar";

/**
 * Komponen addKelolaAdmin.
 * Menampilkan form untuk menambah data admin baru.
 * @returns {JSX.Element} Elemen JSX yang menampilkan form tambah data admin.
 */
const AddKelolaAdmin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [namaAdmin, setNamaAdmin] = useState('');
    const [levelAdmin, setLevelAdmin] = useState([]);
    const [selectedLevelAdmin, setSelectedLevelAdmin] = useState(0);

    const router = useRouter();

    /**
     * Mengubah nilai state username.
     * @param {Object} e - Event input perubahan.
     */
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    /**
     * Mengubah nilai state password.
     * @param {Object} e - Event input perubahan.
     */
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    /**
    * Mengubah nilai state namaAdmin.
    * @param {Object} e - Event input perubahan.
    */
    const handleNamaAdminChange = (e) => {
        setNamaAdmin(e.target.value);
    };

    /**
     * Mengubah nilai state selectedLevelAdmin.
     * @param {Object} e - Event input perubahan.
     */
    const handleLevelAdminChange = (e) => {
        setSelectedLevelAdmin(e.target.value);
    };

    /**
     * Mengatur ulang nilai state form.
     */
    const handleReset = () => {
        setUsername('')
        setPassword('')
        setNamaAdmin('')
        setSelectedLevelAdmin(selectedLevelAdmin)
    }

    /**
     * Mengambil data level admin dari API.
     * @async
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

    /**
     * Mengirim data form ke API untuk ditambahkan sebagai admin baru.
     * @param {Object} e - Event submit form.
     * @async
     */
    const submitForm = async (e) => {
        e.preventDefault();
        let newLevel = levelAdmin[selectedLevelAdmin].id_level;
        try {
            const value = {
                username: username.toLowerCase(),
                password: password,
                nama_admin: namaAdmin,
                id_level: parseInt(newLevel)
            }
            const api = await postApiRes(`/user`, value);

            if (api.result.error.length > 0) return console.log(api.result.error);
            alert('Data berhasil ditambahkan');
            setTimeout(() => {
                router.push(`/admin/data-admin`)
            }, 2000);

        } catch (e) {
            console.log(e)
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
        <div className="flex bg-[#F8F8F8] w-full h-screen">
            <SideBar />
            <div className="w-full text-[#6B6B6B] h-full">
                <div>
                    <div className={`p-8 h-full overflow-auto`}>
                        <div className="pb-2">
                            <h1 className="text-2xl font-bold">Tambah Data Admin</h1>
                        </div>
                        <div className="w-full">
                            <form method="POST" onSubmit={submitForm}>
                                <div className="flex flex-row py-2 w-[600px] gap-8">
                                    <div className="flex flex-col py-2">
                                        <label>Username</label>
                                        <input value={username} onChange={handleUsernameChange} required type="text" className="text-black border border-black" />
                                    </div>
                                </div>
                                <div className="flex flex-row py-2 w-[600px] gap-8">
                                    <div className="flex flex-col py-2">
                                        <label>Password</label>
                                        <input value={password} onChange={handlePasswordChange} required type="password" className="text-black border border-black" />
                                    </div>
                                </div>
                                <div className="flex flex-row py-2 w-[600px] gap-8">
                                    <div className="flex flex-col py-2">
                                        <label>Nama Admin</label>
                                        <input value={namaAdmin} onChange={handleNamaAdminChange} required type="text" className="text-black border border-black" />
                                    </div>
                                </div>
                                <div className="flex flex-row py-2 w-[600px] gap-8">
                                    <div className="flex flex-col py-2">
                                        <label>Level</label>
                                        <select className="w-[200px] border border-black rounded" value={selectedLevelAdmin} required onChange={handleLevelAdminChange}>
                                            {
                                                levelAdmin?.map((item, index) => {
                                                    return (
                                                        <option key={index} value={index}>
                                                            {item?.nama_level}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
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

export default AddKelolaAdmin;