import {error} from './alert.actions';
import {Action, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {feedService} from "../services/feed.service";

export const feedConstants = {
    FEED_TOGGLE: 'FEED_TOGGLE', FEED_UPDATE: 'FEED_UPDATE',

};

export const feedActions = {
    toggleFeed, updateFeed
    // getAll,
    // delete: _delete
};

/**
 * Update the info the summary
 * @returns {Function}
 */
function toggleFeed(): Action {
    return {
        type: feedConstants.FEED_TOGGLE,


    };

}

/**
 * Update the info the summary
 * @returns {Function}
 */
function updateFeed(): ThunkAction<any, any, any, any> {
    //Return a function that will be called by dispatch
    return (dispatch: Dispatch<Action>) => {

        feedService.getFeed()
            .then(//If successful a user will be returned
                sum => {
                    //dispatch a login success
                    dispatch({
                        type: feedConstants.FEED_UPDATE, payload: sum
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
