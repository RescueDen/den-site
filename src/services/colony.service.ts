import axios from 'axios';
import {authHeader} from "../utils/auth-header";
import {Colony} from "../models/Colony";

export const colonyService = {
    getColonyList, updateColony, loadColony
};

// Create a default axios instance with the api
const apiServer = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

function getColonyList(): Promise<Colony[]> {
    //Get the headers
    const headers = authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/colony`, {headers: headers});

    //We need to do some work here
    return responsePromise.then(response => {
        return response.data as Colony[];
    });
}

function updateColony(colony: Colony): Promise<Colony> {

    //Get the headers
    const headers = authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.post(`/colony`, colony, {headers: headers});

    //We need to do some work here
    return responsePromise.then(response => {
        return response.data as Colony;
    });
}

function loadColony(colonyId: number): Promise<Colony> {

    //Get the headers
    const headers = authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/colony/${colonyId}`, {headers: headers});

    //We need to do some work here
    return responsePromise.then(response => {
        return response.data as Colony;
    });
}

