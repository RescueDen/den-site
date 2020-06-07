import ShelterUser from "../models/ShelterUser";
import Permissions from "../models/Permissions";
import {UserPreferences} from "../models/UserPreferences";

/**
 * This model describes the authorisation
 */
export default interface AuthenticationState {
    loggedInUser?: ShelterUser,
    loggedInStatus?:AuthenticationStatus,
    loggedInMsg?:string,
    activatedUserStatus?:AuthenticationStatus,
    activatedUserMsg?:string,
    registerUserStatus?:AuthenticationStatus,
    registerUserMsg?:string,
    pwResetStatus?:AuthenticationStatus,
    pwResetUserMsg?:string,
    oneTimePasswordStatus?:AuthenticationStatus,

    //Keep the user permissions
    permissions?:Permissions,

    //Also keep the user preferences
    preferences?:UserPreferences,
    prefStatus?:AuthenticationStatus

}

export enum AuthenticationStatus{
    TRUE,
    ATTEMPT,
    FALSE
}

