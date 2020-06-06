import {  error } from './alert.actions';
import {Action, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {contentService} from "../services/content.service";

export const contentConstants = {
    FETCH_CONTENT_SUMMARY: 'FETCH_CONTENT_SUMMARY',
};

export const contentActions = {
    getContentSummary,
};


function getContentSummary(category:string): ThunkAction<any, any,any, any> {
    //Return a function that will be called by dispatch
    return (dispatch:Dispatch<Action>) => {

        //Ask the user service to login
        contentService.getContentListing(category)
            .then(
                listing => {
                    //dispatch a login success
                    dispatch({
                        type: contentConstants.FETCH_CONTENT_SUMMARY,
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

