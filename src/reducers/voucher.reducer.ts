import Action from '../actions/Action'
import CawsAnimal from "../models/CawsAnimal"
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
export function voucher(state:VoucherState = {info:undefined}, action:Action): VoucherState {

    //Ok, we now know that it is an alert action
    switch (action.type) {
        case voucherConstants.FETCH_VOUCHER_INFO:
            //Add the new success to the list
            return {...state, info:action.payload};

        default:
            return state
    }
}