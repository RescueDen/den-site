import React from 'react';
import {connect} from 'react-redux';
import ApplicationState from "../../state/ApplicationState";

import {Card, Placeholder} from "semantic-ui-react";
import {RouteComponentProps, withRouter} from "react-router";
import {ThunkDispatch} from "redux-thunk";
import {coursesActions} from "../../actions/courses.actions";
import CourseListing, {CourseData} from "../../models/Courses";
import CourseItem from "./CourseItem";



//Define the expected props
interface LinkProps extends RouteComponentProps<any> {
    //Define the props we expect
    courses: CourseListing;
}


interface DispatchProps{
    //And the actions that must be done
    getCourseList: () => any;

}


/**
 * This card shows the animal details
 */
class CourseList extends React.Component<LinkProps&DispatchProps, any> {

    /**
     * Gets called once when the page loads.  Tell the system to download or update the summary
     */
    componentDidMount(){
        // reset login status
        this.props.getCourseList()
    };



    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        return (
            <Card.Group stackable >
                {this.props.courses &&

                    this.props.courses.list.map(course => {
                        return <CourseItem
                            key={course.id}
                            course={course}
                            navigate={
                                (id:string) =>{
                                    this.props.history.push(`/learn/${id}`)
                                }
                            }
                        />
                    })

                }
                {!this.props.courses || this.props.courses.list.length == 0 &&
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

/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState,myProps:any ):LinkProps {
    return {
        ...myProps,
        courses: state.courses.courses
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>):DispatchProps {
    return {
        getCourseList:() =>  dispatch(coursesActions.getCourses())
    };

}

//https://stackoverflow.com/questions/48292707/strongly-typing-the-react-redux-connect-with-typescript
const CourseListWithOutRouter =connect (
    mapStateToProps,
    mapDispatchToProps
)(CourseList);



//Wrap with a withRouter so we get the current location
export default withRouter(props => <CourseListWithOutRouter {...props}/>);