

import { supabase } from "@/utils/Database";


/**
 * Fungsi untuk menangani permintaan GET dan mengembalikan data tagihan.
 * @async
 * @function GET
 * @param {Request} Request - Objek permintaan yang diterima.
 * @returns {Promise<Response>} Respons JSON dengan data tagihan atau pesan kesalahan.
 */
export async function GET(Request) {
    const params = Request.nextUrl.searchParams;

    if (params.get("id_pelanggan")) {

        if (params.get("user") == 'pelanggan') {

            const { data, error } = await supabase
                .from('tagihan')
                .select('*, penggunaan(*), pelanggan(*)')
                .eq("id_pelanggan", parseInt(params.get("id_pelanggan")))
                .eq('status', 1)
            // .or('status.eq.1,status.eq.2')
            // .eq('status', status)

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
        if (params.get("user") == 'admin') {

            const { data, error } = await supabase
                .from('tagihan')
                .select('*, penggunaan(*), pelanggan(*)')
                .or('status.eq.3')

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

        const { data, error } = await supabase
            .from('tagihan')
            .select('*, penggunaan(*), pelanggan(*)')
            .eq("id_pelanggan", parseInt(params.get("id_pelanggan")))

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

    const { data, error } = await supabase
        .from('tagihan')
        .select('*, penggunaan(*), pelanggan(*)')
    // .or('status.eq.1,status.eq.2')
    // .eq('status', status)

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

    // return Response.json(
    //     {
    //         result: {
    //             data: '',
    //             error: "Data Can't be empty"
    //         }
    //     },
    //     {
    //         status: 200,
    //         headers: {
    //             'Access-Control-Allow-Origin': '*',
    //             'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    //             'Access-Control-Allow-Headers': 'Content-Type, application/json',
    //         },
    //     })
}


/**
 * Fungsi untuk menangani permintaan PATCH (update).
 * @param {Request} Request - Objek permintaan yang diterima.
 * @returns {Promise<Response>} - Response JSON dengan pesan pembaruan data atau pesan error.
 */
export async function PATCH(Request) {
    const body = await Request.json();
    const params = Request.nextUrl.searchParams;
    if (body.status && params.get("id_tagihan")) {
        const { err } = await supabase
            .from('pembayaran')
            .update({ id_user: parseInt(body.id_user) })
            .eq('id_tagihan', parseInt(params.get("id_tagihan")))

        if (err) {
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

        const { data, error } = await supabase
            .from('tagihan')
            .update({
                status: parseInt(body.status)
            })
            .eq('id_tagihan', parseInt(params.get("id_tagihan")))

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