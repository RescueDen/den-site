import {  error } from './alert.actions';
import {Action, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {voucherService} from "../services/voucher.service";

export const voucherConstants = {
    FETCH_VOUCHER_INFO: 'FETCH_VOUCHER_INFO',

};

export const voucherActions = {
    getVoucherInfo
    // logout,
    // getAll,
    // delete: _delete
};

/**
 * Updates the info about vouchers
 * @param username
 * @param password
 * @returns {Function}
 */
function getVoucherInfo(): ThunkAction<any, any,any, any> {
    //Return a function that will be called by dispatch
    return (dispatch:Dispatch<Action>) => {

        //Ask the user service to login
        voucherService.getVoucherInfo()
            .then(
                //If successful a user will be returned
                info => {
                    //dispatch a login success
                    dispatch({
                        type: voucherConstants.FETCH_VOUCHER_INFO,
                        payload: info
                    });
                },
                //If there was an error, dispatch a login failure and alert the user why
                errorResponse => {
                    //Dispatch the error
                    try {
                        dispatch(error(errorResponse.response.data.message));
                    }catch(e){
                        dispatch(error(errorResponse.toString()));

                    }

                }
            );
    };

}

