import axios from 'axios';
import {authHeader} from "../utils/auth-header";
import {AdoptionStat, Stats} from "../models/Stats";

export const statsService = {
    getStats,
    getAdoptionsByYear
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
function getStats() : Promise<Stats> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get('/stats/',  {headers:headers});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const stats = <Stats>response.data;


            //Return just the user
            return stats;
        }
    );


}
/**
 * Get a list of adoptions by year
 * @param username
 * @param password
 * @returns
 */
function getAdoptionsByYear(year:number) : Promise<AdoptionStat[]> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/stats/adoptions/${year}`,  {headers:headers});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const stats = response.data as AdoptionStat[];


            //Return just the user
            return stats;
        }
    );


}
