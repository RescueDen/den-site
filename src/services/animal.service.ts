import axios from 'axios';
import CawsAnimal, {CawsAnimalData} from "../models/CawsAnimal";
import {authHeader} from "../utils/auth-header";

export const animalService = {
    getAnimal,

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
function getAnimal(id:number) : Promise<CawsAnimal> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/animal/${id}`,  {headers:headers});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const anData = <CawsAnimalData>response.data;

            //Make a caws user
            const cawAnimal = new CawsAnimal(anData)

            //Return just the user
            return cawAnimal;
        }
    );


}
