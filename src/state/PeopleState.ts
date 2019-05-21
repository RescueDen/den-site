import {PersonData} from "../models/People";

/**
 * This model describes the authorisation
 */
export default interface PeopleState {
    people: { [id: number]: PersonData; }
}
