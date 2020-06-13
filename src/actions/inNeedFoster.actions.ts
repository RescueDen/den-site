import {error, success} from './alert.actions';
import {Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {inNeedOfFosterService} from "../services/inNeedOfFoster.service";
import {animalActions} from "./animal.actions";
import {NonShelterAnimal} from "../models/InNeedOfFosterModel";

export const inNeedConstants = {
    FETCH_INNEEDOFFOSTER: 'FETCH_INNEEDOFFOSTER',
    UPLOAD_INNEED_ANIMAL: 'UPLOAD_INNEED_ANIMAL',
    DELETE_INNEED_ANIMAL: 'DELETE_INNEED_ANIMAL',
    UPLOADED_INNEED_ANIMAL: 'UPLOADED_INNEED_ANIMAL',
    DELETED_INNEED_ANIMAL: 'DELETED_INNEED_ANIMAL',
};

export const inNeedActions = {
    getInNeedOfFoster,
    uploadAnimal,
    removeAnimal
};

/**
 * Update the news summary
 * @param username
 * @param password
 * @returns {Function}
 */
function getInNeedOfFoster(): ThunkAction<any, any,any, any> {
    //Return a function that will be called by dispatch
    return (dispatch:Dispatch<any>) => {

        //Ask the user service to login
        inNeedOfFosterService.getInNeedOfFosterList()
            .then(
                //If successful a user will be returned
                sum => {
                    //Now call for each of those animals to be downloaded
                    sum.getAllAnimalsInNeed().forEach(id => dispatch(animalActions.getAnimal(id)))

                    //dispatch a login success
                    dispatch({
                        type: inNeedConstants.FETCH_INNEEDOFFOSTER,
                        payload: sum
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

/**
 * This is the user action to try to log in
 * @param username
 * @param password
 * @returns {Function}
 */
function uploadAnimal(data: NonShelterAnimal, file: File): ThunkAction<any, any,any, any> {
    //Return a function that will be called by dispatch
    return (dispatch:Dispatch<any>) => {
        //dispatch a login success
        dispatch({
            type: inNeedConstants.UPLOAD_INNEED_ANIMAL,
        });

        //Ask the user service to login
        inNeedOfFosterService.uploadAnimal(data, file)
            .then(
                newAnimal => {
                    dispatch({
                        type: inNeedConstants.UPLOADED_INNEED_ANIMAL,
                        payload: newAnimal
                    });

                    dispatch(success("Uploaded in-need animal " + newAnimal.name));
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


function removeAnimal(id:number): ThunkAction<any, any,any, any> {
    //Return a function that will be called by dispatch
    return (dispatch:Dispatch<any>) => {
        //dispatch a login success
        dispatch({
            type: inNeedConstants.DELETE_INNEED_ANIMAL,
        });

        //Ask the user service to login
        inNeedOfFosterService.removeAnimal(id)
            .then(
                sum => {
                    dispatch({
                        type: inNeedConstants.DELETED_INNEED_ANIMAL,
                        payload: id
                    });

                    dispatch(success("Deleted in-need animal"));
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
