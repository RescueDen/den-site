import axios from 'axios';
import CawsAnimal, {CawsAnimalData} from "../models/CawsAnimal";
import {authHeader} from "../utils/auth-header";
import ArticlesSummary, {ArticleItemData} from "../models/ArticlesSummary";

export const staticService = {
    getPublicPage,
    getPrivatePage
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
function getPublicPage(page:string) : Promise<string> {

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/static/public/${page}`);


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
function getPrivatePage(page:string) : Promise<string> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/static/private/${page}`,  {headers:headers});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const artData = <string>response.data;

            return artData;
        }
    );


}