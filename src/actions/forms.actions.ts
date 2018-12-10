import {  error } from './alert.actions';
import {Action, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {newsService} from "../services/news.service";
import {formsService} from "../services/forms.service";
import {FormSubmision} from "../models/FormSubmision";

export const formsConstants = {
    FETCH_FORMS_SUMMARY: 'FETCH_FORMS_SUMMARY',
    FORM_SUBMITTED: 'FORM_SUBMITTED',
    FORM_SUBMITTED_ERROR: 'FORM_SUBMITTED_ERROR',
    FORM_SUBMITTED_SUCCESS: 'FORM_SUBMITTED_SUCCESS',

};

export const formsActions = {
    getFormsSummary,
    submitForm
    // getAll,
    // delete: _delete
};

/**
 * Update the news summary
 * @param username
 * @param password
 * @returns {Function}
 */
function getFormsSummary(): ThunkAction<any, any,any, any> {
    //Return a function that will be called by dispatch
    return (dispatch:Dispatch<Action>) => {

        //Ask the user service to login
        formsService.getFormsSummary()
            .then(
                //If successful a user will be returned
                sum => {
                    //dispatch a login success
                    dispatch({
                        type: formsConstants.FETCH_FORMS_SUMMARY,
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
 * Update the news summary
 * @param username
 * @param password
 * @returns {Function}
 */
function submitForm(sub: FormSubmision): ThunkAction<any, any,any, any> {
    //Return a function that will be called by dispatch
    return (dispatch:Dispatch<Action>) => {
        //State we are submitting a form
        dispatch({
            type: formsConstants.FORM_SUBMITTED,
        });

        //Ask the user service to login
        formsService.submitForm(sub)
            .then(
                //If successful a user will be returned
                sum => {
                    //dispatch a login success
                    dispatch({
                        type: formsConstants.FORM_SUBMITTED_SUCCESS,
                        payload: sum
                    });
                },
                //If there was an error, dispatch a login failure and alert the user why
                errorResponse => {
                    //dispatch a login success
                    dispatch({
                        type: formsConstants.FORM_SUBMITTED_ERROR,
                        payload: errorResponse
                    });
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

