import {UserData} from "./UserData";

export interface ShelterUserData extends UserData{
    //The baseline User Data
    shelterId:number;
    email:string;
    password?:string;
    token:string;
    id:number;

    //Personal info
    firstName:string;
    lastName:string;

    //Address Info
    address:string;
    city:string;
    state:string;
    zip:string;

    //Contact info
    homePhone:string;
    workPhone:string;
    cellphone:string;

    //Keep some of the useful information
    isVolunteer:number;
    isMember:number;
    isFosterer:number;
    isBanned:number;

    //The additional flags
    additionalFlags:string;

    //Foster info
    firstFosterDate:Date
    lastFosterIn:Date
    lastFosterOut:Date

    //Computed Time Diff
    daysSinceLastFoster:string;
    avgFosterTime:string;

    //Foster history
    currentFosters:number[];
    pastFosters:number[];

    //Store the last time this was updated
    lastUpdateFromShelter:Date;
}

/**
 * Returns an empty caws user
 */
export function getEmptyCawsUser(): CawsUser{
    const data: ShelterUserData = {
        id:-1,shelterId:-1, email:"",token:"",firstName:"",lastName:"",address:"",city:"",state:"",zip:"",
        homePhone:"",workPhone:"",cellphone:"",isVolunteer:0,isMember:0,isFosterer:0,isBanned:0,
        additionalFlags:"",firstFosterDate:new Date(),lastFosterIn:new Date(), lastFosterOut:new Date(),
        daysSinceLastFoster:"",avgFosterTime:"",currentFosters:[], pastFosters:[], lastUpdateFromShelter:new Date()
    };
    return new CawsUser(data)
}

/**
 * Define a class that uses the CAWS User data
 */
export default class CawsUser{
    //Set to read only for now
    readonly data:ShelterUserData;

    //Hold the split and normalized tags
    readonly tags:string[];

    //The main constructor
    constructor(data: ShelterUserData) {
        this.data = data;

        //Set the tags from the data
        this.tags = this.data.additionalFlags.split("|").map(tag =>{
            return tag.toLowerCase().trim();

        })

    }

    /**
     * Determine if the user has this tag
     * @param tagString
     */
    hasTag(tag:string): boolean{
        return this.tags.indexOf(tag) >=0;



    }

    //Provide a method to get the image url
    getCodeAndName():string{
        return this.data.firstName + " " +this.data.lastName;
    }

}
