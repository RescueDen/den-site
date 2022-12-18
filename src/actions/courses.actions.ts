import {error} from './alert.actions';
import {Action, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {coursesService} from "../services/courses.service";

export const coursesConstants = {
    FETCH_COURSE_LIST: 'FETCH_COURSE_LIST',
};

export const coursesActions = {
    getCourses,
};

function getCourses(category: string): ThunkAction<any, any, any, any> {
    //Return a function that will be called by dispatch
    return (dispatch: Dispatch<Action>) => {

        //Ask the user service to login
        coursesService.getCoursesSummary(category)
            .then(//If successful a user will be returned
                listing => {
                    //dispatch a login success
                    dispatch({
                        type: coursesConstants.FETCH_COURSE_LIST, payload: {
                            category: category, listing: listing
                        }
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

