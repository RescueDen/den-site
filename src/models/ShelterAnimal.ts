/**
 * Specifies the caws user data
 */
import {formatDate} from "../utils/date-formater";
import missingPic from "../assets/pictures/missingPhoto.png";

export interface ShelterAnimalData {
    //Store the ident info
    code: string;
    id: number;
    shelterId: number;
    name: string;
    microchipped: boolean;
    microchipImplantedBy: string;
    microchip: string;
    onShelter: boolean;

    //The animal info
    age: string;
    breed: string;
    color: string;
    species: string;
    sex: string;

    //Fees
    adoptionFee: string;
    trainingDeposit: string;

    //Dates
    dateBroughtIn: Date;
    dateOfBirth: Date;
    estimatedDOB: boolean;
    neutered: boolean;
    neuteredDate: Date;
    neuteredByVet: string;

    //Good with
    isGoodWithCats: number;
    isGoodWithDogs: number;
    isGoodWithChildren: number
    isHouseTrained: number;
    hasSpecialNeeds: boolean;

    //Store when the last changed and last update from asm
    lastUpdateFromShelter: Date;
    lastChangeInShelter: Date;

    //The full bio
    bio: string;

    //An Flags
    flags: string;

    //Medical info
    rabiesTag: string;

    //And the history of movement
    movements: MovementData[];

    //And the vax history
    vaccineHistory: VaccineData[];

    //Keep a list of image urls, we get these from the media
    imgUrls: string[];

    //Add in the thumbnail url
    thumbnailUrl: string;
}

//Keep a history of movements
export interface MovementData {
    firstName: string;
    lastName: string;
    shelterPersonId: number;
    phone: string;
    email: string;
    flags: string;
    movementType: string;
    startDate: Date;
    endDate: Date;
}

//Keep a history of vax
export interface VaccineData {
    date: Date;
    dateRequired: Date;
    type: string;
    vet: string;
    comments: string;
}


export enum Species {
    cat = "Cat",
    dog = "Dog"

}

/**
 * Returns an empty caws user
 */
export function findShelterIds(input: any): string[] {
    //Make sure this is defined
    if (input === undefined) {
        return [] as string[];
    } else {
        //Specify the regex match
        const regex = /[ABCDEMNOS][0-9]{7}\b/g

        //Get the test array
        const testArray: RegExpMatchArray | null = input.toString().match(regex);

        //If null return an empty array
        if (testArray === null) {
            return [] as string[];
        } else {
            return testArray;
        }

    }

}

/**
 * Returns an empty caws user
 */
export function findAnimalByShelterId(shetlerId: string, animals: { [id: number]: ShelterAnimal; }): ShelterAnimal | undefined {
    //Make sure this is defined
    for (let id of Object.keys(animals)) {
        //Get the id as anumber
        const idAsNumb = parseInt(id);

        //And the test shetler code
        const testCode = animals[idAsNumb].data.code;


        if (testCode === (shetlerId)) {
            return animals[parseInt(id)];
        }
    }

    return undefined;


}


/**
 * Define a class that uses the CAWS User data
 */
export default class ShelterAnimal {
    //Set to read only for now
    public readonly data: ShelterAnimalData;

    //The main constructor
    constructor(data: ShelterAnimalData) {
        this.data = data;
    }

    //Provide a method to get the image url
    getImageUrl(): string {
        if (this.data.imgUrls.length > 0) {
            return this.data.imgUrls[0];
        } else {
            return missingPic;
        }
    }

    //Provide a method to get the image url
    getCodeAndName(): string {
        return this.data.code + ":" + this.data.name;
    }

    //Get the foster range based upon the movements
    getMyHistory(userId: number): string[] {
        //Store my history

        //March over each movement
        return this.data.movements.filter(move => {
            return move.shelterPersonId === userId;
        }).map(move => {
            return move.movementType + ":" + formatDate(move.startDate) + " - " + formatDate(move.endDate);

        });


    }

    //Get the foster range based upon the movements
    getCurrentStatus(): string {
        //March over each movement
        if (this.data.movements) {
            for (let move of this.data.movements) {
                //If there is no end date
                if (move.endDate.toString().length === 0) {
                    return move.movementType + " " + formatDate(move.startDate.toString());
                }


            }
        }
        return "";

    }

    //Get the foster range based upon the movements
    getCurrentLocation(): string {
        //March over each movement
        for (let move of this.data.movements) {
            //If there is no end date
            if (move.endDate.toString().length === 0) {
                return move.movementType + ": " + move.firstName + " " + move.lastName;
            }


        }
        return "";

    }

    getCurrentMovement(): MovementData | undefined {
        //March over each movement
        for (let move of this.data.movements) {
            //If there is no end date
            if (move.endDate.toString().length === 0) {
                return move;
            }


        }
        return undefined;

    }

    //This is a search function for searching animals for now
    inSearch(term: string) {
        return this.data.name.toLowerCase().indexOf(term.toLowerCase()) >= 0;
    }

    //Support function to convert 0,1,2 to yes, no Unknown
    formatYesNoUnknown(value: number): string {
        switch (value) {
            case 0:
                return "Yes";
            case 1:
                return "No";
            default:
                return "Unknown"
        }
    }

    needsFoster(): boolean {
        return this.data.flags.indexOf("Needs Foster") >= 0;
    }

    //Get vaccine in order
    getVaccineHistoryInOrder(): VaccineData[] {
        return this.data.vaccineHistory.sort(((a, b) => {
            //Get the given date
            const aDate: Date = new Date(a.date.toString());
            const bDate: Date = new Date(b.date.toString());

            //Get as value Date.valueOf()
            const aValue = aDate.valueOf();
            const bValue = bDate.valueOf();

            //Check for nan
            if (isNaN(aValue) || isNaN(bValue)) {
                //If they both are
                if (isNaN(aValue) && isNaN(bValue)) {
                    return 0
                } else {
                    if (isNaN(aValue)) {
                        return -1
                    } else {
                        return 1;
                    }
                }
            }
            //Both are real values
            if (aValue > bValue)
                return 1
            else if (aValue < bValue)
                return -1

            return 0;
        }))


    }

    isSpecies(searchSpecies: Species[]): boolean {
        const mySpecies = this.data.species;

        for (let i = 0; i < searchSpecies.length; i++) {
            if (searchSpecies[i].toString() === mySpecies) {
                return true
            }
        }


        return false;

    }

    getCSVRow(): string {
        let row = "";

        //Add in the required data
        row += this.data.name + ",";
        row += this.data.code + ",";
        //Add in the current movement data
        const movement = this.getCurrentMovement();
        if (movement) {
            row += movement.movementType + ",";
            row += '' + movement.startDate + ',';
            row += '"' + movement.firstName + '",';
            row += '"' + movement.email + '",';
        }
        row += this.getImageUrl() + ",";
        return row;
    }

    //Get to download
    getObjectToDownload(): ShelterAnimalData {
        //Make a copy
        let newDataJsonString = JSON.stringify(this.data);

        //Create back
        let newDataJson = JSON.parse(newDataJsonString) as ShelterAnimalData;


        //Remove the movements
        newDataJson.movements = [];

        return newDataJson;

    }

    getAdoptionFee(): string | undefined {
        //Convert the fee to a number
        if (!this.data.adoptionFee) {
            return undefined;
        } else {
            let fee = parseFloat(this.data.adoptionFee);
            //Divide by 100
            fee /= 100;

            //Return if it is not zero
            if (fee !== 0) {
                return "$" + fee.toFixed(2);
            } else {
                return undefined;
            }

        }
    }

    getTrainingDeposit(): string | undefined {
        //Convert the fee to a number
        if (!this.data.trainingDeposit) {
            return undefined;
        } else {
            let fee = parseFloat(this.data.trainingDeposit);
            //Divide by 100
            fee /= 100;

            //Return if it is not zero
            if (fee !== 0) {
                return "$" + fee.toFixed(2);
            } else {
                return undefined;
            }

        }
    }

    /**
     * Returns so much of the bio
     * @param bioMax
     */
    getBio(bioMax: number): string {
        //Get the current length
        const currentLength = this.data.bio.length;

        if (currentLength > bioMax) {
            return this.data.bio.substr(0, bioMax - 1) + "...";
        } else {
            return this.data.bio;
        }


    }
}
