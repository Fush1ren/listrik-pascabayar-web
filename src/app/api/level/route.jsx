import { supabase } from "@/utils/Database";

/**
 * Fungsi untuk menangani permintaan GET ke endpoint level.
 * @async
 * @function GET
 * @param {Request} Request - Objek permintaan yang diterima.
 * @returns {Promise<Response>} Respons JSON dengan data level atau pesan kesalahan.
 */
export async function GET(Request) {
    const params = Request.nextUrl.searchParams;

    if (params.get("id_level")) {
        const { data, error } = await supabase
            .from('level')
            .select('*')
            .eq('id_level', parseInt(params.get("id_level")))
            .order('id_level', {
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
        .from('level')
        .select('*')
        .order('id_level', {
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
 * Fungsi untuk menangani permintaan PATCH ke endpoint level.
 * @async
 * @function PATCH
 * @param {Request} Request - Objek permintaan yang diterima.
 * @returns {Promise<Response>} Respons JSON dengan pesan sukses atau kesalahan.
 */
export async function PATCH(Request) {
    const body = await Request.json();
    const params = Request.nextUrl.searchParams;

    if (body) {
        const { data, error } = await supabase
            .from('level')
            .update(body)
            .eq('id_level', parseInt(params.get("id_level")))

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
 * Fungsi untuk menangani permintaan DELETE ke endpoint level.
 * @async
 * @function DELETE
 * @param {Request} Request - Objek permintaan yang diterima.
 * @returns {Promise<Response>} Respons JSON dengan pesan sukses atau kesalahan.
 */
export async function DELETE(Request) {
    const params = Request.nextUrl.searchParams;

    if (!params.get('id_level')) {
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
        .from('level')
        .delete()
        .eq('id_level', parseInt(params.get('id_level')))

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

export async function POST(Request) {
    const body = await Request.json();

    if (!body.nama_level) {
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
        .from('level')
        .insert({
            nama_level: body.nama_level,
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