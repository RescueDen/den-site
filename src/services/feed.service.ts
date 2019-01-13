import axios from 'axios';
import CawsAnimal, {CawsAnimalData} from "../models/CawsAnimal";
import {authHeader} from "../utils/auth-header";
import ArticlesSummary, {ArticleItemData} from "../models/ArticlesSummary";
import {FeedItemData} from "../models/Feed";

export const feedService = {
    getFeed
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
function getFeed() : Promise<FeedItemData[]> {


    //Now make a post request and get a promise back
    const responsePromise = apiServer.get('/feed/26');


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const info = <FeedItemData[]>response.data;

            return info;
        }
    );


}