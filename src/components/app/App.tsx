import React from 'react';
import logoImage from '../../assets/logos/xCAWS_logo_sideways.png';

// import routes
import {Container, Image, Visibility, Header, Menu} from 'semantic-ui-react';
import {Route} from "react-router";
import {Link} from "react-router-dom";

//Import Pages
import MyInfo from "./myinfo/MyInfo";


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
                            {/*<Link to='/calc'><Menu.Item >Calc List</Menu.Item></Link>*/}

                        </Container>
                    </Menu>
                </Visibility>
                {/*The menu is over is load in based upon the router*/}
                <Container text>
                    <Route exact path="/" component={MyInfo} />

                </Container>
            </div>
        );
    }

};

export default App