import React from 'react';
import {connect} from 'react-redux';
import ApplicationState from "../../state/ApplicationState";

import {Button, Card, Dropdown, DropdownItemProps, Grid, Message, Placeholder, Progress} from "semantic-ui-react";
import {RouteComponentProps, withRouter} from "react-router";
import {ThunkDispatch} from "redux-thunk";
import {coursesActions} from "../../actions/courses.actions";
import CourseListing, {CourseData} from "../../models/Courses";
import CourseItem from "./CourseItem";
import Lesson from "./Lesson";



//Define the expected props
interface LinkProps extends RouteComponentProps<any> {
    //Define the props we expect
    courses: CourseListing;
    courseId?:string;
    lessonNumber?:string;

}


interface DispatchProps{
    //And the actions that must be done
    getCourseList: () => any;

}



class Course extends React.Component<LinkProps&DispatchProps, any> {

    /**
     * Gets called once when the page loads.  Tell the system to download or update the summary
     */
    componentDidMount(){
        // reset login status
        this.props.getCourseList()
    };

    //Navigate to lesson
    moveToLesson(lesson:number){
        const courseLesson = this.props.courseId + "/" + lesson
        this.props.history.push(`/learn/${courseLesson}`)
    }


    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        //If we are sill loading the courses
        if(!this.props.courses || this.props.courses.empty() || !this.props.courseId){
            return(
                <div>
                    <Placeholder.Image rectangular>

                    </Placeholder.Image>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Paragraph>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    </Placeholder.Paragraph>
                </div>
            );
        }else{
            //See if we have the course
            const courseData = this.props.courses.getCourse(this.props.courseId)

            //Else load
            if(!courseData){
                return (
                    <Message negative>
                        <Message.Header>Could not find the specified course.</Message.Header>
                        <p>{this.props.courseId}</p>
                    </Message>
                );

            }else{
                //Check to see if the lesson is a number
                let lessonIndex = 0;

                //See if it specfied
                if(this.props.lessonNumber)
                    lessonIndex = parseInt(this.props.lessonNumber)


                //Make sure it is in bounds
                if (isNaN(lessonIndex)){
                    lessonIndex=0
                }
                lessonIndex = Math.min(lessonIndex, courseData.lessons.length-1)
                lessonIndex = Math.max(lessonIndex, 0)

                //Build the lessonList
                const lessonList = courseData.lessons.map( (lesson, index)  =>{
                    return {
                        text:index + ": " +lesson.name,
                        value:index,
                    }
                })

                //Compute th epercent
                const percent = lessonIndex/(courseData.lessons.length)*100.0;

                //See if we need show the foward button
                const nextIndex =Math.min(lessonIndex+1, courseData.lessons.length-1)
                const nextButton =  nextIndex != lessonIndex?  <Button
                    circular
                    icon='angle double right'
                    onClick={() => this.moveToLesson(nextIndex)}
                />: null;
                const prevIndex =Math.max(lessonIndex-1,0)
                const prevButton =  prevIndex != lessonIndex?  <Button
                    circular
                    icon='angle double left'
                    onClick={() => this.moveToLesson(prevIndex)}
                />: null;



                return (
                    <div>
                        {/*Build the list of options*/}
                        <Dropdown button fluid selection
                                  value={lessonIndex}
                                  options={lessonList}
                                  onChange={ (info, data) => this.moveToLesson(data.value as number)}
                        />

                        {/*Show the lesson*/}
                        <Lesson lesson={courseData.lessons[lessonIndex]} />

                        {/*Add a progress bar*/}
                        <br/>
                        {courseData.lessons.length > 1 &&
                            <Grid columns='equal'>
                                <Grid.Column textAlign='right' width={2}>{prevButton}</Grid.Column>
                                <Grid.Column textAlign='center' size='tiny'  as={Progress} percent={percent}>{courseData.lessons[lessonIndex].name}</Grid.Column>
                                <Grid.Column textAlign='left' width={2}>{nextButton}</Grid.Column>

                            </Grid>
                        }
                    </div>
                );

            }
        }

    }
}

/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState,myProps:LinkProps ):LinkProps {
    return {
        ...myProps,
        courses: state.courses.courses,
        courseId:myProps.match.params.courseId,
        lessonNumber:myProps.match.params.lessonNumber

    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>):DispatchProps {
    return {
        getCourseList:() =>  dispatch(coursesActions.getCourses())
    };

}

//https://stackoverflow.com/questions/48292707/strongly-typing-the-react-redux-connect-with-typescript
const CourseWithOutRouter = connect (
    mapStateToProps,
    mapDispatchToProps
)(Course);


//Wrap with a withRouter so we get the current location
export default withRouter<LinkProps>(props => <CourseWithOutRouter {...props}/>);
