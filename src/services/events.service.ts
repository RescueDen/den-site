import axios from 'axios';
import {authHeader} from "../utils/auth-header";
import FormsSummary, {FormItemData} from "../models/FormsSummary";
import {FormSubmision} from "../models/FormSubmision";
import {ServerResponse} from "http";
import {ServerResponseStatus} from "../models/ServerStatus";
import {DocumentItemData} from "../models/DocumentSummary";
import EventsSummary from "../models/Events";
import {SignUpResponse} from "../models/SignUp";

export const eventsService = {
    getEventsSummary,
    downloadEventInfo,
    downloadEventSignup,
    postEventSignup,
    deleteEventSignup
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
 * Get the html info for this Event
 * @param username
 * @param password
 * @returns
 */
function downloadEventSignup(id:string, rowId?:number) : Promise<SignUpResponse> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    let responsePromise;

    //If we are asking for a specific row
    if(rowId) {
        responsePromise = apiServer.get(`/events/signup/${id}/${rowId}`, {headers: headers});
    }else{
        responsePromise = apiServer.get(`/events/signup/${id}`, {headers: headers});
    }

    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const artData = <SignUpResponse>response.data;

            return artData;
        }
    );


}

/**
 * Get the html info for this Event
 * @param username
 * @param password
 * @returns
 */
function deleteEventSignup(id:string, rowId:number) : Promise<SignUpResponse> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    let responsePromise;

    //If we are asking for a specific row
    responsePromise = apiServer.delete(`/events/signup/${id}/${rowId}`, {headers: headers});

    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const artData = <SignUpResponse>response.data;

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
function postEventSignup( sub :any, id:string, rowId?:number) : Promise<SignUpResponse> {

    //Get the headers
    const headers =authHeader();

    //Create an object to hold the sub
    const subObject = {
        submission:sub,
        rowId: rowId
    }


    //Now make a post request and get a promise back
    const responsePromise = apiServer.post(`/events/signup/${id}`,  subObject, {headers:headers});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const artData = <SignUpResponse>response.data;

            return artData;
        }
    );


}