import CawsUser from "../models/CawsUser";

/**
 * This model describes the authorisation
 */
export default interface AuthenticationState {
    loggedInUser?: CawsUser,
    loggedInStatus?:AuthenticationStatus,
}

export enum AuthenticationStatus{
    TRUE,
    ATTEMPT,
    FALSE
}