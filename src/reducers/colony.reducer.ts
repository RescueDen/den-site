import Action from '../actions/Action'
import ColonyState from "../state/ColonyState";
import {Colony} from "../models/Colony";
import {colonyConstants} from "../actions/colony.actions";

export function colony(state:ColonyState = {colonies:[] as Colony[]}, action:Action): ColonyState {
    switch (action.type) {
        case colonyConstants.FETCH_COLONIES:
            return {...state, colonies:action.payload};
        default:
            return state
    }
}