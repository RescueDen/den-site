import Action from '../actions/Action'
import CawsAnimal from "../models/CawsAnimal"
import {animalConstants} from "../actions/animal.actions";
import AnimalState from "../state/AnimalState";
import InfoState from "../state/InfoState";
import ArticlesSummary from "../models/ArticlesSummary";
import {infoConstants} from "../actions/info.actions";
import NewsState from "../state/NewsState";
import {newsConstants} from "../actions/news.actions";
import EventsState from "../state/EventsState";
import {eventsConstants} from "../actions/events.actions";
import EventsSummary from "../models/Events";

/**
 * The alert reducer maintains a list of alerts
 * @param state
 * @param action
 * @returns {*}
 */
export function events(state:EventsState = {eventsSummary:(new EventsSummary({id:"",type:"",name:"", parentid:""}))}, action:Action): EventsState {

    //Ok, we now know that it is an alert action
    switch (action.type) {
        case eventsConstants.FETCH_EVENTS_SUMMARY:
            //Add the new success to the list
            return {eventsSummary:action.payload};

        default:
            return state
    }
}