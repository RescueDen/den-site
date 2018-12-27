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
import FormViewer from "../forms/FormSelector";
import ResponsiveMenu, {MenuMode} from "../menu/ResponsiveNavBar";
import ResponsiveNavBar from "../menu/ResponsiveNavBar";
import FormSelector from "../forms/FormSelector";
import EventsSelector from "../events/EventsSelector";


//Setup up path props to get the current path
interface AppProps extends RouteProps{

}


class App extends React.Component<AppProps> {
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
                        {//Also show my info
                            name:"My Info",
                            to:'/myinfo',
                            icon:<Icon name='user outline' />
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
                    ]}

                    //Add in fixed items
                    itemsRight=
                        {[
                            {//Show all of the forms
                                name:"Log Out",
                                to:'/login',
                            }
                        ]}
                >

                    {/*The menu is over is load in based upon the router*/}
                    <Container>
                        {/*Redirect to the default path*/}
                        <Route exact path="/" render={() => (
                            <Redirect to="/news"/>
                        )}/>
                        {/*List all of the possible paths*/}
                        <Route key='currentfosters' exact path="/currentfosters" component={CurrentFostersFullPage} />
                        <Route key='pastfosters' exact path="/pastfosters" component={PastFostersFullPage} />
                        <Route key={'animal'+url} path="/animal/:aniId" component={AnimalDetails} />
                        <Route key='myinfo' path="/myinfo" component={MyDetails} />
                        <Route key='info' exact path="/info/" component={Information} />
                        <Route key={'info/articleId'+url} path="/info/:articleId" component={Information} />
                        <Route key='news' exact path="/news/" component={News} />
                        <Route key={'news:articleID'+url} path="/news/:articleId" component={News} />
                        <Route key='ineed' exact path="/inneed/" component={InNeedOfFosterList} />
                        <Route key='forms' exact path="/forms/" component={FormSelector} />
                        <Route key={'forms/formid'+url} path="/forms/:formId" component={FormSelector} />
                        <Route key='events' exact path="/events/" component={EventsSelector} />
                        <Route key={'events/eventId'+url} path="/events/:eventId" component={EventsSelector} />
                    </Container>
                </ResponsiveNavBar>

            </div>
        );
    }

};

export default App