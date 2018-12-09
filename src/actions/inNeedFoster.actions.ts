import {  error } from './alert.actions';
import {Action, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {newsService} from "../services/news.service";
import {inNeedOfFosterService} from "../services/inNeedOfFoster.service";
import {animalActions} from "./animal.actions";

export const inNeedConstants = {
    FETCH_INNEEDOFFOSTER: 'FETCH_INNEEDOFFOSTER',

};

export const inNeedActions = {
    getInNeedOfFoster,
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
function getInNeedOfFoster(): ThunkAction<any, any,any, any> {
    //Return a function that will be called by dispatch
    return (dispatch:Dispatch<any>) => {

        //Ask the user service to login
        inNeedOfFosterService.getInNeedOfFosterList()
            .then(
                //If successful a user will be returned
                sum => {

                    //Now call for each of those animals to be downloaded
                    sum.getAllAnimalsInNeed().forEach(id => dispatch(animalActions.getAnimal(id)))

                    //dispatch a login success
                    dispatch({
                        type: inNeedConstants.FETCH_INNEEDOFFOSTER,
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

