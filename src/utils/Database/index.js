/**
 * @file Database/index.js
 * @module supabase
 * @description Inisialisasi klien Supabase untuk digunakan dalam aplikasi.
 */

import { createClient } from "@supabase/supabase-js";

/**
 * Inisialisasi klien Supabase dengan URL dan kunci anonim dari variabel env.
 * @constant {Object} supabase - Klien Supabase yang diinisialisasi.
 */
export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY   
)
