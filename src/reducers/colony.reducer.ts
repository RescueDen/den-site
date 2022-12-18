import Action from '../actions/Action'
import ColonyState from "../state/ColonyState";
import {Colony} from "../models/Colony";
import {colonyConstants} from "../actions/colony.actions";

export function colony(state:ColonyState = {colonies:[] as Colony[]}, action:Action): ColonyState {
    switch (action.type) {
        case colonyConstants.FETCH_COLONIES:
            return {...state, colonies:action.payload};
        case colonyConstants.UPDATE_COLONY:
            return {...state, colonies:[action.payload, ...state.colonies.filter(c => c.id !== action.payload.id)]};
        default:
            return state
    }
}