import axios from 'axios';
import {authHeader} from "../utils/auth-header";
import {ContentListing, ListingData} from "../models/ContentListing";

export const contentService = {
    getContentListing,
    downloadContent
};

// Create a default axios instance with the api
const apiServer = axios.create({
    baseURL: process.env.REACT_APP_API_URL

});

function getContentListing(category: string): Promise<ContentListing> {

    //Get the headers
    const headers = authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/content/${category}`, {headers: headers});


    //We need to do some work here
    return responsePromise.then(response => {//When the request returns
            const data = <ListingData>response.data;

            const listing = new ContentListing(data)

            return listing;
        }
    );


}

function downloadContent(category: string, id: string): Promise<string> {

    //Get the headers
    const headers = authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/content/${category}/${id}`, {headers: headers});


    //We need to do some work here
    return responsePromise.then(response => {//When the request returns
            //Get the user
            const artData = <string>response.data;

            return artData;
        }
    );
}

