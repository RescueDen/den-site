import Action from '../actions/Action'
import CawsAnimal from "../models/ShelterAnimal"
import {animalConstants} from "../actions/animal.actions";
import AnimalState from "../state/AnimalState";
import InfoState from "../state/InfoState";
import ArticlesSummary from "../models/ArticlesSummary";
import {infoConstants} from "../actions/info.actions";
import NewsState from "../state/NewsState";
import {newsConstants} from "../actions/news.actions";
import VoucherState from "../state/VoucherState";
import {voucherConstants} from "../actions/voucher.actions";

/**
 * The voucher reducer maintains a voucher state
 * @param state
 * @param action
 * @returns {*}
 */
export function voucher(state:VoucherState = {info:undefined, updating:false, results:undefined, currentSearch:{page:1, pageSize:25}}, action:Action): VoucherState {

    //Ok, we now know that it is an alert action
    switch (action.type) {
        case voucherConstants.FETCH_VOUCHER_INFO:
            //Add the new success to the list
            return {...state, info:action.payload};

        case voucherConstants.START_VOUCHER_SEARCH:
            return {...state, updating:true, currentSearch:action.payload};
        case voucherConstants.FETCH_VOUCHER_SEARCH:
            return {...state, updating:false, results:action.payload};
        default:
            return state
    }
}