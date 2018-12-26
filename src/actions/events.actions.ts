import {  error } from './alert.actions';
import {Action, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {newsService} from "../services/news.service";
import {formsService} from "../services/forms.service";
import {FormSubmision} from "../models/FormSubmision";
import {eventsService} from "../services/events.service";

export const eventsConstants = {
    FETCH_EVENTS_SUMMARY: 'FETCH_EVENTS_SUMMARY',

};

export const eventsActions = {
    getEventsSummary,
    // getAll,
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
