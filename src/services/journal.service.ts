import axios from 'axios';
import {authHeader} from "../utils/auth-header";
import {JournalEntry} from "../models/JournalEntry";


export const journalService = {
    getJournalEntriesForAnimal,
    postJournalEntryForAnimal

};

// Create a default axios instance with the api
const apiServer = axios.create({
    baseURL: process.env.REACT_APP_API_URL

});

/**
 * Get the category summary
 * @param username
 * @param password
 * @returns
 */
function getJournalEntriesForAnimal(id: number): Promise<JournalEntry[]> {

    //Get the headers
    const headers = authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/journal/animal/${id}`, {headers: headers});


    //We need to do some work here
    return responsePromise.then(response => {//When the request returns
            //Get the user
            const data = response.data as JournalEntry[];

            //Return just the user
            return data;//CourseListing(data);
        }
    );


}

/**
 * Get the category summary
 * @param username
 * @param password
 * @returns
 */
function postJournalEntryForAnimal(jou: JournalEntry): Promise<JournalEntry[]> {

    //Get the headers
    const headers = authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.post(`/journal/animal/`, jou, {headers: headers});


    //We need to do some work here
    return responsePromise.then(response => {//When the request returns
            //Get the user
            const data = response.data as JournalEntry[];

            //Return just the user
            return data;//CourseListing(data);
        }
    );


}