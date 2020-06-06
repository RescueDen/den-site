import CourseListing from "../models/Courses";

export default interface CoursesState {
    coursesListings: { [category: string]: CourseListing; }
}
