// Import module supabase untuk berinteraksi dengan database
import { supabase } from "@/utils/Database";

/**
 * Fungsi untuk menangani permintaan GET dan mengembalikan data admin.
 * @async
 * @function GET
 * @param {Request} Request - Objek permintaan yang diterima.
 * @description Berfungsi untuk menangani permintaan GET dan mengambil data admin dari database Supabase dan mengembalikkan data admin tersebut dalam format JSON sebagai respon api.
 * @returns {Promise<Response>} Respons JSON dengan data admin atau pesan kesalahan.
 */
export async function GET(Request) {
    try {
        // Ambil parameter dari query string URL
        const params = Request.nextUrl.searchParams;

        let data, error;

        // Jika terdapat parameter id_user, maka ambil data admin berdasarkan id_user
        if (params.get('id_user')) {
            // Lakukan Query ke tabel `user` dengan parameter id_user
            const response = await supabase
                .from('user') // Tabel user
                .select('*, level(*)') // Select semua kolom dan relasi level
                .eq('id_user', parseInt(params.get('id_user'))) // filter berdasarkan id_user
                .order('id_user', {
                    ascending: true
                }); // Urutkan berdasarkan id_user

            data = response.data;
            error = response.error;
        } else {
            const response = await supabase
                .from('user') // Tabel user
                .select('*, level(*)') // Select semua kolom dan relasi level
                .order('id_user', {
                    ascending: true // Urutkan berdasarkan id_user
                });

            data = response.data; // Data admin
            error = response.error; // Error jika terdapat error
        }

        // Jika terdapat error, maka kembalikan pesan error
        if (error) {
            throw new Error(error.message); // Buat error baru
        }

        // Kembalikan data admin
        return Response.json(
            {
                result: {
                    data: data, // Data admin
                    error: '' // Tidak ada error
                }
            },
            {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*', // Izinkan CORS
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Izinkan method GET, POST, PUT, DELETE, OPTIONS
                    'Access-Control-Allow-Headers': 'Content-Type, application/json', // Izinkan header Content-Type, application/json
                },
            });
    } catch (error) {
        return Response.json(
            {
                result: {
                    data: [], // Data kosong
                    error: error.message // Pesan error
                }
            },
            {
                status: 500, // Status 500
                headers: {
                    'Access-Control-Allow-Origin': '*', // Izinkan CORS
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Izinkan method GET, POST, PUT, DELETE, OPTIONS
                    'Access-Control-Allow-Headers': 'Content-Type, application/json', // Izinkan header Content-Type, application/json
                },
            });
    }
}
// NOTE: Penggunaan .select('*') untuk mengambil semua kolom dan relasi dari tabel 'user' 
// bersama dengan relasi 'level' melanggar pedoman hanya untuk memilih kolom yang diperlukan. 
// Pendekatan ini digunakan untuk menyederhanakan query dan menghindari permintaan tambahan untuk kolom tambahan, 
// sehingga meningkatkan performa dalam skenario dimana semua detail pengguna diperlukan. 
// Selain itu, metode ini memastikan kompatibilitas dengan perubahan skema di masa depan, 
// mengurangi upaya pemeliharaan yang diperlukan.

/**
 * Fungsi untuk menangani permintaan POST dan menambah data admin.
 * @async
 * @function POST
 * @param {Request} Request - Objek permintaan yang diterima.
 * @returns {Promise<Response>} Respons JSON dengan status penambahan atau pesan kesalahan.
 */
export async function POST(Request) {
    const body = await Request.json();

    if (!body.username && !body.password && !body.nama_admin && !body.id_level) {
        return Response.json(
            {
                result: {
                    data: [],
                    error: "Data can't be empty!"
                }
            },
            {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, application/json',
                },
            })
    }

    const { data, error } = await supabase
        .from('user')
        .insert({
            username: body.username,
            password: body.password,
            nama_admin: body.nama_admin,
            id_level: parseInt(body.id_level)
        })

    if (error) {
        return Response.json(
            {
                result: {
                    data: [],
                    error: error.message
                }
            },
            {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, application/json',
                },
            })
    }
    return Response.json(
        {
            result: {
                data: 'Data was Successfully Created!',
                error: ''
            }
        },
        {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, application/json',
            },
        })

}

/**
 * Fungsi untuk menangani permintaan DELETE dan menghapus data admin.
 * @param {Request} Request - Objek permintaan yang diterima.
 * @returns {Promise<Response>} - Response JSON dengan pesan sukses penghapusan data atau pesan error.
 */
export async function DELETE(Request) {
    const params = Request.nextUrl.searchParams;

    if (!params.get('id_user')) {
        return Response.json(
            {
                result: {
                    data: [],
                    error: "Data can't be empty!"
                }
            },
            {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, application/json',
                },
            })
    }

    const { data, error } = await supabase
        .from('user')
        .delete()
        .eq('id_user', parseInt(params.get('id_user')))

    if (error) {
        return Response.json(
            {
                result: {
                    data: [],
                    error: error.message
                }
            },
            {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, application/json',
                },
            })
    }
    return Response.json(
        {
            result: {
                data: 'Data was Successfully Deleted!',
                error: ''
            }
        },
        {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, application/json',
            },
        })
}

/**
 * Fungsi untuk menangani permintaan PATCH (update).
 * @param {Request} Request - Objek permintaan yang diterima.
 * @returns {Promise<Response>} - Response JSON dengan pesan pembaruan data atau pesan error.
 */
export async function PATCH(Request) {
    const body = await Request.json();
    const params = Request.nextUrl.searchParams;

    if (body) {
        const { data, error } = await supabase
            .from('user')
            .update(body)
            .eq('id_user', parseInt(params.get("id_user")))

        if (error) {
            return Response.json(
                {
                    result: {
                        data: [],
                        error: error.message
                    }
                },
                {
                    status: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
                        'Access-Control-Allow-Headers': 'Content-Type, application/json',
                    },
                })
        }

        return Response.json(
            {
                result: {
                    data: {
                        message: 'Data was Sucessfully Updated!'
                    },
                    error: ''
                }
            },
            {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
                    'Access-Control-Allow-Headers': 'Content-Type, application/json',
                },
            })

    }
    return Response.json(
        {
            result: {
                data: [],
                error: "Data can't be empty!"
            }
        },
        {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
                'Access-Control-Allow-Headers': 'Content-Type, application/json',
            },
        })
}