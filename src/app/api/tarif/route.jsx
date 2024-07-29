import { supabase } from "@/utils/Database";

/**
 * Fungsi untuk menangani permintaan GET dan mengembalikan data tarif.
 * @async
 * @function GET
 * @param {Request} Request - Objek permintaan yang diterima.
 * @returns {Promise<Response>} Respons JSON dengan data tarif atau pesan kesalahan.
 */
export async function GET(Request) {
    const params = Request.nextUrl.searchParams;

    if (params.get("id_tarif")) {
        const { data, error } = await supabase
            .from('tarif')
            .select('*')
            .eq('id_tarif', parseInt(params.get("id_tarif")))
            .order('id_tarif', {
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
        .from('tarif')
        .select('*')
        .order('id_tarif', {
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
 * Fungsi untuk menangani permintaan PATCH (update).
 * @param {Request} Request - Objek permintaan yang diterima.
 * @returns {Promise<Response>} - Response JSON dengan pesan pembaruan data atau pesan error.
 */
export async function PATCH(Request) {
    const body = await Request.json();
    const params = Request.nextUrl.searchParams;

    if (body) {
        const { data, error } = await supabase
            .from('tarif')
            .update(body)
            .eq('id_tarif', parseInt(params.get("id_tarif")))

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
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
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
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, application/json',
            },
        })
}

/**
 * Fungsi untuk menangani permintaan POST dan menambah data tarif.
 * @async
 * @function POST
 * @param {Request} Request - Objek permintaan yang diterima.
 * @returns {Promise<Response>} Respons JSON dengan status penambahan atau pesan kesalahan.
 */
export async function POST(Request) {
    const body = await Request.json();

    if (!body.daya && !body.tarifperkwh) {
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
        .from('tarif')
        .insert({
            daya: body.daya,
            tarifperkwh: body.tarifperkwh
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
 * Fungsi untuk menangani permintaan DELETE dan menghapus data tarif.
 * @param {Request} Request - Objek permintaan yang diterima.
 * @returns {Promise<Response>} - Response JSON dengan pesan sukses penghapusan data atau pesan error.
 */
export async function DELETE(Request) {
    const params = Request.nextUrl.searchParams;

    if (!params.get('id_tarif')) {
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
        .from('tarif')
        .delete()
        .eq('id_tarif', parseInt(params.get('id_tarif')))

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