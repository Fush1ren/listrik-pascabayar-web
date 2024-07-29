import { supabase } from "@/utils/Database";

/**
 * Fungsi untuk menangani permintaan POST untuk login.
 * @async
 * @function POST
 * @param {Request} Request - Objek permintaan yang diterima.
 * @returns {Promise<Response>} Respons JSON dengan data pengguna atau pesan kesalahan.
 */
export async function POST(Request) {
    const body = await Request.json();

    // Memeriksa apakah username dan password ada dalam body permintaan
    if (!body.username > 0 && !body.password > 0 && !body.level) {
        return Response.json(
            {
                result: {
                    data: [],
                    error: "Username & Password can't be empty!"
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
    };
    // Memeriksa apakah level pengguna adalah 'pelanggan'
    if (body.level === 'pelanggan') {

        const { data, error } = await supabase
            .from('pelanggan')
            .select()
            .match(
                {
                    username: body.username,
                    password: body.password
                }
            )

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

        if (data.length === 0) {
            return Response.json(
                {
                    result: {
                        data: [],
                        error: 'Username and Password is wrong!'
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
                    data: data,
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
    // Memeriksa apakah level pengguna adalah 'admin'
    else if (body.level === 'admin') {
        const { data, error } = await supabase
            .from('user')
            .select()
            .match(
                {
                    username: body.username,
                    password: body.password
                }
            )

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

        if (data.length === 0) {
            return Response.json(
                {
                    result: {
                        data: [],
                        error: 'Username and Password is wrong!'
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
                    data: data,
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
    return Response.json(
        {
            result: {
                data: [],
                error: 'Data is Wrong!'
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