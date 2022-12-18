import axios from 'axios';
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
const apiServer = axios.create({
    baseURL: process.env.REACT_APP_API_URL

});

/**
 * Get the info summary
 * @returns
 */
function getFeed(): Promise<FeedItemData[]> {


    //Now make a post request and get a promise back
    const responsePromise = apiServer.get('/feed/26');


    //We need to do some work here
    return responsePromise.then(response => {//When the request returns
        //Get the user
        const info = response.data as FeedItemData[];

        return info;
    });


}