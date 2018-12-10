import React from 'react';
import logoImage from '../../assets/logos/xCAWS_logo_sideways.png';

// import routes
import {Container, Image, Visibility, Header, Menu} from 'semantic-ui-react';
import {Route} from "react-router";
import {Link} from "react-router-dom";

//Import Pages
import {CurrentFostersFullPage, PastFostersFullPage} from "../animal/FullPageAnimalCards";
import AnimalDetails from "../animal/AnimalDetails";
import MyDetails from "../person/MyDetails";
import Information from "../newsAndInfo/Information";
import News from "../newsAndInfo/News";
import InNeedOfFosterList from "../inneed/InNeedOfFosterList";
import FormViewer from "../forms/FormSelector";


//Define the expected props
interface MyState{
    menuFixed: boolean
}



class App extends React.Component<any, MyState> {
    state = {menuFixed:false}
    /**
     * Gets called once when the page loads
     */
    componentDidMount(){

    };


    /**
     * Function to update the state so the menu is no longer fixed
     */
    unStickTopMenu = () => this.setState({ menuFixed: false });

    /**
     * Function to update the state so the menu is  fixed
     */
    stickTopMenu = () => this.setState({ menuFixed: true });


    //Return the real div
    /**
     * Re-render eveyr time this is called
     * @returns {*}
     */
    render() {
        return (
            <div className="App">
                {/*Define the top area*/}
                <Container text style={{ marginTop: '2em' }}>
                    <Header as='h1'>Sticky Example</Header>
                    <p>
                        This example shows how to use lazy loaded images, a sticky menu, and a simple text
                        container
                    </p>
                </Container>
                {/*Provides call backs when this object leaves on certain*/}
                <Visibility
                    onBottomPassed={this.stickTopMenu}
                    onBottomVisible={this.unStickTopMenu}
                    once={false}
                >
                    {/*Inside of the visibility*/}
                    <Menu
                        borderless
                        fixed={this.state.menuFixed ? 'top' : undefined}
                        className={this.state.menuFixed ? 'fixedMenuStyle' : 'menuStyle'}
                    >
                        <Container text>
                            <Link to='/' >
                                <Menu.Item>
                                    <Image size='tiny' src={logoImage} />
                                </Menu.Item>
                            </Link>
                            <Link to='/currentfosters'><Menu.Item >Current Fosters</Menu.Item></Link>
                            <Link to='/pastfosters'><Menu.Item >Past Fosters</Menu.Item></Link>
                            <Link to='/myinfo'><Menu.Item >My Info</Menu.Item></Link>
                            <Link to='/info'><Menu.Item >Information</Menu.Item></Link>
                            <Link to='/news'><Menu.Item >News</Menu.Item></Link>

                        </Container>
                    </Menu>
                </Visibility>
                {/*The menu is over is load in based upon the router*/}
                {/*<Route exact path="/" component={MyInfo} />*/}
                <Route exact path="/currentfosters" component={CurrentFostersFullPage} />
                <Route exact path="/pastfosters" component={PastFostersFullPage} />
                <Route path="/animal/:aniId" component={AnimalDetails} />
                <Route path="/myinfo" component={MyDetails} />
                <Route exact path="/info/" component={Information} />
                <Route path="/info/:articleId" component={Information} />
                <Route exact path="/news/" component={News} />
                <Route path="/news/:articleId" component={News} />
                <Route exact path="/inneed/" component={InNeedOfFosterList} />
                <Route exact path="/forms/" component={FormViewer} />
                <Route path="/forms/:formId" component={FormViewer} />

            </div>
        );
    }

};

export default App