import { supabase } from "@/utils/Database";

/**
 * Fungsi untuk menangani permintaan GET dan mengambil data pelanggan.
 * @async
 * @function GET
 * @param {Request} Request - Objek permintaan yang diterima.
 * @returns {Promise<Response>} Respons JSON dengan data pelanggan atau pesan kesalahan.
 */
export async function GET(Request) {
    const params = Request.nextUrl.searchParams;

    // Get Data pelanggan menggunakan id pelanggan
    if (params.get("id_pelanggan")) {
        const { data, error } = await supabase
            .from('pelanggan')
            .select('*, tarif(*)')
            .eq('id_pelanggan', parseInt(params.get("id_pelanggan")))
            .order('id_pelanggan', {
                ascending: true
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
        .from('pelanggan')
        .select('*, tarif(*)')
        .order('id_pelanggan', {
            ascending: true
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


/**
 * Fungsi untuk menangani permintaan PATCH dan memperbarui data pelanggan.
 * @async
 * @function PATCH
 * @param {Request} Request - Objek permintaan yang diterima.
 * @returns {Promise<Response>} Respons JSON dengan status pembaruan atau pesan kesalahan.
 */
export async function PATCH(Request) {
    const body = await Request.json();
    const params = Request.nextUrl.searchParams;

    if (body) {
        const { data, error } = await supabase
            .from('pelanggan')
            .update(body)
            .eq('id_pelanggan', parseInt(params.get("id_pelanggan")))

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

/**
 * Fungsi untuk menangani permintaan POST dan menambah data pelanggan.
 * @async
 * @function POST
 * @param {Request} Request - Objek permintaan yang diterima.
 * @returns {Promise<Response>} Respons JSON dengan status penambahan atau pesan kesalahan.
 */
export async function POST(Request) {
    const body = await Request.json();

    if (!body.username && !body.password && !body.nomor_kwh && !body.nama_pelanggan && !body.alamat && !body.id_tarif) {
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
        .from('pelanggan')
        .insert({
            username: body.username,
            password: body.password,
            nomor_kwh: body.nomor_kwh,
            nama_pelanggan: body.nama_pelanggan,
            alamat: body.alamat,
            id_tarif: parseInt(body.id_tarif)
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
 * Fungsi untuk menangani permintaan DELETE dan menghapus data pelanggan.
 * @async
 * @function DELETE
 * @param {Request} Request - Objek permintaan yang diterima.
 * @returns {Promise<Response>} Respons JSON dengan status penghapusan atau pesan kesalahan.
 */
export async function DELETE(Request) {
    const params = Request.nextUrl.searchParams;

    if (!params.get("id_pelanggan")) {
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
        .from('pelanggan')
        .delete()
        .eq('id_pelanggan', parseInt(params.get("id_pelanggan")))

    if (error) {
        return Response.json(
            {
                result: {
                    data: [],
                    error: 'Data is not found!'
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