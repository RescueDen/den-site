import Action from '../actions/Action'
import FormsState from "../state/FormsState";
import {formsConstants} from "../actions/forms.actions";

export function forms(state: FormsState = {formsListing: {}}, action: Action): FormsState {
    switch (action.type) {
        case formsConstants.FETCH_FORMS_SUMMARY:
            return {formsListing: {...state.formsListing, [action.payload.category]: action.payload.listing}};
        default:
            return state
    }
}