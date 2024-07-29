/**
 * @module LoginAdmin
 */

'use client'
import { postApiRes } from "@/utils/api_lib";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Komponen Login untuk melakukan autentikasi pengguna.
 * @component
 * @returns {JSX.Element} Komponen Login
 */
const LoginAdmin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const cache = {}; // Objek cache untuk menyimpan hasil login

    const router = useRouter();

    /**
     * Menghandle perubahan pada input username.
     * @param {React.ChangeEvent<HTMLInputElement>} e - Event perubahan input.
     */
    const usernameHandle = (e) => {
        const value = e.target.value;
        setUsername(value);
    }

    /**
     * Menghandle perubahan pada input password.
     * @param {React.ChangeEvent<HTMLInputElement>} e - Event perubahan input.
     */
    const passwordHandle = (e) => {
        const value = e.target.value;
        setPassword(value);
    }

    /**
     * Menghandle submit form login.
     * @param {React.FormEvent<HTMLFormElement>} e - Event submit form.
     */
    const submitHandle = async (e) => {
        e.preventDefault(); // mencegah reload halaman
        try {
            const value = {
                username: username.toLowerCase(), // input username diubah menjadi lowercase
                password: password, // input password
                level: 'admin' // level admin
            }

            // Cek cache sebelum mengirim permintaan API
            const cacheKey = `${value.username}_${value.password}`;
            if (cache[cacheKey]) {

                handleLoginSuccess(cache[cacheKey]);
                return;
            }
            const api = await postApiRes("/login", value); // mengirim data ke API
            if (api.result.error.length > 0) return window.alert('Username & Password Salah'); // menampilkan notifikasi gagal
            cache[cacheKey] = api; // Menyimpan hasil login ke cache
            handleLoginSuccess(api); // Menangani login yang berhasil
        } catch (e) {
            console.log(e) // menampilkan error
        }

    }

    const handleLoginSuccess = (api) => {
        window.alert('Berhasil Login!'); // menampilkan notifikasi sukses
        let storage = {
            islogin: true, // status login
            level: 'admin', // level admin
            data: api?.result?.data[0] // data pengguna
        }
        localStorage.setItem('dataUser', JSON.stringify(storage)); // menyimpan data pengguna ke local storage
        router.push(`/admin/dashboard`); // pindah ke halaman dashboard admin
    }


    useEffect(() => {
        // cek localstorage
        if (!localStorage.getItem('dataUser')) {
            let storage = {
                islogin: false, // login false
                level: 'admin' // level
            }
            localStorage.setItem('dataUser', JSON.stringify(storage)) // set localstorage
        }
    }, [])

    return (
        <div className="flex bg-[#c7c7c5] text-black w-full bg- h-screen justify-center items-center ">
            <div className="w-[380px] h-[380px] bg-white rounded border justify-center items-center px-5 py-4">
                <div className=" flex flex-col border-b border-gray-500 text-center pt-5">
                    <a className="text-black text-xl font-semibold">Welcome Back to</a>
                    <a className="text-blue-400 text-lg font-bold">ElecBill</a>
                    <a className="text-gray-400 text-sm font-medium">Login to your account</a>
                </div>
                <form onSubmit={submitHandle} method="POST">
                    <div className="flex flex-col gap-4 py-2">
                        <div className="flex flex-col focus-within:scale-105 focus-within:duration-500 px-3">
                            <label className="text-sm" htmlFor="username">Username</label>
                            <input required name="username" id="username" type="text" className="w-[200px ] outline-none bg-transparent border-b border-blue-500 p-1" value={username} onChange={usernameHandle} />
                        </div>
                        <div className="flex flex-col focus-within:scale-105 focus-within:duration-500 px-3">
                            <label className="text-sm" htmlFor="password">Password</label>
                            <input required name="password" id="password" type="password" className="w-[200px ] outline-none bg-transparent border-b border-blue-500 p-1" value={password} onChange={passwordHandle} />
                        </div>
                    </div>
                    <div className="p-4 ">
                        <button data-testid="login-button" className=" w-full border hover:bg-blue-700 bg-transparent border-blue-700 p-2" type="submit" >Login</button>
                    </div>
                </form>
                <div className="flex justify-center items-center">
                    <a className="text-sm text-center hover:text-blue-500 hover:underline" href="/login/user">
                        Login User
                    </a>
                </div>
            </div>
        </div>
    )
}

export default LoginAdmin;