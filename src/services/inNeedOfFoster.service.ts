import axios from 'axios';
import CawsAnimal, {CawsAnimalData} from "../models/CawsAnimal";
import {authHeader} from "../utils/auth-header";
import ArticlesSummary, {ArticleItemData} from "../models/ArticlesSummary";
import InNeedOfFoster, {InNeedOfFosterData} from "../models/InNeedOfFosterModel";

export const inNeedOfFosterService = {
    getInNeedOfFosterList,
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
function getInNeedOfFosterList() : Promise<InNeedOfFoster> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get('/inneed/',  {headers:headers});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const data = <InNeedOfFosterData>response.data;

            //Make a caws user
            const model = new InNeedOfFoster(data)

            //Return just the user
            return model;
        }
    );


}
