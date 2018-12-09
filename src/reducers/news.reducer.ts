import Action from '../actions/Action'
import CawsAnimal from "../models/CawsAnimal"
import {animalConstants} from "../actions/animal.actions";
import AnimalState from "../state/AnimalState";
import InfoState from "../state/InfoState";
import ArticlesSummary from "../models/ArticlesSummary";
import {infoConstants} from "../actions/info.actions";
import NewsState from "../state/NewsState";
import {newsConstants} from "../actions/news.actions";

/**
 * The alert reducer maintains a list of alerts
 * @param state
 * @param action
 * @returns {*}
 */
export function news(state:NewsState = {newsSummary:(new ArticlesSummary({id:"",type:"",name:"", parentid:""}))}, action:Action): NewsState {

    //Ok, we now know that it is an alert action
    switch (action.type) {
        case newsConstants.FETCH_NEWS_SUMMARY:
            //Add the new success to the list
            return {newsSummary:action.payload};

        default:
            return state
    }
}