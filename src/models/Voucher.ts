/**
 * Specifies the caws user data
 */
import ShelterAnimal, {ShelterAnimalData, MovementData, Species} from "./ShelterAnimal";
import {PersonData} from "./People";
import {VoucherClientContact} from "./VoucherClient";

//Define the caws user, this comes from the json decode
export interface VoucherInfo{
    vets:Vet[];
    treatments:Treatment[];
    types:Type[];
    default_voucher:Voucher;
}


/**
 * Store the vet info for vouchers
 */
export interface Vet{
    //Store the baseline vet Info
    id:number;
    name:string;
    emails:string[];

    //Store the species that they will work on
    species: Species[];

    //Store the treatments that they do
    treatments:number[];

    //Some some general contact info useful for other people
    phone:string;
    address:string;
    site:string;
    notes:string;
    logoUrl?:string;
}

/**
 * Store the Treatment types
 */
export interface Treatment{
    //Store the baseline treatment
    id:number;
    name:string;

    //Store what species can use this
    species:Species[];
}
/**
 * And the Types we can use
 */
export interface Type{
    //Store the baseline vet Info
    id:number;
    name:string;
    species:Species[];

    //Store any notification emails
    emails:string[];
}
//Store the baseline voucher
export interface Voucher{

    //Store the baseline voucher info
    id:number;
    code:string;
    status:number;

    //Voucher type and info
    type:number;
    vetId:number;

    //Store the Creator ID
    issuerId:number;

    //Store the date and time
    issue_date:Date;
    last_update:Date;
    appointment_date:Date;

    //Store a list of people  that should be included (not vets, adopters, or fosters)
    clientIds: number[];//OtherPeople []shelter.Person `json:"other_people"`

    //Store the animal info
    animalIds:number[];//AnimalIds []int `json:"animalIds"`

    //If it is a non shelter animal
    animalInfo:NonShelterAnimal[];// []NonShelterAnimal `json:"animalInfo,omitempty"`

    //Store the medical treatment
    treatmentIds:number[];//TreatmentIds   []int  `json:"treatmentIds"`
    other_treatment:string;//OtherTreatment string `json:"otherTreatment"`

    //And just some general nodes
    notes:string;
}

//Store NonShelter Animal Info
export interface  NonShelterAnimal {

    //Store the Creator ID
    name:string;

    //Store the Sex and Species and age (years)
    species:Species;
    sex:string;
    age:number;

    //And just some general comments
    comments:string;

    colony?:number;
}
//Store the basic search
export interface  VoucherSearch {
    status?:number;
    issuer?:number;
    animalId?:number;
    type?:number;
    code?:string;
    page:number;
    pageSize:number;

}

//Store the results from a  search
export interface  VoucherSearchResults {
    page:number;
    pageSize:number;
    numberPages:number

    //And the results
    results:Voucher[];
}


export const VoucherDraft = 1;
export const VoucherIssued = 2;
export const VoucherRedeemed = 3;
export const VoucherVoid =4;

export const  VoucherStatus: { [id: number]: string; } = {
    1:"Draft",
    2:'Issued',
    3:'Redeemed',
    4:'Void'
}


export interface PublicVoucherViewData {
    //Hold the voucher
    voucher:Voucher;

    //Hold the voucher type
    type:Type;

    //Any open movements
    movements:MovementData[];

    //Animal data
    animals: ShelterAnimalData[];

    //clients/other people
    clientContacts:VoucherClientContact[];

    //And treatments
    treatments:Treatment[];

    vet:Vet;
}