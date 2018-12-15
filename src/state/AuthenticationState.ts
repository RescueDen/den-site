import CawsUser from "../models/CawsUser";

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
}

export enum AuthenticationStatus{
    TRUE,
    ATTEMPT,
    FALSE
}

