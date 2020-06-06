import axios from 'axios';
import CawsAnimal, {ShelterAnimalData} from "../models/ShelterAnimal";
import {authHeader} from "../utils/auth-header";
import InNeedOfFoster, {InNeedOfFosterData, NonShelterAnimal} from "../models/InNeedOfFosterModel";

export const animalService = {
    getAnimal,
    searchForAnimal,
    uploadPicture,
    // register,
    // getAll,
    // getById,
    // update,
    // delete: _delete
    getAnimalsFromCodes
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
            const anData = <ShelterAnimalData>response.data;

            //Make a caws user
            const cawAnimal = new CawsAnimal(anData)

            //Return just the user
            return cawAnimal;
        }
    );


}

function getAnimalsFromCodes(shelterCodes: string[]): Promise<number[]>{

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/animal/shelterid`,
        {
            headers: headers,
            params: {
                code: shelterCodes
            }
        }
    );


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const idList = response.data as number[];

            //Return just the user
            return idList;
        }
    );

}

/**
 * Attempt to login the user to the server
 * @param username
 * @param password
 * @returns
 */
function searchForAnimal(search:string, onShelter:boolean) : Promise<CawsAnimal[]> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/search/animal`,
        {
            headers: headers,
            params: {
                search: search,
                onshelter:onShelter
            }
        }
        );


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const anData = <ShelterAnimalData[]>response.data;

            //Make a caws user for the search
            const cawAnimal = anData.map(data => new CawsAnimal(data));

            //Return just the user
            return cawAnimal;
        }
    );


}


function uploadPicture(id:number, notes:string, file: File) : Promise<CawsAnimal> {

    //Make a new form data
    let dataInForm = new FormData()
    dataInForm.append("notes", notes)
    dataInForm.append("image", file)

    //Get the headers
    const headers =authHeader();

    //Add it the type
    headers['Content-Type'] = 'multipart/form-data';

    //Now make a post request and get a promise back
    const responsePromise = apiServer.post(`/animal/picture/`+id, dataInForm,{headers:headers});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const data = response.data as ShelterAnimalData;

            //Make a caws user
            const cawAnimal = new CawsAnimal(data)

            //Return just the user
            return cawAnimal;
        }
    );
}