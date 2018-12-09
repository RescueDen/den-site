import {  error } from './alert.actions';
import {Action, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {newsService} from "../services/news.service";

export const newsConstants = {
    FETCH_NEWS_SUMMARY: 'FETCH_NEWS_SUMMARY',

};

export const newsActions = {
    getNewsSummary,
    // logout,
    // getAll,
    // delete: _delete
};

/**
 * Update the news summary
 * @param username
 * @param password
 * @returns {Function}
 */
function getNewsSummary(): ThunkAction<any, any,any, any> {
    //Return a function that will be called by dispatch
    return (dispatch:Dispatch<Action>) => {

        //Ask the user service to login
        newsService.getNewsSummary()
            .then(
                //If successful a user will be returned
                sum => {
                    //dispatch a login success
                    dispatch({
                        type: newsConstants.FETCH_NEWS_SUMMARY,
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

