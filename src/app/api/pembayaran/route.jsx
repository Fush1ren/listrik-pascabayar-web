import { supabase } from "@/utils/Database";


/**
 * Fungsi untuk menangani permintaan GET dan mengembalikan data pembayaran.
 * @async
 * @function GET
 * @param {Request} Request - Objek permintaan yang diterima.
 * @returns {Promise<Response>} Respons JSON dengan data pembayaran atau pesan kesalahan.
 */
export async function GET(Request) {
    const params = Request.nextUrl.searchParams;

    if (params.get("id_pelanggan")) {

        if (params.get("user") == 'pelanggan') {

            const { data, error } = await supabase
                .from('pembayaran')
                .select('*, tagihan(*), pelanggan(*), user(*)')
                .eq('id_pelanggan', parseInt(params.get("id_pelanggan")))
                .in('tagihan.status', [2, 3])
            // .eq("id_pelanggan", parseInt(params.get("id_pelanggan")))
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

        const { data, error } = await supabase
            .from('pembayaran')
            .select('*, tagihan(*), pelanggan(*), user(*)')
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

    if (params.get("user") == 'admin') {

        const { data, error } = await supabase
            .from('pembayaran')
            .select('*, tagihan(*), pelanggan(*), user(*)')
            .eq('tagihan.status', 3)

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
        .from('pembayaran')
        .select('*, tagihan(*), pelanggan(*), user(*)')

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
                error: ""
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
 * Fungsi untuk menangani permintaan DELETE dan menghapus data pembayaran.
 * @async
 * @function DELETE
 * @param {Request} Request - Objek permintaan yang diterima.
 * @returns {Promise<Response>} Respons JSON dengan pesan sukses penghapusan atau pesan kesalahan.
 */
export async function DELETE(Request) {
    const params = Request.nextUrl.searchParams;

    if (!params.get('id_pembayaran')) {
        return Response.json(
            {
                result: {
                    data: {
                        message: "Id pembayaran can't be empty!"
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
            }
        )
    }

    const { data, error } = await supabase
        .from('pembayaran')
        .delete()
        .eq('id_pembayaran', parseInt(params.get('id_pembayaran')))

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
                    message: "Pembayaran berhasil dihapus!"
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
        }
    )
}