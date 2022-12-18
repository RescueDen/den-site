import {error} from './alert.actions';
import {Action, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {voucherService} from "../services/voucher.service";
import {VoucherSearch} from "../models/Voucher";

export const voucherConstants = {
    FETCH_VOUCHER_INFO: 'FETCH_VOUCHER_INFO',
    START_VOUCHER_SEARCH: 'START_VOUCHER_SEARCH',
    FETCH_VOUCHER_SEARCH: 'FETCH_VOUCHER_SEARCH',

};

export const voucherActions = {
    getVoucherInfo, updateVoucherSearch
    // logout,
    // getAll,
    // delete: _delete
};

/**
 * Updates the info about vouchers
 * @returns {Function}
 */
function getVoucherInfo(): ThunkAction<any, any, any, any> {
    //Return a function that will be called by dispatch
    return (dispatch: Dispatch<Action>) => {

        voucherService.getVoucherInfo()
            .then(//If successful a user will be returned
                info => {
                    //dispatch a login success
                    dispatch({
                        type: voucherConstants.FETCH_VOUCHER_INFO, payload: info
                    });
                }, //If there was an error, dispatch a login failure and alert the user why
                errorResponse => {
                    //Dispatch the error
                    try {
                        dispatch(error(errorResponse.response.data.message));
                    } catch (e) {
                        dispatch(error(errorResponse.toString()));

                    }

                });
    };

}


/**
 * Update the voucher search
 * @returns {Function}
 * @param searchParams
 */
function updateVoucherSearch(searchParams: VoucherSearch): ThunkAction<any, any, any, any> {
    //Return a function that will be called by dispatch
    return (dispatch: Dispatch<Action>) => {

        //dispatch a login success
        dispatch({
            type: voucherConstants.START_VOUCHER_SEARCH, payload: searchParams
        });

        voucherService.performVoucherSearch(searchParams)
            .then(//If successful a user will be returned
                results => {
                    //dispatch a login success
                    dispatch({
                        type: voucherConstants.FETCH_VOUCHER_SEARCH, payload: results
                    });
                }, //If there was an error, dispatch a login failure and alert the user why
                errorResponse => {
                    //Dispatch the error
                    try {
                        dispatch(error(errorResponse.response.data.message));
                    } catch (e) {
                        dispatch(error(errorResponse.toString()));

                    }

                });
    };

}
