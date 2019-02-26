import {alertConstants, error} from './alert.actions';
import {Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {eventsService} from "../services/events.service";
import Action from "./Action";

export const eventsConstants = {
    FETCH_EVENTS_SUMMARY: 'FETCH_EVENTS_SUMMARY',
    //UPDATE_VIEW: 'UPDATE_EVENTS_VIEW',
    TOGGLE_EVENT_GROUP: 'TOGGLE_EVENT_GROUP'
};

export const eventsActions = {
    getEventsSummary,
    //setEventView,
    toggleEventGroup
    // delete: _delete
};

/**
 * Update the news summary
 * @param username
 * @param password
 * @returns {Function}
 */
function getEventsSummary(): ThunkAction<any, any,any, any> {
    //Return a function that will be called by dispatch
    return (dispatch:Dispatch<Action>) => {

        //Ask the user service to login
        eventsService.getEventsSummary()
            .then(
                //If successful a user will be returned
                sum => {
                    //dispatch a login success
                    dispatch({
                        type: eventsConstants.FETCH_EVENTS_SUMMARY,
                        payload: sum
                    });
                },
                //If there was an error, dispatch a login failure and alert the user why
                errorResponse => {
                    //Dispatch the error
                    try {
                        dispatch(error(errorResponse.response.data.message));
                    }catch(e){
                        dispatch(error(errorResponse.toString()));

                    }

                }
            );
    };

}



/**
 * Create new success message
 * @param message

export function setEventView(view: EventView): Action {
    return {
        type: eventsConstants.UPDATE_VIEW,
        payload: view
    };
}
 */
/**
 * Turn on and off event group
 * @param message
 */
export function toggleEventGroup(group: string): Action {
    return {
        type: eventsConstants.TOGGLE_EVENT_GROUP,
        payload: group
    };
}
//
// export function error(message: string): Action {
//     return {
//         type: alertConstants.ACTION_ERROR,
//         payload: new Alert(AlertType.NEGATIVE, message)
//
//     };
// }