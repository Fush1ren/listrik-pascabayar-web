/**
 * Fungsi Home yang mengarahkan pengguna ke halaman login user.
 * @module Home
 */

import { redirect } from "next/navigation";

/**
 * Mengarahkan pengguna ke halaman /login/user.
 * @function
 */
export default function Home() {
  redirect('/login/user')
}
