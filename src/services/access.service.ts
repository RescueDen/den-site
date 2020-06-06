import axios from 'axios';
import CawsAnimal, {ShelterAnimalData} from "../models/ShelterAnimal";
import {authHeader} from "../utils/auth-header";
import ArticlesSummary, {ArticleItemData} from "../models/ArticlesSummary";
import {CodeResponse} from "../models/Access";
import * as FileSaver from "file-saver";

export const accessService = {
    getCode,
    downloadLog
}

// Create a default axios instance with the api
const apiServer =  axios.create({
    baseURL:process.env.REACT_APP_API_URL

});


function getCode(loc:string) : Promise<CodeResponse> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/access/code/${loc}`,  {headers:headers});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const data = <CodeResponse>response.data;

            return data;
        }
    );


}

function downloadLog(loc:string) : Promise<Blob> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/access/log/${loc}`,  {headers:headers,responseType: 'blob'});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
           return response.data
        }
    );


}
// /**
//  * Get the article information
//  * @param username
//  * @param password
//  * @returns
//  */
// function getInfoArticle(id:string) : Promise<string> {
//
//     //Get the headers
//     const headers =authHeader();
//
//     //Now make a post request and get a promise back
//     const responsePromise = apiServer.get(`/info/${id}`,  {headers:headers});
//
//
//     //We need to do some work here
//     return responsePromise.then(response =>
//         {//When the request returns
//             //Get the user
//             const artData = <string>response.data;
//
//             return artData;
//         }
//     );
//
//
// }

