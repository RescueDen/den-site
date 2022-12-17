import React from 'react';

// import routes
import {Container, Icon} from 'semantic-ui-react';
import {Redirect, Route, RouteProps} from "react-router";

//Import Pages
import {CurrentFostersFullPage, PastFostersFullPage} from "../animal/FullPageAnimalCards";
import AnimalDetails from "../animal/AnimalDetails";
import MyDetails from "../person/MyDetails";
import ArticleListView from "../content/ArticleListView";
import InNeedOfFosterList from "../inneed/InNeedOfFosterList";
import {MenuMode} from "../menu/ResponsiveNavBar";
import ResponsiveNavBar from "../menu/ResponsiveNavBar";
import FormSelector from "../forms/FormSelector";
import EventsSelector from "../events/EventsSelector";
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
import LivesSavedPage from "../stats/LivesSavedPage";
import MyPreferences from "../person/preferences/MyPreferences";
import KCBuilder from "../kennelCards/KCBuilder";
import AchievementSummary from "../person/achievement/AchievementSummary";
import AgreementPopUp from "../agreement/AgreementPopUp";
import PersonDetails from "../person/PersonDetails";
import VoucherOverview from "../voucher/VoucherOverview";
import VoucherViewer from "../voucher/VoucherViewer";
import DocumentView from "../content/DocumentView";
import ColonyList from "../colony/ColonyList";
import ColonyPage from "../colony/ColonyPage";
import {success} from "../../actions/alert.actions";


//Setup up path props to get the current path
interface AppProps extends RouteProps{

}

//Setup up path props to get the current path
interface DispatchProps {
    //And the actions that must be done
    toggleFeed: () => any;

    // notify that this is a beta
    alert:(message: string) => any;
}

class App extends React.Component<AppProps&DispatchProps> {
    state={showFeed:false}
    /**
     * Gets called once when the page loads
     */
    componentDidMount(){
        if(process.env.REACT_APP_BETA && JSON.parse(process.env.REACT_APP_BETA)){
            alert("This a beta version of RescueDen.  Please report problems/feedback to support@rescueden.org.");
        }
    };

    //Return the real div
    /**
     * Re-render eveyr time this is called
     * @returns {*}
     */
    render() {

        //Get the current url
        const url = this.props.location? this.props.location.pathname: "";

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
                        <Container>
                            {/*Redirect to the default path*/}
                            <Route exact path="/" render={() => (
                                <Redirect to="/welcome"/>
                            )}/>
                            <Route exact path="//" render={() => (
                                <Redirect to="/welcome"/>
                            )}/>
                            {/*List all of the possible paths*/}
                            {/*<PrivateRoute exactRoute={true} reqPermission='get_news' exclude={[]} path='/news' to='/appstatus/'  component={News} />*/}
                            {/*<Route key='welcome' exact path="/welcome" component={Welcome} />*/}
                            <PrivateRoute exactRoute={true} reqPermission='registered' exclude={[]} path='/welcome' to='/gettingstarted'  component={Welcome} />

                            <Route key='currentfosters' exact path="/currentfosters" component={CurrentFostersFullPage} />
                            <Route key='pastfosters' exact path="/pastfosters" component={PastFostersFullPage} />
                            <Route key={'animal'+url} path="/animal/:aniId" component={AnimalDetails} />
                            <Route key='myinfo' path="/myinfo" component={MyDetails} />
                            <Route key='preferences' path="/preferences" component={MyPreferences} />
                            <Route key='info' exact path="/info/" render={(props) => <DocumentView {...props} category={"info"} />} />
                            <Route key={'info/articleId'+url} path="/info/:articleId" render={(props) => <DocumentView {...props} category={"info"} />}  />
                            <Route key='inside' exact path="/inside/" render={(props) => <DocumentView {...props} category={"inside"} />}  />
                            <Route key={'inside/articleId'+url} path="/inside/:articleId" render={(props) => <DocumentView {...props} category={"inside"} />}  />
                            <Route key='news' exact path="/news/" render={(props) => <ArticleListView {...props} category={"news"} />} />
                            <Route key={'news:articleID'+url} path="/news/:articleId" render={(props) => <ArticleListView {...props} category={"news"} />} />
                            <Route key='ineed' exact path="/inneed/" component={InNeedOfFosterList} />
                            <Route key='forms' exact path="/forms/" render={(props) => <FormSelector {...props} category={"forms"} />} />
                            <Route key={'forms/formid'+url} path="/forms/:formId" render={(props) => <FormSelector {...props} category={"forms"} />} />
                            <Route key='events' exact path="/events/" component={EventsSelector} />
                            <Route key={'events/eventId'+url} path="/events/:eventId" component={EventsSelector} />
                            <Route key={'gettingstarted'} path="/gettingstarted" component={AppStatusPage} />
                            <Route key='courses' exact path="/courses/" render={(props) => <CourseList {...props} category={"learn"} />} />
                            <Route key={'learn/courseId'+url} path="/learn/:courseId/:lessonNumber?" render={(props) => <Course {...props} category={"learn"} />} />
                            <Route key={'logging'} path="/logging/" component={Logging} />
                            <Route key={'help'} path="/help" component={HelpViewier} />
                            <Route key={'lives-saved'} path="/lives-saved" component={LivesSavedPage} />
                            <Route key={'kennelcard'} path="/kennelcard" component={KCBuilder} />
                            <Route exact key={'achievements'} path="/achievements" component={Achievements} />
                            <Route key={'achievements/achId'+url} path="/achievements/:achId" component={AchievementSummary} />
                            <Route key={'people/personId'+url} path="/people/:personId" component={PersonDetails} />
                            <Route exact key={'vouchers'} path="/vouchers" component={VoucherOverview} />
                            <Route exact key={'voucher'} path="/voucher" component={VoucherViewer} />
                            <Route key={'voucher/vouchers'+url} path="/voucher/:voucherId" component={VoucherViewer} />
                            <Route key={'colonies'} path="/colonies" component={ColonyList} />
                            <Route key={'colony/colonyId'+url} path="/colony/:colonyId" component={ColonyPage} />

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
        toggleFeed:() =>  dispatch(feedActions.toggleFeed()),
        alert: (message: string) => dispatch(success(message))
    };

}

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(App);
