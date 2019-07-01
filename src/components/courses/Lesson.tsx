import React, {RefObject} from 'react';
import {
    Card,
    Container,
    Embed,
    Grid, Header,
    Icon,
    Image,
    Placeholder,
    Rail,
    Responsive,
    Segment, SemanticWIDTHSNUMBER,
    Sticky
} from "semantic-ui-react";
import {LessonData} from "../../models/Courses";
import {coursesService} from "../../services/courses.service";
import SingleForm from "../forms/SingleForm";


//Define the expected props
interface Props{
    //Define the props we expect
    lesson: LessonData
}
interface State{
    html: string;

}

/**
 * This card shows the animal details
 */
class Lesson extends React.Component<Props, State> {
    state = {html:""};

    constructor(props:Props) {
        super(props);

    }


    componentDidMount() {
        // reset login status
        if (this.props.lesson.infoId) {

            coursesService.downloadLessonInfo(this.props.lesson.infoId)
                .then(
                    //If successful html will be returned
                    article => {
                        //Update the state
                        this.setState({html: article})
                    },
                    //If there was an error, show to the user
                    errorResponse => {
                        //Dispatch the error
                        try {
                            this.setState({html: errorResponse.response.data.message});
                        } catch (e) {
                            this.setState({html: errorResponse.toString()});

                        }

                    }
                );
        }

    };



    render() {

        //Prerender the video so it doesn't not un render
        let contentComputerWidth = 16 as  SemanticWIDTHSNUMBER;

        if(this.props.lesson.videoId && this.props.lesson.infoId) {

            contentComputerWidth = 12 as  SemanticWIDTHSNUMBER;
        }



        return (
            <div>
                {/*Now for a small screen just overlay them*/}
                <Responsive key="small"as={Grid}  columns={2} minWidth={Responsive.onlyLargeScreen.minWidth}>
                    {/*Put everything in a single col*/}
                    <Grid.Column width={contentComputerWidth}>
                        <div>
                                {/*Only put the video in the rail if info is defined */}
                                {this.props.lesson.infoId != undefined && this.props.lesson.videoId &&
                                    <Rail style={{marginTop:"25px"}} position='right'>
                                        <Embed
                                            id={this.props.lesson.videoId}
                                            source='youtube'
                                            active={true}
                                            iframe={{
                                                allowFullScreen: true,
                                            }}
                                        />
                                    </Rail>
                                }
                                <Container>
                                    <Segment>
                                        {/*Show a loading of the info*/}
                                        {this.props.lesson.infoId && this.state.html.length == 0 &&
                                        <Placeholder>
                                            <Placeholder.Line length='full' />
                                            <Placeholder.Line length='very long' />
                                            <Placeholder.Line length='long' />
                                            <Placeholder.Line length='medium' />
                                            <Placeholder.Line length='short' />
                                            <Placeholder.Line length='very short' />
                                        </Placeholder>
                                        }

                                        {/*Show the video as normal if there is no info*/}
                                        {this.props.lesson.infoId == undefined &&
                                            <Embed
                                                id={this.props.lesson.videoId}
                                                source='youtube'
                                                active={true}
                                                iframe={{
                                                    allowFullScreen: true,
                                                }}
                                            />
                                        }
                                        {/*Show the data of the info*/}
                                        {this.props.lesson.infoId && this.state.html.length != 0 &&
                                        <div dangerouslySetInnerHTML={{__html:this.state.html}}/>

                                        }
                                        {/*If there is a form*/}
                                        {this.props.lesson.formId &&
                                        <SingleForm  formId={this.props.lesson.formId} />
                                        }
                                        {/*Lastly we should embbeed somthing*/}
                                        {this.props.lesson.embeddedUrl &&
                                        <Header as='h2' textAlign='center'>
                                            <a target="_blank"
                                               href={this.props.lesson.embeddedUrl}
                                            >
                                                <Icon name='signup' />
                                                <Header.Content>{this.props.lesson.name}</Header.Content>
                                            </a>
                                        </Header>

                                        }
                                    </Segment>
                                </Container>
                            </div>
                    </Grid.Column>
                </Responsive>
                <Container>

                    {/*Now for a small screen just overlay them*/}
                    <Responsive key="small"as={Segment} maxWidth={Responsive.onlyLargeScreen.minWidth}>
                        {this.props.lesson.videoId &&
                            <Embed
                                id={this.props.lesson.videoId}
                                source='youtube'
                                active={true}
                                iframe={{
                                    allowFullScreen: false,
                                }}
                            />
                        }
                        {/*Show a loading of the info*/}
                        {this.props.lesson.infoId && this.state.html.length == 0 &&
                            <Placeholder>
                                <Placeholder.Line length='full' />
                                <Placeholder.Line length='very long' />
                                <Placeholder.Line length='long' />
                                <Placeholder.Line length='medium' />
                                <Placeholder.Line length='short' />
                                <Placeholder.Line length='very short' />
                            </Placeholder>
                        }
                        {/*Show the data of the info*/}
                        {this.props.lesson.infoId && this.state.html.length != 0 &&
                            <div dangerouslySetInnerHTML={{__html:this.state.html}}/>

                        }
                        {/*If there is a form*/}
                        {this.props.lesson.formId &&
                            <SingleForm  formId={this.props.lesson.formId} />
                        }
                        {/*Lastly we should embbeed somthing*/}
                        {this.props.lesson.embeddedUrl &&

                                <Header as='h2' textAlign='center'>
                                    <a target="_blank"
                                       href={this.props.lesson.embeddedUrl}
                                    >
                                    <Icon name='signup' />
                                    <Header.Content>{this.props.lesson.name}</Header.Content>
                                    </a>
                                </Header>

                        }
                    </Responsive>
                </Container>
            </div>
        );
    }
}

export default Lesson