import axios from 'axios';
import CawsAnimal, {CawsAnimalData} from "../models/CawsAnimal";
import {authHeader} from "../utils/auth-header";
import ArticlesSummary, {ArticleItemData} from "../models/ArticlesSummary";

export const infoService = {
    getInfoSummary,
    downloadInfoArticle: getInfoArticle,
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
function getInfoSummary() : Promise<ArticlesSummary> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get('/info/',  {headers:headers});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const anData = <ArticleItemData>response.data;

            //Make a caws user
            const info = new ArticlesSummary(anData)

            //Return just the user
            return info;
        }
    );


}
/**
 * Get the article information
 * @param username
 * @param password
 * @returns
 */
function getInfoArticle(id:string) : Promise<string> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/info/${id}`,  {headers:headers});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const artData = <string>response.data;

            return artData;
        }
    );


}

