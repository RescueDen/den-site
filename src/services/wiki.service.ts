import axios from 'axios';
import {authHeader} from "../utils/auth-header";
import {WikiPage} from "../models/WikiPage";

export const wikiService = {
    getWikiPage, postWikiPage
};

// Create a default axios instance with the api
const apiServer = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

function getWikiPage(contentPath: string): Promise<WikiPage> {

    //Get the headers
    const headers = authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(contentPath, {headers: headers});

    return responsePromise.then(response => {
        return response.data as WikiPage;
    });
}

function postWikiPage(contentPath: string, page: WikiPage): Promise<WikiPage> {

    //Get the headers
    const headers = authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.post(contentPath, page, {headers: headers});

    return responsePromise.then(response => {
        return response.data as WikiPage;
    });
}