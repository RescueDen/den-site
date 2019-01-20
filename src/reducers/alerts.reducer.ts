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
        case alertConstants.ACTION_ERROR: {
            //Now see if the item is already in the list
            let indexLoc = -1;

            //Get the new alert
            const newAlert = action.payload as Alert;

            //Check each item
            state.forEach((alert, index) => {
                if (alert.equals(newAlert)) {
                    indexLoc = index;
                }
            });

            //If it is already there just store the number increase
            if (indexLoc >= 0) {
                state[indexLoc].bumpCount();
                return [...state];
            } else {
                return [(action.payload as Alert).assignId(id++), ...state]
            }


        }
        case alertConstants.ACTION_CLEAR:
            //If there is a payload
            if(action.payload){
                //Filter out this message
                return state.filter(alert => alert.id !== action.payload.id);

            }else{
                //Just clear all
                return [];
            }


        case alertConstants.ACTION_CLEAR_BY_ALERT:{
            //Get the new alert
            const newAlert = action.payload as Alert;

            //Filter out this message
            return state.filter(alert => !alert.equals(newAlert));

        }

        default:
            return state
    }
}