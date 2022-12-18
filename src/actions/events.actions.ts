import {error} from './alert.actions';
import {Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {eventsService} from "../services/events.service";
import Action from "./Action";

export const eventsConstants = {
    FETCH_EVENTS_SUMMARY: 'FETCH_EVENTS_SUMMARY',
    TOGGLE_EVENT_GROUP: 'TOGGLE_EVENT_GROUP'
};

export const eventsActions = {
    getEventListing,
    toggleEventGroup
};

function getEventListing(category: string): ThunkAction<any, any, any, any> {
    //Return a function that will be called by dispatch
    return (dispatch: Dispatch<Action>) => {

        eventsService.getEventsSummary(category)
            .then(
                //If successful a user will be returned
                listing => {
                    //dispatch a login success
                    dispatch({
                        type: eventsConstants.FETCH_EVENTS_SUMMARY,
                        payload: {
                            category: category,
                            listing: listing
                        }
                    });
                },
                //If there was an error, dispatch a login failure and alert the user why
                errorResponse => {
                    //Dispatch the error
                    try {
                        dispatch(error(errorResponse.response.data.message));
                    } catch (e) {
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
 * @param group
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