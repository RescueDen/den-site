import Action from '../actions/Action'
import CawsAnimal from "../models/CawsAnimal"
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

/**
 * The alert reducer maintains a list of alerts
 * @param state
 * @param action
 * @returns {*}
 */
export function forms(state:FormsState = {formsSummary:(new FormsSummary({id:"",type:"",name:"", parentid:"", metadata:{title:"", requiredPerm:[]}, JSONSchema:{}, UISchema:{}}))}, action:Action): FormsState {

    //Ok, we now know that it is an alert action
    switch (action.type) {
        case formsConstants.FETCH_FORMS_SUMMARY:
            //Add the new success to the list
            return {formsSummary:action.payload};

        default:
            return state
    }
}