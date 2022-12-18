import axios from 'axios';
import {authHeader} from "../utils/auth-header";
import FormListing, {FormListingData} from "../models/FormListing";
import {FormSubmission} from "../models/FormSubmission";
import {ServerResponseStatus} from "../models/ServerStatus";

export const formsService = {
    getFormsSummary,
    submitForm
};

// Create a default axios instance with the api
const apiServer = axios.create({
    baseURL: process.env.REACT_APP_API_URL

});

/**
 * Get the info summary
 * @param username
 * @param password
 * @returns
 */
function getFormsSummary(category: string): Promise<FormListing> {

    //Get the headers
    const headers = authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/forms/${category}`, {headers: headers});


    //We need to do some work here
    return responsePromise.then(response => {//When the request returns
            //Get the user
            const data = response.data as FormListingData;

            //Make a caws user
            const info = new FormListing(data)

            //Return just the user
            return info;
        }
    );


}

/**
 * Get the info summary
 * @param username
 * @param password
 * @returns
 */
function submitForm(category: string, sub: FormSubmission): Promise<ServerResponseStatus> {

    //Get the headers
    const headers = authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.post(`/forms/${category}`, sub, {headers: headers});

    //We need to do some work here
    return responsePromise.then(response => {//When the request returns
            //Get the user
            const data = response.data as ServerResponseStatus;

            //Return just the user
            return data;
        }
    );


}