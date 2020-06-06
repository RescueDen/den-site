import Action from '../actions/Action'
import CawsAnimal from "../models/ShelterAnimal"
import {animalConstants} from "../actions/animal.actions";
import AnimalState from "../state/AnimalState";
import InfoState from "../state/InfoState";
import ArticlesSummary from "../models/ArticlesSummary";
import {infoConstants} from "../actions/info.actions";
import NewsState from "../state/NewsState";
import {newsConstants} from "../actions/news.actions";
import FormsState from "../state/FormsState";
import FormsSummary from "../models/FormsSummary";
import {formsConstants} from "../actions/forms.actions";
import AchievementsState from "../state/AchievementsState";
import {achievementsConstants} from "../actions/achievements.actions";

/**
 * The alert reducer maintains a list of alerts
 * @param state
 * @param action
 * @returns {*}
 */
export function achievements(state:AchievementsState = {achievements:{}}, action:Action): AchievementsState {

    //Ok, we now know that it is an alert action
    switch (action.type) {
        case achievementsConstants.FETCH_USER_ACHIEVEMENTS:
            //Copy the hide item state
            const achievementsState = {...state.achievements, ...action.payload};

            //Now update the state
            return {
                ...state,
                achievements:achievementsState
            };

        default:
            return state
    }
}