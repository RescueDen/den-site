import axios from 'axios';
import {authHeader} from "../utils/auth-header";
import {AchievementData, AchievementSummaryData} from "../models/Achievements";

export const achievementsService = {
    getMyAchievements,
    getAllAchievements,
    getAchievementSummary
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
function getMyAchievements() : Promise<AchievementData[]> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get('/achievements/user',  {headers:headers});

    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const data = <AchievementData[]>response.data;

            //Now set the url for each
            data.forEach(ach =>{
                ach.badgeUrl = process.env.REACT_APP_API_URL + "/achievements/badge/" + ach.id + ".svg";
            })

            //Return just the user
            return data;
        }
    );
}

/**
 * get achievements for this person
 * @param username
 * @param password
 * @returns
 */
function getAchievementSummary(achId: number) : Promise<AchievementSummaryData> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/achievements/${achId}`,  {headers:headers});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const data = <AchievementSummaryData>response.data;

            //Now set the url for each
            data.achievement.badgeUrl = process.env.REACT_APP_API_URL + "/achievements/badge/" + data.achievement.id + ".svg";

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
                ach.badgeUrl = process.env.REACT_APP_API_URL + "/achievements/badge/" + ach.id + ".svg";
            })

            //Return just the user
            return data;
        }
    );
}