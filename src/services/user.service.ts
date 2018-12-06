import axios from 'axios';
import {ServerResponseStatus} from "../models/ServerStatus";
import {UserData} from "../models/UserData";
import CawsUser, {CawsUserData} from "../models/CawsUser";


export const userService = {
    login,
    logout,
    registerNewUser
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
function login(email:string, password:string) : Promise<CawsUser> {

    //Now make a post request and get a promise back
    const responsePromise = apiServer.post('/users/login', { email: email, password: password });

    //We need to do some work here
    return responsePromise.then(response =>
        {//When the request returns
            //Get the user
            const userData = <CawsUserData>response.data;

            //Log that user in
            localStorage.setItem('currentUser', JSON.stringify(userData));

            //Make a caws user
            const cawsUser = new CawsUser(userData)

            //Return just the user
            return cawsUser;
        }
    );


}

/**
 * Logs out the current user from removing the local storage
 */
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
}

/**
 * This function add a new user to the service
 */
function registerNewUser(user: UserData): Promise<ServerResponseStatus>{
    //Now make a post request and get a promise back
    const responsePromise = apiServer.post('/users/new', user);

    //Now convert it to a serverResponse
    return responsePromise.then(any =>{
        return new ServerResponseStatus(true, "blue");


    });


}




//
// function getAll() {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };
//
//     return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
// }
//
// function getById(id) {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };
//
//     return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
// }
//
// function register(user) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };
//
//     return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
// }
//
// function update(user) {
//     const requestOptions = {
//         method: 'PUT',
//         headers: { ...authHeader(), 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };
//
//     return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
// }
//
// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//     const requestOptions = {
//         method: 'DELETE',
//         headers: authHeader()
//     };
//
//     return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
// }
//
// function handleResponse(response) {
//     return response.text().then(text => {
//         const data = text && JSON.parse(text);
//         if (!response.ok) {
//             if (response.status === 401) {
//                 // auto logout if 401 response returned from api
//                 logout();
//                 location.reload(true);
//             }
//
//             const error = (data && data.message) || response.statusText;
//             return Promise.reject(error);
//         }
//
//         return data;
//     });
// }