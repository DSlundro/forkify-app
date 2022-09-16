import { async } from "regenerator-runtime";
import { TIMEOUT_SEC } from "./config";

//////////////////////////////////////////////////////////////////////

const timeout = function (s) {
    // Returns a rejected promise if timeout over in {s} seconds
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
        });
    };

export const AJAX = async function(url, uploadData = undefined){
    try {
        const fetchPro = uploadData ? fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(uploadData),
        }) : fetch(url);
        // Returns a faster value, if a promise returns a timeout it will gives an error
        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        // Transform response data in json
        const data = await res.json()
        // Check if the status isn't ok, so generate a new error
        if(!res.ok) throw new Error(`${data.message} (${res.status})`)

        return data;
    } catch (err) {
        // Generate a new error
        throw err;
    }
}
