import {Species} from "./ShelterAnimal";

export interface InNeedOfFosterData{

    //Store the ident info
    shelter:number[];

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

/**Store the basic information for non shelter animal**/
export interface  NonShelterAnimal {
    //And the animal id
    id:number

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

export default class InNeedOfFoster{
    //Set to read only for now
    readonly data:InNeedOfFosterData;

    //The main constructor
    constructor(data: InNeedOfFosterData) {
        this.data = data;
    }

    //Add a function to get all animals in need
    public getAllAnimalsInNeed(): number[]{
        return [...this.data.shelter]
    }

    //Add a function to get all animals in need
    public getNonCawsAnimals(): NonShelterAnimal[]{
        return this.data.nonShelter? this.data.nonShelter: []
    }

    public addNonShelterAnimalAndCopy(nonShelterAnimal:NonShelterAnimal){
        let data = this.data;
        data.nonShelter?.push(nonShelterAnimal)

        return new InNeedOfFoster(this.data);
    }

    public removeNonShelterAnimalAndCopy(nonShelterAnimalId:number){
        let data = this.data;
        data.nonShelter = this.data.nonShelter?.filter(ani => ani.id != nonShelterAnimalId);
        return new InNeedOfFoster(this.data);
    }

}
