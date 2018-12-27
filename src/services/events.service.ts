import axios from 'axios';
import {authHeader} from "../utils/auth-header";
import FormsSummary, {FormItemData} from "../models/FormsSummary";
import {FormSubmision} from "../models/FormSubmision";
import {ServerResponse} from "http";
import {ServerResponseStatus} from "../models/ServerStatus";
import {DocumentItemData} from "../models/DocumentSummary";
import EventsSummary from "../models/Events";

export const eventsService = {
    getEventsSummary,
    downloadEventInfo
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
function getEventsSummary() : Promise<EventsSummary> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get('/events/',  {headers:headers});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const data = <DocumentItemData>response.data;

            //Make a caws user
            const info = new EventsSummary(data)

            //Return just the user
            return info;
        }
    );


}
/**
 * Get the html info for this Event
 * @param username
 * @param password
 * @returns
 */
function downloadEventInfo(id:string) : Promise<string> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/events/info/${id}`,  {headers:headers});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const artData = <string>response.data;

            return artData;
        }
    );


}



/**
 * Get the info summary
 * @param username
 * @param password
 * @returns
 */
function submitForm(sub :FormSubmision) : Promise<ServerResponseStatus> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.post('/forms/',  sub, {headers:headers});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const data = <ServerResponseStatus>response.data;

            //Return just the user
            return data;
        }
    );


}