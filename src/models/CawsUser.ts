/**
 * Specifies the caws user data
 */
import {UserData} from "./UserData";

//Define the caws user, this comes from the json decode
export interface CawsUserData extends UserData{
    //The baseline User Data
    email:string;
    password?:string;
    token:string;


    //Personal info
    firstname:string;
    lastname:string;

    //Address Info
    address:string;
    city:string;
    state:string;
    zip:string;

    //Contact info
    homephone:string;
    workphone:string;
    cellphone:string;

    //Keep some of the useful information
    isvolunteer:number;
    ismember:number;
    isfosterer:number;
    isbanned:number;

    //The additional flags
    additionalflags:string;

    //Foster info
    firstfosterdate:Date
    lastfosterin:Date
    lastfosterout:Date

    //Computed Time Diff
    dayssincelastfoster:string;
    avgfostertime:string;

    //Foster history
    currentFosters:number[];
    pastFosters:number[];

    //Store the last time this was updated
    lastUpdateFromAsm:Date;
}

/**
 * Returns an empty caws user
 */
export function getEmptyCawsUser(): CawsUser{
    const data: CawsUserData = {
        email:"",token:"",firstname:"",lastname:"",address:"",city:"",state:"",zip:"",
        homephone:"",workphone:"",cellphone:"",isvolunteer:0,ismember:0,isfosterer:0,isbanned:0,
        additionalflags:"",firstfosterdate:new Date(),lastfosterin:new Date(), lastfosterout:new Date(),
        dayssincelastfoster:"",avgfostertime:"",currentFosters:[], pastFosters:[], lastUpdateFromAsm:new Date()
    };
    return new CawsUser(data)
}

/**
 * Define a class that uses the CAWS User data
 */
export default class CawsUser{
    //Set to read only for now
    readonly data:CawsUserData;

    //The main constructor
    constructor(data: CawsUserData) {
        this.data = data;
    }



}
