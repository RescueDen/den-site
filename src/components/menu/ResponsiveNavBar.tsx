import {Icon, Menu, Responsive, Sidebar, Visibility} from "semantic-ui-react";
import React, {ReactNode} from "react";
import {RouteComponentProps, withRouter} from "react-router";
import ApplicationState from "../../state/ApplicationState";
import {connect} from "react-redux";
import Permissions from "../../models/Permissions";
import NavBar, {MenuItem} from "./NavBar";

//Income Props
interface Props extends RouteComponentProps{
    items:MenuItem[];
    desktopHeader?:ReactNode;

}

//Define the expected props
interface MyState{
    menuOpen: boolean;
    menuFixed: boolean;
    mobileMenuOpen:boolean;
}


interface StateProps{
    permissions?:Permissions
}


class ResponsiveNavBar extends React.Component<Props&StateProps, MyState> {
    state = {menuOpen:false, menuFixed:false, mobileMenuOpen:false}
    /**
     * Gets called once when the page loads
     */
    componentDidMount(){

    };


    //Define function to route
    reRoute = (to?:string) =>{
        if (to)
            this.props.history.push(to)

    }

    /**
     * Function to update the state so the menu is no longer fixed
     */
    unStickTopMenu = () => this.setState({ menuFixed: false });

    /**
     * Function to update the state so the menu is  fixed
     */
    stickTopMenu = () => this.setState({ menuFixed: true });

    /**
     * Turn the mobile menu open and closed
     */
    toggleMobileMenu = () => this.setState({ mobileMenuOpen: !this.state.mobileMenuOpen });

    /**
     * This one always closes the mobile menu
     */
    closeMobileMenu = () =>{
        if(this.state.mobileMenuOpen) {
            this.setState({mobileMenuOpen: false});
        }
    }


    /**
     * Build desktop Menu
     */
    buildNavBarDesktop(): ReactNode{
        return (
            //Wrap the header in vis bility
            <Visibility
                onBottomPassed={this.stickTopMenu}
                onBottomVisible={this.unStickTopMenu}
                once={false}
            >
                {/*Now build the simple menu*/}
                <NavBar
                    fixed={this.state.menuFixed ? 'top' : undefined}
                    className={this.state.menuFixed ? 'fixedMenuStyle' : 'menuStyle'}
                    items={this.props.items}
                    mobile={false}
                    permissions={this.props.permissions}
                    reRoute={this.reRoute}
                    pathname={this.props.location.pathname}
                />
            </Visibility>
        );

    }

    /**
     * Build desktop Menu
     */
    buildNavBarMobile(): ReactNode{
        return (
            //Allow the menu to pop out from the side
            <Sidebar.Pushable>
                {/*Setup the side bar.  This is basically the NavBar*/}
                <Sidebar
                    as={NavBar}
                    animation="overlay"
                    icon={"labeled"}
                    items={this.props.items}
                    vertical
                    visible={this.state.mobileMenuOpen}
                    mobile={true}
                    permissions={this.props.permissions}
                    reRoute={this.reRoute}
                    pathname={this.props.location.pathname}
                />

                {/*Now add the content to put over this*/}
                <Sidebar.Pusher
                    style={{ minHeight: "100vh" }}
                    dimmed={this.state.mobileMenuOpen}
                    onClick={this.closeMobileMenu}
                >
                    {/*Now add an always vis menu to show/hide the real menu*/}
                    <Menu>
                        <Menu.Item onClick={this.toggleMobileMenu}>
                            <Icon name="sidebar" />
                        </Menu.Item>

                    </Menu>
                    {this.props.children}
                </Sidebar.Pusher>


            </Sidebar.Pushable>
        );

    }



    /**
     * Re-render eveyr time this is called
     * @returns {*}
     */
    render() {

        return (
            <div>
                {/*//Now a different menu based upon mobile or not*/}
                <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                    {this.props.desktopHeader}
                    {this.buildNavBarDesktop()}
                    {this.props.children}

                </Responsive>
                {/*Now for the mobile only*/}
                <Responsive {...Responsive.onlyMobile}>
                    {this.buildNavBarMobile()}
                </Responsive>

            </div>


        );
    }

};

/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState,myProps:Props ):StateProps&Props {
    return {
        ...myProps,
        permissions : state.authentication.permissions
    };
}

//Wrap with state connect
const ResponsiveMenuState = connect(
    mapStateToProps
)(ResponsiveNavBar);

//Wrap with router
export default withRouter<Props>(props =>
    <ResponsiveMenuState {...props}/>);

