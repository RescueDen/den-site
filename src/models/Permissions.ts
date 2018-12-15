/**
 * Specifies the caws user data
 */

//Define the caws user, this comes from the json decode
export interface PermissionsData{
    //The baseline User Data
    permissions:string[];
}


/**
 * Define a class that uses the CAWS User data
 */
export default class Permissions{
    //Set to read only for now
    readonly data:PermissionsData;

    //The main constructor
    constructor(data: PermissionsData) {
        this.data = data;
    }



}
