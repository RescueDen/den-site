import {CawsUserData} from "./CawsUser";

/**
 * Specifies the list of dogs in need
 */

//Define the caws user, this comes from the json decode
export interface InNeedOfFosterData{

    //Store the ident info
    "from_database":number[];

}

/**
* Define a class that uses the CAWS User data
*/
export default class InNeedOfFoster{
    //Set to read only for now
    readonly data:InNeedOfFosterData;

    //The main constructor
    constructor(data: InNeedOfFosterData) {
        this.data = data;
    }

    //Add a function to get all animals in need
    public getAllAnimalsInNeed(): number[]{
        return [...this.data.from_database]
    }



}
