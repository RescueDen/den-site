import Action from '../actions/Action'
import CawsAnimal from "../models/CawsAnimal"
import {animalConstants} from "../actions/animal.actions";
import AnimalState from "../state/AnimalState";
import InfoState from "../state/InfoState";
import ArticlesSummary from "../models/ArticlesSummary";
import {infoConstants} from "../actions/info.actions";

/**
 * The alert reducer maintains a list of alerts
 * @param state
 * @param action
 * @returns {*}
 */
export function info(state:InfoState = {infoSummary:(new ArticlesSummary({id:"",type:"",name:"",parentid:""}))}, action:Action): InfoState {

    //Ok, we now know that it is an alert action
    switch (action.type) {
        case infoConstants.FETCH_INFO_SUMMARY:

            //Add the new success to the list
            return {
                ...state,
                infoSummary:action.payload
            };
        case infoConstants.FETCH_INSIDE_SUMMARY:

            //Add the new success to the list
            return {
                ...state,
                insideSummary:action.payload
            };
        default:
            return state
    }
}