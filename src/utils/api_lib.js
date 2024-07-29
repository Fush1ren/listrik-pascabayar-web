/**
 * @file api_lib.js
 * @module api_lib
 * @description Kumpulan fungsi untuk melakukan permintaan API ke server lokal.
 */

/**
 * Melakukan permintaan POST ke API.
 * @async
 * @function postApiRes
 * @param {string} resource - Sumber daya API yang akan diakses.
 * @param {Object} value - Data yang akan dikirim dalam permintaan POST.
 * @returns {Promise<Object>} Hasil respon dari API dalam bentuk JSON.
 */
export const postApiRes = async ( resource, value ) => {
    const response = await fetch(`http://localhost:3000/api/${resource}`, {
        method: 'POST',
        body: JSON.stringify(value),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data
}

/**
 * Melakukan permintaan PATCH ke API.
 * @async
 * @function patchApiRes
 * @param {string} resource - Sumber daya API yang akan diakses.
 * @param {Object} value - Data yang akan dikirim dalam permintaan PATCH.
 * @returns {Promise<Object>} Hasil respon dari API dalam bentuk JSON.
 */
export const patchApiRes = async ( resource, value ) => {
    const response = await fetch(`http://localhost:3000/api/${resource}`, {
        method: 'PATCH',
        body: JSON.stringify(value),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data
}

/**
 * Melakukan permintaan DELETE ke API.
 * @async
 * @function deleteApiRes
 * @param {string} resource - Sumber daya API yang akan diakses.
 * @param {Object} value - Data yang akan dikirim dalam permintaan DELETE.
 * @returns {Promise<Object>} Hasil respon dari API dalam bentuk JSON.
 */
export const deleteApiRes = async ( resource, value ) => {
    const response = await fetch(`http://localhost:3000/api/${resource}`, {
        method: 'DELETE',
        body: JSON.stringify(value),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data
}

/**
 * Melakukan permintaan GET ke API.
 * @async
 * @function getApiRes
 * @param {string} resource - Sumber daya API yang akan diakses.
 * @returns {Promise<Object>} Hasil respon dari API dalam bentuk JSON.
 */
export const getApiRes = async ( resource ) => {
    const response = await fetch(`http://localhost:3000/api/${resource}`, {
        method: "GET"
    })

    const data = await response.json();
    return data
}