/**
 * This util function gets the current user object out of memory and adds the token
 * to the header.  This is used in a bunch of places
 * @returns {*}
 */
export function authHeader() {
    //Get the local user

    // return authorization header with jwt token
    let userString = localStorage.getItem("currentUser")

    if (!userString) {
        return {}
    }

    let user = JSON.parse(userString);

    if (user && user.token) {
        return {
            'Authorization': 'Bearer ' + user.token, 'Content-Type': 'application/json'
        };
    } else {
        return {};
    }
}