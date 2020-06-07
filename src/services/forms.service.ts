import axios from 'axios';
import {authHeader} from "../utils/auth-header";
import FormListing, {FormItemData, FormListingData} from "../models/FormListing";
import {FormSubmision} from "../models/FormSubmision";
import {ServerResponse} from "http";
import {ServerResponseStatus} from "../models/ServerStatus";

export const formsService = {
    getFormsSummary,
    submitForm
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
function getFormsSummary(category:string) : Promise<FormListing> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/forms/${category}`,  {headers:headers});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const data = <FormListingData>response.data;

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
function submitForm(category:string, sub :FormSubmision) : Promise<ServerResponseStatus> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.post(`/forms/${category}`,  sub, {headers:headers});

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