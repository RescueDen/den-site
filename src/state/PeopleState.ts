import {PersonData} from "../models/People";

export default interface PeopleState {
    people: { [id: number]: PersonData; }
}
