import CawsUser from "../models/CawsUser";
import Permissions from "../models/Permissions";

/**
 * This model describes the authorisation
 */
export default interface AuthenticationState {
    loggedInUser?: CawsUser,
    loggedInStatus?:AuthenticationStatus,
    loggedInMsg?:string,
    activatedUserStatus?:AuthenticationStatus,
    activatedUserMsg?:string,
    registerUserStatus?:AuthenticationStatus,
    registerUserMsg?:string,
    pwResetStatus?:AuthenticationStatus,
    pwResetUserMsg?:string,

    //Keep the user permissions
    permissions?:Permissions,
}

export enum AuthenticationStatus{
    TRUE,
    ATTEMPT,
    FALSE
}

