import Action from '../actions/Action'
import PeopleState from "../state/PeopleState";
import {peopleConstants} from "../actions/people.actions";
import {PersonData} from "../models/People";

/**
 * The alert reducer maintains a list of alerts
 * @param state
 * @param action
 * @returns {*}
 */
export function people(state: PeopleState = {people: {} as PersonData[]}, action: Action): PeopleState {

    //Ok, we now know that it is an alert action
    switch (action.type) {
        case peopleConstants.FETCH_PERSON:
            //Get the new animal
            const person: PersonData = action.payload as PersonData;

            //Get the id
            const id: number = person.id;

            //Add the new success to the list
            return {people: {...state.people, [id]: person}};

        default:
            return state
    }
}