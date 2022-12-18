import {error} from './alert.actions';
import {Action, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {achievementsService} from "../services/achievements.service";

export const achievementsConstants = {
    FETCH_USER_ACHIEVEMENTS: 'FETCH_USER_ACHIEVEMENTS',

};

export const achievementsActions = {
    getAchievementsWithDispatch
};

/**
 * Gets the achievements for that user
 * @param username
 * @param password
 * @returns {Function}
 */
function getAchievements(): ThunkAction<any, any, any, any> {
    //Return a function that will be called by dispatch
    return (dispatch: Dispatch<Action>) => {
        return getAchievementsWithDispatch(dispatch);
    };

}

/**
 * Uses the dispatch to update after getting achievements
 * @param dispatch
 * @param user
 */
function getAchievementsWithDispatch(dispatch: Dispatch<Action>) {

    //Ask the user service to login
    achievementsService.getMyAchievements()
        .then(
            //If successful a user will be returned
            achList => {
                //dispatch a login success
                dispatch({
                    type: achievementsConstants.FETCH_USER_ACHIEVEMENTS,
                    payload: achList
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
