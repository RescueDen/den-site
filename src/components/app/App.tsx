import React from 'react';

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
import Achievements from "../person/achievement/Achievements";
import CourseList from "../courses/CourseList";
import Course from "../courses/Course";
import SideFeed from "../feed/SideFeed";
import {connect} from "react-redux";
import ApplicationState from "../../state/ApplicationState";
import {ThunkDispatch} from "redux-thunk";
import {feedActions} from "../../actions/feed.actions";
import Logging from "../logging/Logging";
import HelpViewier from "../static-pages/HelpViewier";
import FullPageMenu from "../menu/FullPageMenu";
import {leftMenuItems, rightMenuItems} from "./MenuItems";
import Welcome from "../static-pages/Welcome";
import CAWSHub from "../static-pages/CAWSHub";
import InsideCaws from "../newsAndInfo/InsideCaws";
import StatsPage from "../static-pages/StatsPage";
import MyPreferences from "../person/preferences/MyPreferences";
import KCBuilder from "../kennelCards/KCBuilder";
import AchievementSummary from "../person/achievement/AchievementSummary";
import AgreementPopUp from "../agreement/AgreementPopUp";
import PersonDetails from "../person/PersonDetails";


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
                <AgreementPopUp/>

                {/*Define the top area*/}

                {/*Provides call backs when this object leaves on certain*/}
                <SideFeed>
                    <ResponsiveNavBar
                        ///*Define a desktop header*/}
                        desktopHeader={undefined}
                        desktopMode={MenuMode.Fixed}

                        ///*Now for the menu items*/}
                        items={leftMenuItems}

                        //Add in fixed items
                        itemsRight=
                            {[
                                ...rightMenuItems,
                                {//Show all of the forms
                                    name: <Icon name="feed"/>,
                                    onClick: () => {
                                        this.props.toggleFeed();
                                    }
                                }
                            ]
                            }
                    >

                    {/*The menu is over is load in based upon the router*/}
                        <Container key={url} >
                            {/*Redirect to the default path*/}
                            <Route exact path="/" render={() => (
                                <Redirect to="/welcome"/>
                            )}/>
                            {/*List all of the possible paths*/}
                            {/*<PrivateRoute exactRoute={true} reqPermission='get_news' exclude={[]} path='/news' to='/appstatus/'  component={News} />*/}
                            <Route key='welcome' exact path="/welcome" component={Welcome} />
                            <Route key='currentfosters' exact path="/currentfosters" component={CurrentFostersFullPage} />
                            <Route key='pastfosters' exact path="/pastfosters" component={PastFostersFullPage} />
                            <Route key={'animal'+url} path="/animal/:aniId" component={AnimalDetails} />
                            <Route key='myinfo' path="/myinfo" component={MyDetails} />
                            <Route key='preferences' path="/preferences" component={MyPreferences} />
                            <Route key='info' exact path="/info/" reqPermission='get_info'  component={Information} />
                            <Route key='inside' exact path="/inside/" reqPermission='inside_caws'  component={InsideCaws} />
                            <Route key='news' exact path="/news/" reqPermission='get_news' component={News} />
                            <Route key={'info/articleId'+url} path="/info/:articleId" component={Information} />
                            <Route key={'inside/articleId'+url} path="/inside/:articleId" component={InsideCaws} />
                            <Route key={'news:articleID'+url} path="/news/:articleId" component={News} />
                            <Route key='ineed' exact path="/inneed/" component={InNeedOfFosterList} />
                            <Route key='forms' exact path="/forms/" component={FormSelector} />
                            <Route key={'forms/formid'+url} path="/forms/:formId" component={FormSelector} />
                            <Route key='events' exact path="/events/" component={EventsSelector} />
                            <Route key={'events/eventId'+url} path="/events/:eventId" component={EventsSelector} />
                            <Route key={'supplies'} path="/supplies" component={SuppliesPage} />
                            <Route key={'appstatus'} path="/appstatus" component={AppStatusPage} />
                            <Route key='courses' exact path="/courses/" component={CourseList} />
                            <Route key={'learn/courseId'+url} path="/learn/:courseId/:lessonNumber?" component={Course} />
                            <Route key={'logging'} path="/logging/" component={Logging} />
                            <Route key={'help'} path="/help" component={HelpViewier} />
                            <Route key={'stats'} path="/stats" component={StatsPage} />
                            <Route key={'kennelcard'} path="/kennelcard" component={KCBuilder} />
                            <Route exact key={'achievements'} path="/achievements" component={Achievements} />
                            <Route key={'achievements/achId'+url} path="/achievements/:achId" component={AchievementSummary} />
                            <Route key={'people/personId'+url} path="/people/:personId" component={PersonDetails} />


                            <Route key={'menu'} path="/menu" component={FullPageMenu}/>
                            <PrivateRoute exactRoute={true} reqPermission='access_hub' exclude={[]} path='/cawshub' to='/welcome'  component={CAWSHub} />

                        </Container>
                    </ResponsiveNavBar>
                </SideFeed>
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
