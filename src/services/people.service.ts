import axios from 'axios';
import ShelterAnimal, {ShelterAnimalData} from "../models/ShelterAnimal";
import {authHeader} from "../utils/auth-header";
import {PersonData} from "../models/People";
import {AchievementData} from "../models/Achievements";

export const peopleService = {
    getPerson, getAchievements
};

// Create a default axios instance with the api
const apiServer = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

/**
 * Attempt to login the user to the server
 * @returns
 * @param id
 */
function getPerson(id: number): Promise<PersonData> {

    //Get the headers
    const headers = authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/people/${id}`, {headers: headers});


    //We need to do some work here
    return responsePromise.then(response => {//When the request returns
        //Get the user
        //Return just the user
        return response.data as PersonData;
    });


}

/**
 * Attempt to login the user to the server
 * @returns
 * @param search
 */
function searchForAnimal(search: string): Promise<ShelterAnimal[]> {

    //Get the headers
    const headers = authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/search/animal`, {
        headers: headers, params: {
            search: search
        }
    });


    //We need to do some work here
    return responsePromise.then(response => {//When the request returns
        //Get the user
        const anData = response.data as ShelterAnimalData[];

        //Make a caws user for the search
        //Return just the user
        return anData.map(data => new ShelterAnimal(data));
    });


}

/**
 * get achievements for this person
 * @returns
 * @param userId
 */
function getAchievements(userId: number): Promise<AchievementData[]> {

    //Get the headers
    const headers = authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/people/achievements/${userId}`, {headers: headers});


    //We need to do some work here
    return responsePromise.then(response => {//When the request returns
        //Get the user
        const data = response.data as AchievementData[];

        //Now set the url for each
        data.forEach(ach => {
            ach.badgeUrl = process.env.REACT_APP_API_URL + "/achievements/badge/" + ach.id + ".svg";
        })

        //Return just the user
        return data;
    });
}
