import React from 'react';
import {connect} from 'react-redux';
import ApplicationState from "../../state/ApplicationState";

import {Card, Placeholder} from "semantic-ui-react";
import {RouteComponentProps, withRouter} from "react-router";
import {ThunkDispatch} from "redux-thunk";
import CourseListing from "../../models/Courses";
import CourseItem from "./CourseItem";
import {coursesActions} from "../../actions/courses.actions";

interface MyProps extends RouteComponentProps<any> {
    category : string;
}

//Define the expected props
interface LinkProps {
    //Define the props we expect
    courses?: CourseListing;
}


interface DispatchProps{
    //And the actions that must be done
    getCourseList: (category:string) => any;
}

/**
 * This card shows the animal details
 */
class CourseList extends React.Component<MyProps&LinkProps&DispatchProps, any> {

    /**
     * Gets called once when the page loads.  Tell the system to download or update the summary
     */
    componentDidMount(){
        // reset login status
        this.props.getCourseList(this.props.category)
    };

    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        return (
            <Card.Group stackable >
                {this.props.courses &&

                    this.props.courses.courseListingData.items?.map(course => {
                        return <CourseItem
                            key={course.id}
                            course={course}
                            navigate={
                                (id:string) =>{
                                    this.props.history.push(`/${this.props.category}/${id}`)
                                }
                            }
                        />
                    })

                }
                {!this.props.courses || this.props.courses.courseListingData.items?.length == 0 &&
                    <Card>
                        <Card.Content>
                            <Placeholder>
                                <Placeholder.Image rectangular/>
                            </Placeholder>
                        </Card.Content>
                    </Card>
                }
            </Card.Group>
        );

    }
}

function mapStateToProps(state:ApplicationState,myProps:MyProps ):MyProps&LinkProps {
    return {
        ...myProps,
        courses: state.courses.coursesListings[myProps.category]
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>):DispatchProps {
    return {
        getCourseList:(category:string) => dispatch(coursesActions.getCourses(category))
    };

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CourseList))
