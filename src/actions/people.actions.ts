import {error} from './alert.actions';
import {Action, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {peopleService} from "../services/people.service";

export const peopleConstants = {
    FETCH_PERSON: 'FETCH_PERSON',

};

export const peopleActions = {
    getPerson
};

/**
 * This is used to get the latest version of the animal
 * @returns {Function}
 * @param id
 */
function getPerson(id: number): ThunkAction<any, any, any, any> {
    //Return a function that will be called by dispatch
    return (dispatch: Dispatch<Action>) => {

        peopleService.getPerson(id)
            .then(//If successful a user will be returned
                ani => {
                    //dispatch a login success
                    dispatch({
                        type: peopleConstants.FETCH_PERSON, payload: ani
                    });
                }, //If there was an error, dispatch a login failure and alert the user why
                errorResponse => {
                    //Dispatch the error
                    try {
                        dispatch(error(errorResponse.response.data.message));
                    } catch (e) {
                        dispatch(error(errorResponse.toString()));

                    }

                });
    };
}
