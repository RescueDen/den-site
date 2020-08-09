import {Icon, Image, Menu, Responsive, Sidebar, Visibility} from "semantic-ui-react";
import React, {ReactNode} from "react";
import {RouteComponentProps, withRouter} from "react-router";
import ApplicationState from "../../state/ApplicationState";
import {connect} from "react-redux";
import Permissions from "../../models/Permissions";
import NavBar, {MenuItem, MenuType} from "./NavBar";
import {isMobileOnly} from "react-device-detect";

//Income Props
interface Props extends RouteComponentProps{
    items:MenuItem[];
    desktopHeader?:ReactNode;
    desktopMode:MenuMode
    itemsRight?:MenuItem[];
}

/**
 * Different type of menu modes
 */
export enum MenuMode {
    Fixed,
    None,
    Sticky
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
     * Determine the navBar fixed
     */
    getFixedState():'top'|undefined{
        //If we are in fixed mode
        switch(this.props.desktopMode){
            case MenuMode.Fixed:
                return 'top';
            case MenuMode.Sticky:
                return  this.state.menuFixed ? 'top' : undefined;
            default:
                return undefined;
        }

    }
    /**
     * Determine the navBar fixed style
     */
    getModeStyle():'fixedMenuStyle' | 'menuStyle'{
        //If we are in fixed mode
        switch(this.props.desktopMode){
            case MenuMode.Fixed:
                return 'fixedMenuStyle';
            case MenuMode.Sticky:
                return  this.state.menuFixed ? 'fixedMenuStyle' : 'menuStyle'
            default:
                return 'menuStyle';
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
                    fixed={ this.getFixedState()}
                    className={this.getModeStyle()}
                    items={this.props.items}
                    itemsRight={this.props.itemsRight}
                    mobile={MenuType.Desktop}
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
    buildNavBarTablet(): ReactNode{
        return (
            //Wrap the header in vis bility
            <Visibility
                onBottomPassed={this.stickTopMenu}
                onBottomVisible={this.unStickTopMenu}
                once={false}
            >
                {/*Now build the simple menu*/}
                <NavBar
                    fixed={ this.getFixedState()}
                    className={this.getModeStyle()}
                    items={this.props.items}
                    itemsRight={this.props.itemsRight}
                    mobile={MenuType.Tablet}
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
                    mobile={MenuType.Mobile}
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
                    <NavBar
                        mobile={MenuType.Desktop}//Hard code mobile so that this is on top
                        reRoute={this.reRoute}
                        permissions={this.props.permissions}
                        items={[
                             {//Add in the toggle menu item
                                 name:undefined,
                                 icon:<Icon name="sidebar" />,
                                 onClick:this.toggleMobileMenu
                             }
                         ]}
                        //Add in any right items
                        itemsRight={this.props.itemsRight}
                    />

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
        if(isMobileOnly) {
            return this.buildNavBarMobile();
        }else{
            return (
                <>
                    <Responsive minWidth={Responsive.onlyComputer.minWidth}>
                        {this.props.desktopHeader}
                        {this.buildNavBarDesktop()}
                        {/*Push this down for the menu height*/}
                    </Responsive>
                    {/*Now for a tablet makeup*/}
                    <Responsive maxWidth={Responsive.onlyTablet.maxWidth} >
                        {this.props.desktopHeader}
                        {this.buildNavBarTablet()}
                        {/*Push this down for the menu height*/}
                    </Responsive>
                    <div  style={{ marginTop: '5em' }}>
                        {this.props.children}
                    </div>
                </>);
        }
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

//Wrap with router
export default withRouter(connect(mapStateToProps)(ResponsiveNavBar));

