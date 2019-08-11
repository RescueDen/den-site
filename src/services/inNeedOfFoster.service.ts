import axios from 'axios';
import {authHeader} from "../utils/auth-header";
import InNeedOfFoster, {InNeedOfFosterData, NonShelterAnimal} from "../models/InNeedOfFosterModel";

export const inNeedOfFosterService = {
    getInNeedOfFosterList,
    uploadAnimal,
    removeAnimal
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
function getInNeedOfFosterList() : Promise<InNeedOfFoster> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get('/inneed/',  {headers:headers});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const data = <InNeedOfFosterData>response.data;

            //Get the img url
            const imgUrl = process.env.REACT_APP_API_URL? process.env.REACT_APP_API_URL :"";

            //Make a caws user
            const model = new InNeedOfFoster(data,imgUrl)

            //Return just the user
            return model;
        }
    );


}

function uploadAnimal(data: NonShelterAnimal, file?: File) : Promise<InNeedOfFoster> {

    //Make a new form data
    let dataInForm = new FormData()
    dataInForm.append("name", data.name)
    dataInForm.append("location", data.location)
    dataInForm.append("information", data.information)
    dataInForm.append("species", data.species)

    if(file) {
        dataInForm.append("image", file)
    }

    //Get the headers
    const headers =authHeader();

    //Add it the type
    headers['Content-Type'] = 'multipart/form-data';

    //Now make a post request and get a promise back
    const responsePromise = apiServer.post(`/inneed/`, dataInForm,{headers:headers});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const data = <InNeedOfFosterData>response.data;

            //Get the img url
            const imgUrl = process.env.REACT_APP_API_URL? process.env.REACT_APP_API_URL :"";

            //Make a caws user
            const model = new InNeedOfFoster(data,imgUrl)

            //Return just the user
            return model;
        }
    );
}

function removeAnimal(id:string) : Promise<InNeedOfFoster> {


    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.delete(`/inneed/${id}`,{headers:headers});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const data = <InNeedOfFosterData>response.data;

            //Get the img url
            const imgUrl = process.env.REACT_APP_API_URL? process.env.REACT_APP_API_URL :"";

            //Make a caws user
            const model = new InNeedOfFoster(data,imgUrl)

            //Return just the user
            return model;
        }
    );
}
