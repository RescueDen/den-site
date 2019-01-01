

//Define the caws user, this comes from the json decode
export interface AchievementData{
    id:number;
    name:string;
    description:string;
    badge:string;//This is the badge name
    date?:Date;

    //Also set the url
    badgeUrl:string;

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
