import Action from '../actions/Action'
import CawsAnimal from "../models/CawsAnimal"
import {animalConstants} from "../actions/animal.actions";
import AnimalState from "../state/AnimalState";
import InfoState from "../state/InfoState";
import ArticlesSummary from "../models/ArticlesSummary";
import {infoConstants} from "../actions/info.actions";
import NewsState from "../state/NewsState";
import {newsConstants} from "../actions/news.actions";
import InNeedOfFoster, {NonShelterAnimal} from "../models/InNeedOfFosterModel";
import {inNeedConstants} from "../actions/inNeedFoster.actions";
import InNeedState from "../state/InNeedState";

/**
 * The alert reducer maintains a list of alerts
 * @param state
 * @param action
 * @returns {*}
 */
export function inNeedFoster(state:InNeedState = {
    inNeed:new InNeedOfFoster({from_database:[]}, ""),
    busy:false}
    , action:Action): InNeedState {

    //Ok, we now know that it is an alert action
    switch (action.type) {
        case inNeedConstants.FETCH_INNEEDOFFOSTER:
            //Add the new success to the list
            return {
                inNeed:action.payload,
                busy:false
            };
        case inNeedConstants.UPLOAD_INNEED_ANIMAL:
            //Add the new success to the list
            return {
                ...state,
                busy:true
            };
        case inNeedConstants.DELETE_INNEED_ANIMAL:
            //Add the new success to the list
            return {
                ...state,
                busy:true
            };
        default:
            return state
    }
}