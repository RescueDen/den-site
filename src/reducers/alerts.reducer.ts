import Action from '../actions/Action'
import {Alert} from "../models/Alert";
import {alertConstants} from "../actions/alert.actions";
//Keep a index counter so we can advance the index
let id = 0;

/**
 * The alert reducer maintains a list of alerts
 * @param state
 * @param action
 * @returns {*}
 */
export function alerts(state:Alert[] = [], action:Action): Alert[] {


    //Ok, we now know that it is an alert action
    switch (action.type) {
        case alertConstants.ACTION_SUCCESS:
            //Add the new success to the list
            return [(action.payload as Alert).assignId(id++), ...state]

        case alertConstants.ACTION_ERROR:
            return [(action.payload as Alert).assignId(id++), ...state]
        case alertConstants.ACTION_CLEAR:
            //If there is a payload
            if(action.payload){
                //Filter out this message
                // @ts-ignore
                return state.filter(alert => alert.id !== action.payload.id);

            }else{
                //Just clear all
                return [];
            }

        default:
            return state
    }
}