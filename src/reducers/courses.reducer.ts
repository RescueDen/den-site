import CoursesState from "../state/CoursesState";
import CourseListing, {CourseData} from "../models/Courses";
import {coursesConstants} from "../actions/courses.actions";
import Action from '../actions/Action'

/**
 * The alert reducer maintains a list of alerts
 * @param state
 * @param action
 * @returns {*}
 */
export function courses(state:CoursesState = {courses: new CourseListing([]) }, action:Action): CoursesState {

    //Ok, we now know that it is an alert action
    switch (action.type) {
        case coursesConstants.FETCH_COURSE_LIST:
            //Add the new success to the list
            return {courses:action.payload};

        default:
            return state
    }
}