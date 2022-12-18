import {error} from './alert.actions';
import {Action, Dispatch} from 'redux';
import {achievementsService} from "../services/achievements.service";

export const achievementsConstants = {
    FETCH_USER_ACHIEVEMENTS: 'FETCH_USER_ACHIEVEMENTS',

};

export const achievementsActions = {
    getAchievementsWithDispatch
};
/**
 * Uses the dispatch to update after getting achievements
 * @param dispatch
 */
function getAchievementsWithDispatch(dispatch: Dispatch<Action>) {

    //Ask the user service to log in
    achievementsService.getMyAchievements()
        .then(//If successful a user will be returned
            achList => {
                //dispatch a login success
                dispatch({
                    type: achievementsConstants.FETCH_USER_ACHIEVEMENTS, payload: achList
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
}
