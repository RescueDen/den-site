import axios from 'axios';
import CawsAnimal, {CawsAnimalData} from "../models/CawsAnimal";
import {authHeader} from "../utils/auth-header";
import ArticlesSummary, {ArticleItemData} from "../models/ArticlesSummary";
import {AchievementData} from "../models/Achievements";

export const achievementsService = {
    getAchievements,
    getAllAchievements
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
 * get achievements for this person
 * @param username
 * @param password
 * @returns
 */
function getAchievements(asmId: number) : Promise<AchievementData[]> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/achievements/${asmId}`,  {headers:headers});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const data = <AchievementData[]>response.data;

            //Now set the url for each
            data.forEach(ach =>{
                ach.badgeUrl = process.env.REACT_APP_API_URL + "/achievements/badge/" + ach.badge + ".svg";
            })

            //Return just the user
            return data;
        }
    );
}

/**
 * get all possible achievements
 * @param username
 * @param password
 * @returns
 */
function getAllAchievements() : Promise<AchievementData[]> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/achievements/`,  {headers:headers});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const data = <AchievementData[]>response.data;

            //Now set the url for each
            data.forEach(ach =>{
                ach.badgeUrl = process.env.REACT_APP_API_URL + "/achievements/badge/" + ach.badge + ".svg";
            })

            //Return just the user
            return data;
        }
    );
}