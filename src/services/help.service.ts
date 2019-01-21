import axios from 'axios';
import CawsAnimal, {CawsAnimalData} from "../models/CawsAnimal";
import {authHeader} from "../utils/auth-header";
import ArticlesSummary, {ArticleItemData} from "../models/ArticlesSummary";

export const helpService = {
    getPublicHelp,
    getPrivateHelp
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
 * Get the public help
 * @param username
 * @param password
 * @returns
 */
function getPublicHelp() : Promise<string> {

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/help/public`);


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const artData = <string>response.data;

            return artData;
        }
    );


}


/**
 * Get the public help
 * @param username
 * @param password
 * @returns
 */
function getPrivateHelp() : Promise<string> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/help/private`,  {headers:headers});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const artData = <string>response.data;

            return artData;
        }
    );


}