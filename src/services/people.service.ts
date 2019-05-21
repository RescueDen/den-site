import axios from 'axios';
import CawsAnimal, {CawsAnimalData} from "../models/CawsAnimal";
import {authHeader} from "../utils/auth-header";
import {PersonData} from "../models/People";

export const peopleService = {
    getPerson

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
 * Attempt to login the user to the server
 * @param username
 * @param password
 * @returns
 */
function getPerson(id:number) : Promise<PersonData> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/people/${id}`,  {headers:headers});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const personData = <PersonData>response.data;

            //Return just the user
            return personData;
        }
    );


}

/**
 * Attempt to login the user to the server
 * @param username
 * @param password
 * @returns
 */
function searchForAnimal(search:string) : Promise<CawsAnimal[]> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/search/animal`,
        {
            headers: headers,
            params: {
                search: search
            }
        }
        );


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const anData = <CawsAnimalData[]>response.data;

            //Make a caws user for the search
            const cawAnimal = anData.map(data => new CawsAnimal(data));

            //Return just the user
            return cawAnimal;
        }
    );


}
