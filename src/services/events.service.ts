import axios from 'axios';
import {authHeader} from "../utils/auth-header";
import EventListing, {EventListingData} from "../models/Events";
import {SignUpResponse} from "../models/SignUp";

export const eventsService = {
    getEventsSummary: getEventsListing, downloadEventInfo, downloadEventSignup, postEventSignup, deleteEventSignup
};

// Create a default axios instance with the api
const apiServer = axios.create({
    baseURL: process.env.REACT_APP_API_URL

});

function getEventsListing(category: string): Promise<EventListing> {

    //Get the headers
    const headers = authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/events/${category}`, {headers: headers});


    //We need to do some work here
    return responsePromise.then(response => {//When the request returns
        //Get the user
        const data = <EventListingData>response.data;

        //Make a caws user
        const info = new EventListing(data)

        //Return just the user
        return info;
    });


}

/**
 * Get the html info for this Event
 * @param username
 * @param password
 * @returns
 */
function downloadEventInfo(id: string): Promise<string> {

    //Get the headers
    const headers = authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/events/info/${id}`, {headers: headers});


    //We need to do some work here
    return responsePromise.then(response => {//When the request returns
        //Get the user
        const artData = <string>response.data;

        return artData;
    });


}

/**
 * Get the html info for this Event
 * @param username
 * @param password
 * @returns
 */
function downloadEventSignup(category: string, id: string, rowId?: number): Promise<SignUpResponse> {

    //Get the headers
    const headers = authHeader();

    //Now make a post request and get a promise back
    let responsePromise;

    //If we are asking for a specific row
    if (rowId) {
        responsePromise = apiServer.get(`/events/signup/${category}/${id}/${rowId}`, {headers: headers});
    } else {
        responsePromise = apiServer.get(`/events/signup/${category}/${id}`, {headers: headers});
    }

    //We need to do some work here
    return responsePromise.then(response => {//When the request returns
        //Get the user
        const artData = <SignUpResponse>response.data;

        return artData;
    });


}

/**
 * Get the html info for this Event
 * @param username
 * @param password
 * @returns
 */
function deleteEventSignup(category: string, id: string, rowId: number): Promise<SignUpResponse> {

    //Get the headers
    const headers = authHeader();

    //Now make a post request and get a promise back
    let responsePromise;

    //If we are asking for a specific row
    responsePromise = apiServer.delete(`/events/signup/${category}/${id}/${rowId}`, {headers: headers});

    //We need to do some work here
    return responsePromise.then(response => {//When the request returns
        //Get the user
        const artData = <SignUpResponse>response.data;

        return artData;
    });


}


/**
 * Get the info summary
 * @param username
 * @param password
 * @returns
 */
function postEventSignup(sub: any, category: string, id: string, rowId?: number): Promise<SignUpResponse> {

    //Get the headers
    const headers = authHeader();

    //Create an object to hold the sub
    const subObject = {
        submission: sub, rowId: rowId
    }


    //Now make a post request and get a promise back
    const responsePromise = apiServer.post(`/events/signup/${category}/${id}`, subObject, {headers: headers});


    //We need to do some work here
    return responsePromise.then(response => {//When the request returns
        //Get the user
        const artData = <SignUpResponse>response.data;

        return artData;
    });


}