import CoursesState from "../state/CoursesState";
import {coursesConstants} from "../actions/courses.actions";
import Action from '../actions/Action'

export function courses(state: CoursesState = {coursesListings: {}}, action: Action): CoursesState {

    //Ok, we now know that it is an alert action
    switch (action.type) {
        case coursesConstants.FETCH_COURSE_LIST:
            return {coursesListings: {...state.coursesListings, [action.payload.category]: action.payload.listing}};
        default:
            return state
    }
}