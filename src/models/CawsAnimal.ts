/**
 * Specifies the caws user data
 */

//Define the caws user, this comes from the json decode
export interface CawsAnimalData{

    //Store the ident info
    SHELTERCODE:string;
    ID:number;
    NAME:string;
    MICROCHIP:string;

    //The animal info
    AGE:string;
    BREED:string;
    COLOR:string;
    SPECIES:string;
    SEX:string;

    //Dates
    DATEBROUGHTIN:Date;
    DATEOFBIRTH:Date;
    ESTIMATEDDOB:string;
    NEUTEREDDATE:Date;

    //Good with
    ISGOODWITHCATS:number;
    ISGOODWITHDOGS:number;
    ISGOODWITHCHILDREN:string
    ISHOUSETRAINED:number;

    //Store when the last changed and last update from asm
    lastUpdateFromAsm:Date;
    LASTCHANGE:Date;

    //The full bio
    BIO:string;

    //An Flags
    FLAGS:string;

    //Medical info
    RABIESTAG:string;

    //Keep all of the animal media
    MEDIA:MediaData[];

    //And the history of movement
    MOVEMENTS:MovementData[];

    //And the vax history
    VACCINEHISTORY:VaccineData[];

    //Keep a list of image urls, we get these from the media
    IMGURLS:string[];

    //Add in the thumbnail url
    THUMBNAILURL:string;
}
//The animal media structure
export interface MediaData {
    ID:number;
    NAME:string;
    Type:string;
}

//Keep a history of movements
export interface MovementData  {
    FIRSTNAME:string;
    LASTNAME:string;
    PERSONID:number;
    PHONE:string;
    EMAIL:string;
    FLAGS:string;
    MovementType:string;
    START:Date;
    END:Date;
}

//Keep a history of vax
export interface VaccineData {
    DATE:Date;
    DATEREQUIRED:Date;
    TYPE:string;
    VET:string;
    COMMENTS:string;
}

/**
 * Returns an empty caws user
 */
// export function getEmptyCawsUser(): CawsUser{
//     const data: CawsUserData = {
//         email:"",token:"",firstname:"",lastname:"",address:"",city:"",state:"",zip:"",
//         homephone:"",workphone:"",cellphone:"",isvolunteer:0,ismember:0,isfosterer:0,isbanned:0,
//         additionalflags:"",firstfosterdate:new Date(),lastfosterin:new Date(), lastfosterout:new Date(),
//         dayssincelastfoster:"",avgfostertime:"",currentFosters:[], pastFosters:[], lastUpdateFromAsm:new Date()
//     };
//     return new CawsUser(data)
// }

/**
 * Define a class that uses the CAWS User data
 */
export default class CawsAnimal{
    //Set to read only for now
    public readonly data:CawsAnimalData;

    //The main constructor
    constructor(data: CawsAnimalData) {
        this.data = data;
    }





}
