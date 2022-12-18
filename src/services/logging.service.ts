import axios from 'axios';
import {authHeader} from "../utils/auth-header";
import {CategoryInfoSummary, LogData, LogSummary} from "../models/Logging";

export const loggingService = {
    getCategorySummary, getLogSummary, addLog, removeLog
    // getAll,
    // getById,
    // update,
    // delete: _delete
};

// Create a default axios instance with the api
const apiServer = axios.create({
    baseURL: process.env.REACT_APP_API_URL

});

/**
 * Get the category summary
 * @returns
 */
function getCategorySummary(): Promise<CategoryInfoSummary> {

    //Get the headers
    const headers = authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get('/logging', {headers: headers});


    //We need to do some work here
    return responsePromise.then(response => {//When the request returns
        //Get the user
        //Return just the user
        return response.data as CategoryInfoSummary;//CourseListing(data);
    });


}

/**
 * Get the log information for the specified user
 * @returns
 * @param asmId
 */
function getLogSummary(asmId: number): Promise<LogSummary> {

    //Get the headers
    const headers = authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/logging/${asmId}`, {headers: headers});


    //We need to do some work here
    return responsePromise.then(response => {//When the request returns
        //Get the user
        return response.data as LogSummary;
    });


}

/**
 * Get the log information for the specified user
 * @returns
 * @param log
 */
function addLog(log: LogData): Promise<LogSummary> {

    //Get the headers
    const headers = authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.post(`/logging`, log, {headers: headers});


    //We need to do some work here
    return responsePromise.then(response => {//When the request returns
        //Get the user
        return response.data as LogSummary;
    });


}

/**
 * Get the log information for the specified user
 * @param logId
 * @param type
 * @param logId
 */
function removeLog(type: string, logId: number): Promise<LogSummary> {

    //Get the headers
    const headers = authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.delete(`/logging/${type}/${logId}`, {headers: headers});


    //We need to do some work here
    return responsePromise.then(response => {//When the request returns
        //Get the user
        return response.data as LogSummary;
    });


}
