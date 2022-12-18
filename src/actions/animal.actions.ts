import {error} from './alert.actions';
import {Action, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {animalService} from "../services/animal.service"

export const animalConstants = {
    FETCH_ANIMAL: 'FETCH_ANIMAL',

};

export const animalActions = {
    getAnimal, getAnimalWithDispatch, uploadAnimalPicture
    // logout,
    // getAll,
    // delete: _delete
};

/**
 * This is used to get the latest version of the animal
 * @returns {Function}
 * @param id
 */
function getAnimal(id: number): ThunkAction<any, any, any, any> {
    //Return a function that will be called by dispatch
    return (dispatch: Dispatch<Action>) => {

        //Ask the user service to log in
        animalService.getAnimal(id)
            .then(//If successful a user will be returned
                ani => {
                    //dispatch a login success
                    dispatch({
                        type: animalConstants.FETCH_ANIMAL, payload: ani
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
 * This is used to get the latest version of the animal
 * @param id
 * @param dispatch
 * @param id
 */
function getAnimalWithDispatch(dispatch: Dispatch<Action>, id: number): void {

    //Ask the user service to log in
    animalService.getAnimal(id)
        .then(//If successful a user will be returned
            ani => {
                //dispatch a login success
                dispatch({
                    type: animalConstants.FETCH_ANIMAL, payload: ani
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

}


/**
 * This is the user action to try to log in
 * @param id
 * @param notes
 * @param file
 * @param id
 * @param notes
 * @param file
 */
function uploadAnimalPicture(id: number, notes: string, file: File): ThunkAction<any, any, any, any> {
    //Return a function that will be called by dispatch
    return (dispatch: Dispatch<any>) => {


        //Ask the user service to log in
        animalService.uploadPicture(id, notes, file)
            .then(//If successful a user will be returned
                ani => {
                    //dispatch a login success
                    dispatch({
                        type: animalConstants.FETCH_ANIMAL, payload: ani
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


