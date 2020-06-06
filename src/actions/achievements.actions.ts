import {  error } from './alert.actions';
import {Action, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {newsService} from "../services/news.service";
import {formsService} from "../services/forms.service";
import {FormSubmision} from "../models/FormSubmision";
import {AchievementData} from "../models/Achievements";
import CawsUser from "../models/ShelterUser";
import {achievementsService} from "../services/achievements.service";

export const achievementsConstants = {
    FETCH_USER_ACHIEVEMENTS: 'FETCH_USER_ACHIEVEMENTS',

};

export const achievementsActions = {
    getAchievements,
    getAchievementsWithDispatch
    // getAll,
    // delete: _delete
};

/**
 * Gets the achievements for that user
 * @param username
 * @param password
 * @returns {Function}
 */
function getAchievements(user:CawsUser): ThunkAction<any, any,any, any> {
    //Return a function that will be called by dispatch
    return (dispatch:Dispatch<Action>) => {

        return getAchievementsWithDispatch(dispatch, user);

    };

}

/**
 * Uses the dispatch to update after getting achievements
 * @param dispatch
 * @param user
 */
function getAchievementsWithDispatch(dispatch:Dispatch<Action>, user:CawsUser) {

    //Ask the user service to login
    achievementsService.getAchievements(user.data.shelterId)
        .then(
            //If successful a user will be returned
            achList => {
                //Make the payload
                let payload:{ [asmId: number]: AchievementData[]; } = {}
                payload[user.data.shelterId] = achList

                //dispatch a login success
                dispatch({
                    type: achievementsConstants.FETCH_USER_ACHIEVEMENTS,
                    payload:payload
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
