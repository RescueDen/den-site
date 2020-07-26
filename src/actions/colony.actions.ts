import {  error } from './alert.actions';
import {Action, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {contentService} from "../services/content.service";
import {colonyService} from "../services/colony.service";

export const colonyConstants = {
    FETCH_COLONIES: 'FETCH_COLONiES',
};

export const colonyActions = {
    getColonyList,
};


function getColonyList(): ThunkAction<any, any,any, any> {
    //Return a function that will be called by dispatch
    return (dispatch:Dispatch<Action>) => {

        //Ask the user service to login
        colonyService.getColonyList()
            .then(
                list => {
                    //dispatch a login success
                    dispatch({
                        type: colonyConstants.FETCH_COLONIES,
                        payload: list
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

