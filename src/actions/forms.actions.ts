import {error} from './alert.actions';
import {Action, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {formsService} from "../services/forms.service";

export const formsConstants = {
    FETCH_FORMS_SUMMARY: 'FETCH_FORMS_SUMMARY',
};

export const formsActions = {
    getFormListing: getFormsSummary,
};

function getFormsSummary(category:string): ThunkAction<any, any,any, any> {
    //Return a function that will be called by dispatch
    return (dispatch:Dispatch<Action>) => {

        //Ask the user service to login
        formsService.getFormsSummary(category)
            .then(
                //If successful a user will be returned
                listing => {
                    //dispatch a login success
                    dispatch({
                        type: formsConstants.FETCH_FORMS_SUMMARY,
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
                    }catch(e){
                        dispatch(error(errorResponse.toString()));

                    }

                }
            );
    };

}
