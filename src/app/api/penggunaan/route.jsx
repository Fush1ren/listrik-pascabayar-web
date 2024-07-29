import { supabase } from "@/utils/Database";

/**
 * Fungsi untuk menangani permintaan GET dan mengembalikan data penggunaan.
 * @param {Request} Request - Objek permintaan yang diterima.
 * @returns {Promise<Response>} - Response JSON dengan data penggunaan atau pesan kesalahan.
 */
export async function GET(Request) {
    const params = Request.nextUrl.searchParams;

    // GET Data Penggunaan berdasarkan id penggunaan
    if (params.get('id_penggunaan')) {
        const { data, error } = await supabase
            .from('penggunaan')
            .select('*, pelanggan(*)')
            .eq('id_penggunaan', parseInt(params.get('id_penggunaan')))
            .order('id_penggunaan', {
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

    // GET Data penggunaan berdasarkan id pelanggan
    if (params.get('id_pelanggan')) {
        const { data, error } = await supabase
            .from('penggunaan')
            .select('*, pelanggan(*)')
            .eq('id_pelanggan', parseInt(params.get('id_pelanggan')))
            .order('id_penggunaan', {
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

    if (!params.get('id_penggunaan')) {
        const { data, error } = await supabase
            .from('penggunaan')
            .select('*, pelanggan(*)')

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

    }
    const { data, error } = await supabase
        .from('penggunaan')
        .select('*, pelanggan(*)')
        .order('id_penggunaan', {
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
 * Fungsi untuk menangani permintaan POST dan menambah data penggunaan.
 * @async
 * @function POST
 * @param {Request} Request - Objek permintaan yang diterima.
 * @returns {Promise<Response>} Respons JSON dengan status penambahan atau pesan kesalahan.
 */
export async function POST(Request) {
    const body = await Request.json();

    // Jika Tidak ada body
    if (!body.id_pelanggan && !body.bulan && !body.tahun && !body.meter_awal && !body.meter_akhir) {

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

    // Data Baru
    const { data, error } = await supabase
        .from('penggunaan')
        .insert({
            id_pelanggan: body.id_pelanggan,
            bulan: body.bulan,
            tahun: body.tahun,
            meter_awal: body.meter_awal,
            meter_akhir: body.meter_akhir,
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
 * Fungsi untuk menangani permintaan DELETE dan menghapus data penggunaan.
 * @param {Request} Request - Objek permintaan yang diterima.
 * @returns {Promise<Response>} - Response JSON dengan pesan sukses penghapusan data atau pesan error.
 */
export async function DELETE(Request) {
    const params = Request.nextUrl.searchParams;

    if (!params.get('id_penggunaan')) {
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
        .from('penggunaan')
        .delete()
        .eq('id_penggunaan', parseInt(params.get('id_penggunaan')))

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
            .from('penggunaan')
            .update(body)
            .eq('id_penggunaan', parseInt(params.get("id_penggunaan")))

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