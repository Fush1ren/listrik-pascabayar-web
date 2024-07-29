/**
 * @module LoginPelanggan
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
const LoginPelanggan = () => {
    /**
     * State untuk menyimpan nilai input username.
     * @type {string}
     * @default ''
     * @description State untuk menyimpan nilai input username.
    */
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    /**
     * Menghandle perubahan pada input username.
     * @param {React.ChangeEvent<HTMLInputElement>} event - Event perubahan input.
     */
    const usernameHandle = (event) => {
        const value = event.target.value;
        setUsername(value);
    }

    /**
     * Menghandle perubahan pada input password.
     * @param {React.ChangeEvent<HTMLInputElement>} event - Event perubahan input.
     */
    const passwordHandle = (event) => {
        const value = event.target.value;
        setPassword(value);
    }

    /**
     * Menghandle submit form login.
     * @param {React.FormEvent<HTMLFormElement>} e - Event submit form.
     */
    const submitHandle = async (e) => {
        e.preventDefault(); // prevent refresh
        try {
            const value = {
                username: username.toLowerCase(), // username to lowercase
                password: password, // password
                level: 'pelanggan' // level
            }
            const api = await postApiRes("/login", value); // post api
            if (api.result.error) return alert('Username & Password salah!'); // jika error muncul alert
            alert('Login Berhasil!'); // jika berhasil muncul alert
            let storage = {
                islogin: true, // login true
                level: 'pelanggan', // level
                data: api?.result?.data[0] // data
            }
            localStorage.setItem('dataUser', JSON.stringify(storage)) // set localstorage
            setTimeout(() => {
                router.push(`/user/dashboard`) // push ke dashboard
            }, 1000)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        // cek localstorage
        if (!localStorage.getItem('dataUser')) {
            let storage = {
                islogin: false, // login false
                level: 'pelanggan' // level
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
                            <label className="text-sm">Username</label>
                            <input required type="text" className="w-[200px ] outline-none bg-transparent border-b border-blue-500 p-1" value={username} onChange={usernameHandle} />
                        </div>
                        <div className="flex flex-col focus-within:scale-105 focus-within:duration-500 px-3">
                            <label className="text-sm">Password</label>
                            <input required type="password" className="w-[200px ] outline-none bg-transparent border-b border-blue-500 p-1" value={password} onChange={passwordHandle} />
                        </div>
                    </div>
                    <div className="p-4 ">
                        <button className=" w-full border hover:bg-blue-700 bg-transparent border-blue-700 p-2" type="submit" >Login</button>
                    </div>
                </form>
                <div className="flex justify-center items-center">
                    <a className="text-sm text-center hover:text-blue-500 hover:underline" href="/login/admin">
                        Login Admin
                    </a>
                </div>
            </div>
        </div>
    )
}

export default LoginPelanggan;