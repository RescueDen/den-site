import Action from '../actions/Action'
import EventsState from "../state/EventsState";
import {eventsConstants} from "../actions/events.actions";
import EventsSummary from "../models/Events";

/**
 * The alert reducer maintains a list of alerts
 * @param state
 * @param action
 * @returns {*}
 */
export function events(state:EventsState =
                           {
                               eventsSummary:(new EventsSummary({id:"",type:"",name:"", parentid:""})),
                               //view:EventView.Cal,
                               hideCal:{} as {[id: string]: boolean}
                           }, action:Action): EventsState {

    //Ok, we now know that it is an alert action
    switch (action.type) {
        case eventsConstants.FETCH_EVENTS_SUMMARY:
            //Add the new success to the list
            return {
                ...state,
                eventsSummary:action.payload
            };

        case eventsConstants.TOGGLE_EVENT_GROUP:
            //Copy the hide item state
            const newHideItemState = {...state.hideCal};
            //Update this value
            newHideItemState[action.payload] = !state.hideCal[action.payload];
            //Now update the state
            return {
                ...state,
                hideCal:newHideItemState
            };
        /*case eventsConstants.UPDATE_VIEW:
            //Now update the state
            return {
                ...state,
                view:action.payload
            };*/
        default:
            return state
    }
}