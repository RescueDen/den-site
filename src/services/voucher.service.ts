import axios from 'axios';
import {authHeader} from "../utils/auth-header";
import {Voucher, VoucherInfo, VoucherSearch, VoucherSearchResults} from "../models/Voucher";

export const voucherService = {
    getVoucherInfo,
    performVoucherSearch,
    getVoucherById,
    // getAll,
    // getById,
    // update,
    // delete: _delete
    updateVoucher
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
    const responsePromise = apiServer.get('/voucher/info',  {headers:headers});


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

/**
 * Get the info summary
 * @param username
 * @param password
 * @returns
 */
function getVoucherById(id:number) : Promise<Voucher> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get('/voucher/id/' + id,  {headers:headers});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const stats = response.data as Voucher;


            //Return just the user
            return stats;
        }
    );


}

/**
 * Performs the voucher searc
 * @param username
 * @param password
 * @returns
 */
function performVoucherSearch(params:VoucherSearch) : Promise<VoucherSearchResults> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.post('/voucher/search',params,  {headers:headers});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const stats = response.data as VoucherSearchResults;

            //Return just the user
            return stats;
        }
    );


}

function updateVoucher(voucher: Voucher): Promise<Voucher> {
    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.post('/voucher/',voucher,  {headers:headers});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const stats = response.data as Voucher;


            //Return just the user
            return stats;
        }
    );
}