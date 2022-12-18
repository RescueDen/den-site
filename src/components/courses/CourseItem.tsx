import React from 'react';
import {Card, Icon, Image} from "semantic-ui-react";
import {CourseData} from "../../models/Courses";

//Define the expected props
interface Props {
    //Define the props we expect
    course: CourseData
    navigate: (id: string) => any;
}

const CourseItem = (myProps: Props) => {
    return (<Card onClick={() => {
            myProps.navigate(myProps.course.id);
        }}>
            <Image centered src={myProps.course.thumbnail}/>
            <Card.Content>
                <Card.Header>{myProps.course.name}</Card.Header>
                <Card.Description>{myProps.course.preview}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name='university'/>
                Lessons: {myProps.course.lessons.length}
            </Card.Content>
        </Card>);
}

export default CourseItem