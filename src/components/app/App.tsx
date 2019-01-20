import React from 'react';
import logoImage from '../../assets/logos/xCAWS_logo_sideways.png';

// import routes
import {Container, Image, Icon} from 'semantic-ui-react';
import {Redirect, Route, RouteProps} from "react-router";

//Import Pages
import {CurrentFostersFullPage, PastFostersFullPage} from "../animal/FullPageAnimalCards";
import AnimalDetails from "../animal/AnimalDetails";
import MyDetails from "../person/MyDetails";
import Information from "../newsAndInfo/Information";
import News from "../newsAndInfo/News";
import InNeedOfFosterList from "../inneed/InNeedOfFosterList";
import ResponsiveMenu, {MenuMode} from "../menu/ResponsiveNavBar";
import ResponsiveNavBar from "../menu/ResponsiveNavBar";
import FormSelector from "../forms/FormSelector";
import EventsSelector from "../events/EventsSelector";
import SuppliesPage from "../static-pages/SuppliesPage";
import AppStatusPage from "../static-pages/AppStatusPage";
import PrivateRoute from "../authentication/PrivateRoute";
import Achievements from "../person/Achievements";
import CourseList from "../courses/CourseList";
import Course from "../courses/Course";
import TheFeed from "../feed/TheFeed";
import {connect} from "react-redux";
import ApplicationState from "../../state/ApplicationState";
import {ThunkDispatch} from "redux-thunk";
import {feedActions} from "../../actions/feed.actions";
import Logging from "../logging/Logging";


//Setup up path props to get the current path
interface AppProps extends RouteProps{

}

//Setup up path props to get the current path
interface DispatchProps {
    //And the actions that must be done
    toggleFeed: () => any;

}


class App extends React.Component<AppProps&DispatchProps> {
    state={showFeed:false}
    /**
     * Gets called once when the page loads
     */
    componentDidMount(){

    };


    //Return the real div
    /**
     * Re-render eveyr time this is called
     * @returns {*}
     */
    render() {

        //Get the current url
        const url = this.props.location? this.props.location.pathname: "";
        console.log(url);

        return (
            <div className="App">
                {/*Define the top area*/}

                {/*Provides call backs when this object leaves on certain*/}
                <TheFeed >
                    <ResponsiveNavBar
                        ///*Define a desktop header*/}
                        desktopHeader={undefined}
                        desktopMode={MenuMode.Fixed}

                        ///*Now for the menu items*/}
                        items={[
                            //The logo
                            {
                                name:<Image size='tiny' src={logoImage} />
                            },
                            {
                                name:"App Status",
                                to:'/appstatus',
                                icon:<Icon name='check square outline' />
                            },
                            {
                                name:"News",
                                to:'/news',
                                reqPerm:'get_news',
                                icon:<Icon name='newspaper outline' />
                            },
                            {
                                name:"Info",
                                to:'/info',
                                reqPerm:'get_info',
                                icon:<Icon name='tv' />
                            },
                            {//Now foster info
                                name:"Fosters",
                                reqPerm:"get_animal_info",
                                icon:<Icon name='paw' />,
                                subItems:[
                                    {
                                        name:"In Need",
                                        to:'/inneed',
                                    },
                                    {
                                        name:"Your Current Fosters",
                                        to:'/currentfosters',
                                    },
                                    {
                                        name:"Your Past Fosters",
                                        to:'/pastfosters',
                                    }
                                ]

                            },
                            {//Show all of the forms
                                name:"Forms",
                                to:'/forms',
                                icon:<Icon name='edit outline' />
                            },
                            {//Show all of the forms
                                name:"Events",
                                to:'/events',
                                icon:<Icon name='calendar alternate outline' />
                            },
                            {//Now foster info
                                name:undefined,
                                subItems:[
                                    {//Also show my info
                                        name:"My Info",
                                        to:'/myinfo',
                                        icon:<Icon name='user outline' />
                                    },
                                    {
                                        name:"Supplies",
                                        to:'/supplies',
                                        reqPerm:"foster_supplies",
                                        icon:<Icon name='shopping basket' />
                                    },
                                    {
                                        name:"Learn",
                                        to:'/learn',
                                        reqPerm:"get_courses",
                                        icon:<Icon name='university' />
                                    }
                                ]

                            },
                        ]}

                        //Add in fixed items
                        itemsRight=
                            {[
                                {//Show all of the forms
                                    name:"Log Out",
                                    to:'/login'
                                },
                                {//Show all of the forms
                                    name:<Icon name="feed" />,
                                    onClick: () =>{
                                        this.props.toggleFeed();
                                    }
                                }
                            ]}
                    >

                    {/*The menu is over is load in based upon the router*/}
                        <Container key={url}>
                            {/*Redirect to the default path*/}
                            <Route exact path="/" render={() => (
                                <Redirect to="/news"/>
                            )}/>
                            {/*List all of the possible paths*/}
                            <PrivateRoute exactRoute={true} reqPermission='get_news' exclude={[]} path='/news' to='/appstatus/'  component={News} />
                            <Route key='currentfosters' exact path="/currentfosters" component={CurrentFostersFullPage} />
                            <Route key='pastfosters' exact path="/pastfosters" component={PastFostersFullPage} />
                            <Route key={'animal'+url} path="/animal/:aniId" component={AnimalDetails} />
                            <Route key='myinfo' path="/myinfo" component={MyDetails} />
                            <Route key='info' exact path="/info/" component={Information} />
                            <Route key={'info/articleId'+url} path="/info/:articleId" component={Information} />
                            <Route key={'news:articleID'+url} path="/news/:articleId" component={News} />
                            <Route key='ineed' exact path="/inneed/" component={InNeedOfFosterList} />
                            <Route key='forms' exact path="/forms/" component={FormSelector} />
                            <Route key={'forms/formid'+url} path="/forms/:formId" component={FormSelector} />
                            <Route key='events' exact path="/events/" component={EventsSelector} />
                            <Route key={'events/eventId'+url} path="/events/:eventId" component={EventsSelector} />
                            <Route key={'supplies'} path="/supplies" component={SuppliesPage} />
                            <Route key={'appstatus'} path="/appstatus" component={AppStatusPage} />
                            <Route key={'achievements'} path="/achievements" component={Achievements} />
                            <Route key='learn' exact path="/learn/" component={CourseList} />
                            <Route key={'learn/courseId'+url} path="/learn/:courseId/:lessonNumber?" component={Course} />
                            <Route key={'logging'} path="/logging/" component={Logging} />

                        </Container>
                    </ResponsiveNavBar>
                </TheFeed>
            </div>
        );
    }

};

/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState,myProps:AppProps ):AppProps {
    return {
        ...myProps,
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>):DispatchProps {
    return {
        toggleFeed:() =>  dispatch(feedActions.toggleFeed())
    };

}

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(App);
