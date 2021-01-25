import axios from 'axios';
import {authHeader} from "../utils/auth-header";
import {VoucherClient} from "../models/VoucherClient";

export const voucherClientService = {
    getClient,
    searchForClients,
};

// Create a default axios instance with the api
const apiServer =  axios.create({
    baseURL:process.env.REACT_APP_API_URL

});

function getClient(id:number) : Promise<VoucherClient> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/voucher/client/${id}`,  {headers:headers});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const stats = response.data as VoucherClient;
            //Return just the user
            return stats;
        }
    );
}

function searchForClients(search:string) : Promise<VoucherClient[]> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get('/voucher/client/search', {params:{criteria:search},headers:headers});

    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const stats = response.data as VoucherClient[];
            //Return just the user
            return stats;
        }
    );
}

// function updateClient(client: VoucherClient): Promise<VoucherClient> {
//     //Get the headers
//     const headers =authHeader();
//
//     //Now make a post request and get a promise back
//     const responsePromise = apiServer.post('/voucher/client',client,  {headers:headers});
//
//     //We need to do some work here
//     return responsePromise.then(response =>
//         {//When the request returns
//             //Get the user
//             const stats = response.data as VoucherClient;
//
//             //Return just the user
//             return stats;
//         }
//     );
// }
