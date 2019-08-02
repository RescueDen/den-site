import axios from 'axios';
import {authHeader} from "../utils/auth-header";
import {VoucherInfo} from "../models/Voucher";

export const voucherService = {
    getVoucherInfo,
    // register,
    // getAll,
    // getById,
    // update,
    // delete: _delete
};

// Create a default axios instance with the api
const apiServer =  axios.create({
    baseURL:process.env.REACT_APP_API_URL

});

/**
 * Get the info summary
 * @param username
 * @param password
 * @returns
 */
function getVoucherInfo() : Promise<VoucherInfo> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get('/voucher/info/',  {headers:headers});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const stats = response.data as VoucherInfo;


            //Return just the user
            return stats;
        }
    );


}