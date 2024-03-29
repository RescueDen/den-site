import axios from 'axios';
import ShelterAnimal, {ShelterAnimalData} from "../models/ShelterAnimal";
import {authHeader} from "../utils/auth-header";
import {PersonData} from "../models/People";
import {AchievementData} from "../models/Achievements";

export const peopleService = {
    getPerson,
    getAchievements
};

// Create a default axios instance with the api
const apiServer =  axios.create({
    baseURL:process.env.REACT_APP_API_URL
});

/**
 * Attempt to login the user to the server
 * @param username
 * @param password
 * @returns
 */
function getPerson(id:number) : Promise<PersonData> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/people/${id}`,  {headers:headers});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const personData = <PersonData>response.data;

            //Return just the user
            return personData;
        }
    );


}

/**
 * Attempt to login the user to the server
 * @param username
 * @param password
 * @returns
 */
function searchForAnimal(search:string) : Promise<ShelterAnimal[]> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/search/animal`,
        {
            headers: headers,
            params: {
                search: search
            }
        }
        );


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const anData = <ShelterAnimalData[]>response.data;

            //Make a caws user for the search
            const cawAnimal = anData.map(data => new ShelterAnimal(data));

            //Return just the user
            return cawAnimal;
        }
    );


}

/**
 * get achievements for this person
 * @param username
 * @param password
 * @returns
 */
function getAchievements(userId: number) : Promise<AchievementData[]> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/people/achievements/${userId}`,  {headers:headers});


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
