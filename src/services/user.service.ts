import axios from 'axios';
import {ServerResponseStatus} from "../models/ServerStatus";
import ShelterUser, {ShelterUserData} from "../models/ShelterUser";
import {authHeader} from "../utils/auth-header";
import Permissions, {PermissionsData} from "../models/Permissions";
import {UserPreferences, SettingGroup} from "../models/UserPreferences";
import {organizationService} from "./organization.service"

export const userService = {
    login,
    logout,
    registerNewUser,
    activateUser,
    requestActivationToken,
    requestEmailReset,
    forcePasswordChange,
    updateLoggedInUser,
    getLoggedInUserPermissions,
    getLoggedInUserPreferences,
    setLoggedInUserPreferences,
    loginFacebook,
    loginGoogle,
    requestOneTimePassword,
    loginWithOneTimePassword
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
function login(email:string, password:string, organizationId: number) : Promise<ShelterUser> {

    //Now make a post request and get a promise back
    const responsePromise = apiServer.post('/users/login', { email: email, password: password, organizationId:organizationId });

    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const userData = <ShelterUserData>response.data;

            //Log that user in
            localStorage.setItem('currentUser', JSON.stringify(userData));

            //Make a caws user
            const cawsUser = new ShelterUser(userData)

            //Return just the user
            return cawsUser;
        }
    );
}

/**
 * Attempt to login the user to the server
 * @param username
 * @param password
 * @returns
 */
function loginFacebook(facebookToken:any) : Promise<ShelterUser> {

    //Now make a post request and get a promise back
    const responsePromise = apiServer.post('/users/login/facebook', facebookToken);

    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const userData = <ShelterUserData>response.data;

            //Log that user in
            localStorage.setItem('currentUser', JSON.stringify(userData));

            //Make a caws user
            const cawsUser = new ShelterUser(userData)

            //Return just the user
            return cawsUser;
        }
    );


}

/**
 * Attempt to login the user to the server
 * @param username
 * @param password
 * @returns
 */
function loginGoogle(googleToken:any) : Promise<ShelterUser> {

    const token = {
        token: googleToken,
        organizationId: organizationService.getCurrentOrganizationId(),
    }

    //Now make a post request and get a promise back
    const responsePromise = apiServer.post('/users/login/google', token);

    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const userData = <ShelterUserData>response.data;

            //Log that user in
            localStorage.setItem('currentUser', JSON.stringify(userData));

            //Make a caws user
            const cawsUser = new ShelterUser(userData)

            //Return just the user
            return cawsUser;
        }
    );


}

/**
 * Gets the latest data for the logged in user.
 * @param username
 * @param password
 * @returns
 */
function updateLoggedInUser() : Promise<ShelterUser> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get('/users/',  {headers:headers});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const userData = <ShelterUserData>response.data;

            //Make a caws user
            const cawsUser = new ShelterUser(userData)

            //Return just the user
            return cawsUser;
        }
    );


}

/**
 * Gets the latest data for the logged in user.
 * @param username
 * @param password
 * @returns
 */
function getLoggedInUserPermissions() : Promise<Permissions> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get('/users/permissions',  {headers:headers});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const permData = <PermissionsData>response.data;

            //Make a caws user
            const perm = new Permissions(permData)

            //Log that user in
            localStorage.setItem('currentPermissions', JSON.stringify(permData));


            //Return just the user
            return perm;
        }
    );


}


function getLoggedInUserPreferences() : Promise<UserPreferences> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.get('/users/preferences',  {headers:headers});


    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const prefData = <UserPreferences>response.data;

            //Log that user in
            localStorage.setItem('currentPreferences', JSON.stringify(prefData));

            //Return just the user
            return prefData;
        }
    );


}

function setLoggedInUserPreferences(setting :SettingGroup) : Promise<UserPreferences> {

    //Get the headers
    const headers =authHeader();

    //Now make a post request and get a promise back
    const responsePromise = apiServer.post('/users/preferences',setting,  {headers:headers});

    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const prefData = <UserPreferences>response.data;

            //Log that user in
            localStorage.setItem('currentPreferences', JSON.stringify(prefData));

            //Return just the user
            return prefData;
        }
    );
}

/**
 * Logs out the current user from removing the local storage
 */
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentPermissions');
}

export interface RegisterUserData{
    email:string;
    password?:string;
    organizationId:number;
}

/**
 * This function add a new user to the service
 */
function registerNewUser(user: RegisterUserData): Promise<ServerResponseStatus>{
    //Now make a post request and get a promise back
    const responsePromise = apiServer.post('/users/new', user);

    //Now convert it to a serverResponse
    return responsePromise.then(response =>{
        return  <ServerResponseStatus>response.data;
    });


}

/**
 * This function add a new user to the service
 */
function forcePasswordChange(email:string, reset_token:string, password:string): Promise<ServerResponseStatus>{
    const sendData:any ={
        email,
        password,
        reset_token,
    }
    //Now make a post request and get a promise back
    const responsePromise = apiServer.post('/users/password/reset', sendData);

    //Now convert it to a serverResponse
    return responsePromise.then(response =>{
        return  <ServerResponseStatus>response.data;
    });


}

function requestOneTimePassword(email: string, organizationId: number): Promise<ServerResponseStatus>{
    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/users/onetimelogin`,{params:{email:email, organizationId:organizationId}});

    //Now convert it to a serverResponse
    return responsePromise.then(response =>{
        return  <ServerResponseStatus>response.data;
    });
}

function loginWithOneTimePassword(email: string, token:string, organizationId: number): Promise<ShelterUser>{
    //Define a little object
    const sendData:any = {
        email:email,
        login_token: token,
        organizationId: organizationId,
    }
    //Now make a post request and get a promise back
    const responsePromise = apiServer.post('/users/onetimelogin', sendData);

    //Now convert it to a serverResponse
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const userData = <ShelterUserData>response.data;

            //Log that user in
            localStorage.setItem('currentUser', JSON.stringify(userData));

            //Make a caws user
            const cawsUser = new ShelterUser(userData)

            //Return just the user
            return cawsUser;
        }
    );
}

/**
 * This function add a new user to the service
 */
function requestActivationToken(email: string): Promise<ServerResponseStatus>{
    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/users/activate`,{params:{email:email}});

    //Now convert it to a serverResponse
    return responsePromise.then(response =>{
        return  <ServerResponseStatus>response.data;
    });
}

/**
 * This function add a new user to the service
 */
function requestEmailReset(email: string): Promise<ServerResponseStatus>{
    //Now make a post request and get a promise back
    const responsePromise = apiServer.get(`/users/password/reset`,{params:{email:email}});

    //Now convert it to a serverResponse
    return responsePromise.then(response =>{
        return  <ServerResponseStatus>response.data;
    });


}


/**
 * This function add a new user to the service
 */
function activateUser(email:string, activationToken:string): Promise<ServerResponseStatus>{

    //Define a little object
    const sendData:any = {
        email:email,
        activation_token: activationToken
    }

    //Now make a post request and get a promise back
    const responsePromise = apiServer.post('/users/activate', sendData);

    //Now convert it to a serverResponse
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const data = <ServerResponseStatus>response.data;

            return data;
        }
    );
}
