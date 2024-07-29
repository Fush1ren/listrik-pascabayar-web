/**
 * @file /user/dashboard/page.js
 * @module DashboardPelanggan
 * @description Komponen untuk menampilkan Dashboard Pelanggan.
 */

'use client'

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import SideBar from "@/app/_components/user/SideBar";
import { getApiRes, patchApiRes } from "@/utils/api_lib";

/**
 * Komponen utama untuk halaman Dashboard.
 * Menampilkan dan memperbarui data pelanggan.
 *
 * @component
 * @returns {JSX.Element} Elemen JSX untuk menampilkan halaman Dashboard.
 */
const DashboardPelanggan = () => {
    const [data, setData] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [namaPelanggan, setNamaPelanggan] = useState('');
    const [nomorKwh, setNomorKwh] = useState('');
    const [alamat, setAlamat] = useState('');

    /**
     * Handler untuk mengubah nilai username.
     *
     * @param {Object} e - Event yang dipicu oleh perubahan input.
     */
    const usernameHandler = (e) => {
        setUsername(e.target.value);
    }

    /**
     * Handler untuk mengubah nilai password.
     *
     * @param {Object} e - Event yang dipicu oleh perubahan input.
     */
    const passwordHandler = (e) => {
        setPassword(e.target.value);
    }

    /**
     * Handler untuk mengubah nilai nama pelanggan.
     *
     * @param {Object} e - Event yang dipicu oleh perubahan input.
     */
    const namaPelangganHandler = (e) => {
        setNamaPelanggan(e.target.value);
    }

    /**
     * Handler untuk mengubah nilai nomor kWh.
     *
     * @param {Object} e - Event yang dipicu oleh perubahan input.
     */
    const nomorKwhHandler = (e) => {
        setNomorKwh(e.target.value);
    }

    /**
     * Handler untuk mengubah nilai alamat.
     *
     * @param {Object} e - Event yang dipicu oleh perubahan input.
     */
    const alamatHandler = (e) => {
        setAlamat(e.target.value);
    }

    /**
    * Mendapatkan data pelanggan berdasarkan ID pelanggan.
    *
    * @async
    * @param {number} id_pelanggan - ID pelanggan yang akan diambil datanya.
    */
    const getPelanggan = async (id_pelanggan) => {
        const api = await getApiRes(`pelanggan?id_pelanggan=${id_pelanggan}`);
        if (api.result.error.length > 0) return alert('Data Not Found!');
        const res = api.result.data[0];
        setUsername(res?.username);
        setPassword(res?.password);
        setNamaPelanggan(res?.nama_pelanggan);
        setNomorKwh(res?.nomor_kwh);
        setAlamat(res?.alamat);
    }

    /**
    * Memperbarui data pelanggan.
    *
    * @async
    */
    const updatePelanggan = async () => {
        try {
            const api = await patchApiRes(`pelanggan?id_pelanggan=${data?.id_pelanggan}`, {
                username: username.toLowerCase(),
                password: password,
                nama_pelanggan: namaPelanggan,
                nomor_kwh: nomorKwh,
                alamat: alamat
            });
            if (api.result.error.length > 0) return alert('Update Data was Failed!');
            alert('Update Data was Successfully!');
            localStorage.setItem('dataUser', JSON.stringify(
                {
                    islogin: true,
                    level: 'pelanggan',
                    data: {
                        id_pelanggan: data?.id_pelanggan,
                        username: username.toLowerCase(),
                        password: password,
                        nama_pelanggan: namaPelanggan,
                        nomor_kwh: nomorKwh,
                        alamat: alamat
                    }
                }
            ));
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (e) {
            throw e;
        }
    }

    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem('dataUser'));
        if (storage?.islogin === true && storage?.level === 'pelanggan') {
            setData(storage?.data)
            getPelanggan(storage?.data?.id_pelanggan)
        } else {
            redirect('/login/user')
        }

    }, [])


    return (
        <div className="flex bg-[#F8F8F8] w-full h-screen">
            <SideBar />
            <div className="text-[#666666] w-full">
                <div className="p-8">
                    <div className="text-[#451CB8] py-4">
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                    </div>
                    <div className="py-2">
                        <div>
                            <h1 className="text-lg font-bold">Data Pelanggan</h1>
                            <div className="flex flex-col py-4">
                                <div className="flex flex-row">
                                    <div className="w-1/4">
                                        <p className="text-sm font-normal">Nama Pelanggan</p>
                                    </div>
                                    <span>: </span>
                                    <div className="w-3/4 px-2">
                                        <input className="text-sm font-normal" type="text" value={namaPelanggan} onChange={namaPelangganHandler} />
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    <div className="w-1/4">
                                        <p className="text-sm font-normal">Username</p>
                                    </div>
                                    <span>: </span>
                                    <div className="w-3/4 px-2">
                                        <input className="text-sm font-normal" type="text" value={username} onChange={usernameHandler} />
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    <div className="w-1/4">
                                        <p className="text-sm font-normal">Password</p>
                                    </div>
                                    <span>: </span>
                                    <div className="w-3/4 px-2">
                                        <input className="text-sm font-normal" type="password" value={password} onChange={passwordHandler} />
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    <div className="w-1/4">
                                        <p className="text-sm font-normal">Nomor kWh</p>
                                    </div>
                                    <span>: </span>
                                    <div className="w-3/4 px-2">
                                        <input className="text-sm font-normal" type="text" value={nomorKwh} onChange={nomorKwhHandler} />
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    <div className="w-1/4">
                                        <p className="text-sm font-normal">Alamat</p>
                                    </div>
                                    <span>: </span>
                                    <div className="w-3/4 px-2">
                                        <input className="text-sm font-normal" type="text" value={alamat} onChange={alamatHandler} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                <button className="bg-[#451CB8] text-white py-2 px-4 rounded-md" onClick={updatePelanggan}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DashboardPelanggan;