import {Icon, Menu, MenuItemProps, MenuProps, Responsive, Sidebar, Visibility} from "semantic-ui-react";
import React, {ReactNode} from "react";
import {RouteComponentProps, withRouter} from "react-router";
import ApplicationState from "../../state/ApplicationState";
import {connect} from "react-redux";
import Permissions from "../../models/Permissions";
import {Dropdown} from "semantic-ui-react";
import {StrictMenuProps} from "semantic-ui-react/dist/commonjs/collections/Menu";


//Income Props
interface Props extends  StrictMenuProps{
    items:MenuItem[];
    itemsRight?:MenuItem[];
    mobile: boolean;
    permissions?:Permissions;
    pathname?:string;
    reRoute : (to?:string) => any;
}



/**
 * Simple struct used to pass in item vars
 */
export interface MenuItem {
    name:any
    to?:string
    reqPerm?:string
    subItems?:MenuItem[]
    icon?:ReactNode
    onClick?:()=>any;

}



class NavBar extends React.Component<Props> {


    /**
     * Build the menu item
     */
    buildMenuItem(item:MenuItem, mobile:boolean, MenuItem:React.ComponentClass<any>):ReactNode{

        //See if we should bother drawing the item
        if(item.reqPerm && !(this.props.permissions && this.props.permissions.allowed(item.reqPerm)))
            return null;

        //Now see if we need to build a drop down menu
        if(item.subItems){
            return this.buildSubMenu(item, mobile);

        }else{
            //Determine if the link is active
            //Determine if it is active
            const active = this.props.pathname? (this.props.pathname == item.to) : false;

            //See if we should do anything with the on click
            let linkTo = undefined;
            if(item.to)
                linkTo = () => this.props.reRoute(item.to)

            //Just return this item
            return (
                <MenuItem
                    key={item.name+(item.icon?item.icon.toString():"")}
                    active={active}
                    onClick={item.onClick? item.onClick :linkTo}//If there is an onclick use it, otherwise link
                >
                    {/*Now the icon if here*/}
                    {item.icon}
                    {/*Now for the name*/}
                    {item.name}
                </MenuItem>
            );
        }

    }

    /**
     * Build a drop down menu item
     * @param item
     */
    buildSubMenu(item:MenuItem, mobile:boolean){
        //Determine if the link is active
        //Determine if it is active
        const active = this.props.pathname? (this.props.pathname == item.to) : false;

        //See if we should do anything with the on click
        let linkTo = undefined;
        if(item.to)
            linkTo = () => this.props.reRoute(item.to)

        //Draw the menu if it is mobile or not
        if(mobile){
            return (
                <Menu.Item key={item.name} active={active}>
                    {/*Now the icon if here*/}
                    {item.icon}
                    {/*Now for the name*/}
                    {item.name}
                    <Menu.Menu>
                        {item.subItems && item.subItems.map(item => this.buildMenuItem(item, mobile, Menu.Item))}
                    </Menu.Menu>
                </Menu.Item>
            );

        }else {
            //Desktop mode
            return (
                <Menu.Item key={item.name} >
                    {/*Now the icon if here*/}
                    {item.icon}
                    {/*Now for the name*/}
                    <Dropdown key={item.name}
                              text={item.name}
                              onClick={item.onClick? item.onClick :linkTo}//If there is an onclick use it, otherwise link
                    >
                        <Dropdown.Menu>
                            {/*Now the icon if here*/}
                            {item.subItems && item.subItems.map(item => this.buildMenuItem(item, mobile, Dropdown.Item))}

                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            );
        }

    }




    /**
     * Re-render eveyr time this is called
     * @returns {*}
     */
    render() {
        //Don't pass the items into the menu that it doesn't want!
        const {items,itemsRight, reRoute,mobile, ...rest} = this.props;


        return (
            <Menu {...rest} >
                {/*Draw the normal menus*/}
                {items && items.map(item => {
                    return this.buildMenuItem(item, this.props.mobile, Menu.Item)
                }
                )}

                {/*Draw the ones on the right*/}
                {itemsRight &&
                <Menu.Menu position='right'>
                    {/*Add each item*/}
                    {itemsRight.map(item => this.buildMenuItem(item, this.props.mobile, Menu.Item))}

                </Menu.Menu>

                }

            </Menu>

        );
    }

};


//Wrap with router
export default NavBar;

