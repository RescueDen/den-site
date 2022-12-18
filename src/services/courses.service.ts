import axios from 'axios';
import {authHeader} from "../utils/auth-header";
import CourseListing, {CourseListingData} from "../models/Courses";

export const coursesService = {
    getCoursesSummary,
    downloadLessonInfo: getLessonInfo,
};

// Create a default axios instance with the api
const apiServer = axios.create({
    baseURL: process.env.REACT_APP_API_URL

});

function getCoursesSummary(category: string): Promise<CourseListing> {

    //Get the headers
    const headers = authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/courses/${category}`, {headers: headers});

    //We need to do some work here
    return responsePromise.then(response => {//When the request returns
            const data = response.data as CourseListingData;

            return new CourseListing(data);
        }
    );
}

function getLessonInfo(category: string, id: string): Promise<string> {

    //Get the headers
    const headers = authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/courses/${category}/${id}`, {headers: headers});

    //We need to do some work here
    return responsePromise.then(response => {//When the request returns
            //Get the user
            const artData = response.data as string;

            return artData;
        }
    );


}

