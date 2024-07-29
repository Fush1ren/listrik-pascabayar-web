/**
 * @file /admin/data-pelanggan/add/page.js
 * @module AddKelolaPelanggan
 * @description Komponen untuk menambah data pelanggan baru.
 */


'use client'

import SideBar from "@/app/_components/admin/SideBar";
import { getApiRes, postApiRes } from "@/utils/api_lib";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Komponen addDataPelanggan.
 * Menampilkan form untuk menambah data pelanggan baru.
 * @returns {JSX.Element} Elemen JSX yang menampilkan form tambah data pelanggan.
 */
const AddDataPelanggan = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [namaPelanggan, setNamaPelanggan] = useState('');
    const [nomorKwh, setNomorKwh] = useState('');
    const [alamat, setAlamat] = useState('');
    const [tarif, setTarif] = useState([]);
    const [daya, setDaya] = useState(0);

    const router = useRouter();

    /**
     * Mengubah nilai username.
     * @param {Object} e - Event dari input username.
     */
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    /**
     * Mengubah nilai password.
     * @param {Object} e - Event dari input password.
     */
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    /**
     * Mengubah nilai nama pelanggan.
     * @param {Object} e - Event dari input nama pelanggan.
     * 
     */
    const handleNamaPelangganChange = (e) => {
        setNamaPelanggan(e.target.value);
    };

    /**
     * Mengubah nilai alamat.
     * @param {Object} e - Event dari input alamat.
     */
    const handleAlamatChange = (e) => {
        setAlamat(e.target.value);
    };

    /**
     * Mengubah nilai nomor Kwh.
     * @param {Object} e - Event dari input nomor Kwh.
     */
    const handleNomorKwhChange = (e) => {
        setNomorKwh(e.target.value);
    };

    /**
     * Mengubah nilai daya.
     * @param {Object} e - Event dari input daya.
     */
    const handleDayaChange = (e) => {
        setDaya(e.target.value);
    };

    /**
     * Mereset nilai input.
     */
    const handleReset = () => {
        setUsername('')
        setPassword('')
        setNamaPelanggan('')
        setNomorKwh('')
        setAlamat('')
        setDaya(daya)
    }

    /**
     * Mengambil data tarif dari API.
     * @async
     */
    const getTarif = async () => {
        try {
            const api = await getApiRes(`/tarif`);
            if (api.result.error.length > 0) return console.log(api.result.error);
            setTarif(api?.result?.data)
        } catch (e) {
            throw (e);
        }
    }

    /**
     * Mengirim data pelanggan baru ke API.
     * @param {Object} e - Event dari submit form.
     * @async
     */
    const submitForm = async (e) => {
        e.preventDefault();
        let newDaya = tarif[daya].id_tarif;
        try {
            const value = {
                username: username.toLowerCase(),
                password: password,
                nama_pelanggan: namaPelanggan,
                nomor_kwh: nomorKwh,
                alamat: alamat,
                id_tarif: parseInt(newDaya)
            }
            const api = await postApiRes(`/pelanggan`, value);

            if (api.result.error.length > 0) return console.log(api.result.error);
            alert('Data Berhasil Ditambahkan')

            setTimeout(() => {
                router.push(`/admin/data-pelanggan`)
            }, 2000);

        } catch (e) {
            throw (e)
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
        <div className="flex bg-[#F8F8F8] w-full h-screen">
            <SideBar />
            <div className="w-full text-[#6B6B6B] h-full">
                <div>
                    <div className={`p-8 h-[596px] overflow-auto`}>
                        <div className="pb-2">
                            <h1 className="text-2xl font-bold">Tambah Data Pelanggan</h1>
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
                                        <label>Nama Pelanggan</label>
                                        <input value={namaPelanggan} onChange={handleNamaPelangganChange} required type="text" className="text-black border border-black" />
                                    </div>
                                </div>
                                <div className="flex flex-row py-2 w-[600px] gap-8">
                                    <div className="flex flex-col py-2">
                                        <label>Nomor kWh</label>
                                        <input value={nomorKwh} onChange={handleNomorKwhChange} required type="text" className="text-black border border-black" />
                                    </div>
                                </div>
                                <div className="flex flex-row py-2 w-[600px] gap-8">
                                    <div className="flex flex-col py-2">
                                        <label>Alamat</label>
                                        <input value={alamat} onChange={handleAlamatChange} required type="text" className="text-black border border-black" />
                                    </div>
                                </div>
                                <div className="flex flex-row py-2 w-[600px] gap-8">
                                    <div className="flex flex-col py-2">
                                        <label>Daya</label>
                                        <select className="w-[200px] border border-black rounded" value={daya} required onChange={handleDayaChange}>
                                            {
                                                tarif?.map((item, index) => {
                                                    return (
                                                        <option key={index} value={index}>
                                                            {item?.daya}VA
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

export default AddDataPelanggan;