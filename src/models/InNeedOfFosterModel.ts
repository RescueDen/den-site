import {ShelterUserData} from "./ShelterUser";
import {Species} from "./ShelterAnimal";

/**
 * Specifies the list of dogs in need
 */

//Define the caws user, this comes from the json decode
export interface InNeedOfFosterData{

    //Store the ident info
    from_database:number[];

    //Get the non caws
    nonShelter?: NonShelterAnimal[]
}


//This is a search function for searching animals for now
export function inSearch(ani: NonShelterAnimal , term:string){
    return ani.name.toLowerCase().indexOf(term.toLowerCase()) >=0;
}

export function inSpecies(ani: NonShelterAnimal, searchSpecies: Species[]):boolean {
    const mySpecies = ani.species;

    for(let i =0; i < searchSpecies.length; i++){
        if(searchSpecies[i].toString() == mySpecies){
            return true
        }
    }


    return false;

}

/**Store the basic information for non caws animal**/
export interface  NonShelterAnimal {
    //And the animal id
    id:string

    //Add in the animal information, this is not pulled back later
    name:string

    //If they have a current Location
    location:string

    //And the
    information:string

    //And the species
    species:Species

    //Store the imgId
    imgId?:string

    //And compute the url
    imgUrl?:string

}

/**
* Define a class that uses the CAWS User data
*/
export default class InNeedOfFoster{
    //Set to read only for now
    readonly data:InNeedOfFosterData;

    //The main constructor
    constructor(data: InNeedOfFosterData, imgUrlBase: string ) {
        this.data = data;

        //Update the img url
        if (data.nonShelter) {
            data.nonShelter.forEach(itm => {
                itm.imgUrl = imgUrlBase +"/inneed/image/"+ itm.imgId
            })
        }


    }

    //Add a function to get all animals in need
    public getAllAnimalsInNeed(): number[]{
        return [...this.data.from_database]
    }

    //Add a function to get all animals in need
    public getNonCawsAnimals(): NonShelterAnimal[]{
        return this.data.nonShelter? this.data.nonShelter: []
    }


}
