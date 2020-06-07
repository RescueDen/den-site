import {organizationService} from "../services/organization.service";

export interface UserData {
    //The baseline User Data
    email:string;
    password?:string;
    token:string;
}

