import axios from 'axios';
import {authHeader} from "../utils/auth-header";
import CourseListing, {CourseData} from "../models/Courses";

export const coursesService = {
    getCoursesSummary,
    downloadLessonInfo: getLessonInfo,
    // register,
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
function getCoursesSummary() : Promise<CourseListing> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get('/courses/',  {headers:headers});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const data = <CourseData[]>response.data;

            //Return just the user
            return new CourseListing(data);
        }
    );


}
/**
 * Get the lesson information
 * @param username
 * @param password
 * @returns
 */
function getLessonInfo(id:string) : Promise<string> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/courses/${id}`,  {headers:headers});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const artData = <string>response.data;

            return artData;
        }
    );


}

