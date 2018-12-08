import Action from '../actions/Action'
import CawsAnimal from "../models/CawsAnimal"
import {animalConstants} from "../actions/animal.actions";
import AnimalState from "../state/AnimalState";

/**
 * The alert reducer maintains a list of alerts
 * @param state
 * @param action
 * @returns {*}
 */
export function animals(state:AnimalState = {animals:{}}, action:Action): AnimalState {

    //Ok, we now know that it is an alert action
    switch (action.type) {
        case animalConstants.FETCH_ANIMAL:
            //Get the new animal
            const ani:CawsAnimal = action.payload as CawsAnimal;

            //Get the id
            const id:number = ani.data.ID

            //Add the new success to the list
            return {animals:{...state.animals, [id]:ani}};

        default:
            return state
    }
}