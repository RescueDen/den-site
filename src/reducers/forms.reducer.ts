import Action from '../actions/Action'
import FormsState from "../state/FormsState";
import FormsSummary from "../models/FormsSummary";
import {formsConstants} from "../actions/forms.actions";

/**
 * The alert reducer maintains a list of alerts
 * @param state
 * @param action
 * @returns {*}
 */
export function forms(state:FormsState = {formsSummary:(new FormsSummary({id:"",type:"",name:"", parentId:"", metadata:{title:"", requiredPerm:[]}, JSONSchema:{}, UISchema:{}}))}, action:Action): FormsState {

    //Ok, we now know that it is an alert action
    switch (action.type) {
        case formsConstants.FETCH_FORMS_SUMMARY:
            //Add the new success to the list
            return {formsSummary:action.payload};

        default:
            return state
    }
}