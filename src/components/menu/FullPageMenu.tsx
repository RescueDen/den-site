import {
    Button,
    Card,
    Header,
    Icon,
    Image,
    List,
    ListItem,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility
} from "semantic-ui-react";
import React, {ReactNode} from "react";
import {RouteComponentProps, withRouter} from "react-router";
import ApplicationState from "../../state/ApplicationState";
import {connect} from "react-redux";
import Permissions from "../../models/Permissions";
import NavBar, {MenuItem} from "./NavBar";
import logoImage from "../../assets/logos/xCAWS_logo_sideways.png";
import {leftMenuItems, rightMenuItems} from "../app/MenuItems";

//Income Props
interface Props extends RouteComponentProps{

}


interface StateProps{
    permissions?:Permissions
}


class FullPageMenu extends React.Component<Props&StateProps> {
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
     * Build the menu item
     */
    buildMenuItem(item:MenuItem, list: ReactNode[]){

        //See if we should bother drawing the item
        if(item.reqPerm && !(this.props.permissions && this.props.permissions.allowed(item.reqPerm)))
            return null;

        //Now see if we need to build a drop down menu
        if(item.subItems){
            // return this.buildSubMenu(item, mobile);
            item.subItems.forEach(item => this.buildMenuItem(item, list))

        }else{

            //See if we should do anything with the on click
            let linkTo = undefined;
            if(item.to)
                linkTo = () => this.reRoute(item.to)

            //Just return this item
            list.push(
                <Button onClick={linkTo} >
                    {item.icon}
                    {item.name}
                </Button>
            );
        }

    }

    render() {

        //Get all of the menu items
        const items = [...leftMenuItems, ...rightMenuItems];

        //Build the list
        let list = [] as ReactNode[];

        //Now build the list
        items.forEach(item => this.buildMenuItem(item, list));


        return (
            <div>
                {list}
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
export default connect(
    mapStateToProps
)(FullPageMenu);

