import {error} from './alert.actions';
import {Action, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {colonyService} from "../services/colony.service";
import {Colony} from "../models/Colony";

export const colonyConstants = {
    FETCH_COLONIES: 'FETCH_COLONiES',
    UPDATE_COLONY: 'UPDATE_COLONY',
};

export const colonyActions = {
    getColonyList,
    updateColony,
    loadColony
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

function updateColony(colony:Colony): ThunkAction<any, any,any, any> {
    //Return a function that will be called by dispatch
    return (dispatch:Dispatch<Action>) => {

        //Ask the user service to login
        colonyService.updateColony(colony)
            .then(
                list => {
                    //dispatch a login success
                    dispatch({
                        type: colonyConstants.UPDATE_COLONY,
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


function loadColony(colonyId:number): ThunkAction<any, any,any, any> {
    //Return a function that will be called by dispatch
    return (dispatch:Dispatch<Action>) => {

        //Ask the user service to login
        colonyService.loadColony(colonyId)
            .then(
                list => {
                    //dispatch a login success
                    dispatch({
                        type: colonyConstants.UPDATE_COLONY,
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
