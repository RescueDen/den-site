import {Dropdown, Icon, Menu, Popup} from "semantic-ui-react";
import React, {ReactNode} from "react";
import Permissions from "../../models/Permissions";
import {StrictMenuProps} from "semantic-ui-react/dist/commonjs/collections/Menu";


//Income Props
interface Props extends StrictMenuProps {
    items: MenuItem[];
    itemsRight?: MenuItem[];
    mobile: MenuType;
    permissions?: Permissions;
    pathname?: string;
    reRoute: (to?: string) => any;
}


//Store the different menu types
export enum MenuType {
    Mobile,
    Tablet,
    Desktop
}

/**
 * Simple struct used to pass in item vars
 */
export interface MenuItem {
    name: any
    to?: string
    reqPerm?: string
    subItems?: MenuItem[]
    icon?: ReactNode
    onClick?: () => any;

}

class NavBar extends React.Component<Props> {
    /**
     * Build the menu item
     */
    buildMenuItem(item: MenuItem, mobile: MenuType, MenuItem: React.ComponentClass<any>, subMenu?: boolean): ReactNode {
        //See if we should bother drawing the item
        if (item.reqPerm && !(this.props.permissions && this.props.permissions.allowed(item.reqPerm)))
            return null;


        //Get the menu item
        let menuItem;

        //Now see if we need to build a drop down menu
        if (item.subItems) {
            menuItem = this.buildSubMenu(item, mobile);

        } else {
            //Determine if the link is active
            //Determine if it is active
            const active = this.props.pathname ? (this.props.pathname === item.to) : false;

            //See if we should do anything with the on click
            let linkTo = undefined;
            if (item.to)
                linkTo = () => this.props.reRoute(item.to)

            //Just return this item
            menuItem = (
                <MenuItem
                    key={item.name + (item.icon ? item.icon.toString() : "")}
                    active={active}
                    onClick={item.onClick ? item.onClick : linkTo}//If there is an onclick use it, otherwise link
                >
                    {
                        mobile === MenuType.Mobile && item.name === undefined && item.icon
                    }
                    {
                        mobile === MenuType.Mobile && item.name !== undefined && item.name
                    }

                    {/*Now for the name*/}
                    {
                        (mobile === MenuType.Desktop || (mobile === MenuType.Tablet && subMenu)) &&
                        <>{item.icon} {item.name}</>
                    }
                    {/*Now output the item icon only if it is there*/
                        mobile === MenuType.Tablet && !subMenu && item.icon !== undefined && item.icon
                    }
                    {/*Now output the item name if there is no icon*/
                        mobile === MenuType.Tablet && !subMenu && item.icon === undefined && item.name
                    }
                </MenuItem>
            )
        }

        //See if we should use a tool tip
        if (mobile === MenuType.Tablet && !subMenu && item.icon !== undefined) {
            return (
                <Popup
                    mouseEnterDelay={1250}
                    trigger={
                        menuItem
                    }
                    content={item.name}
                    inverted
                />
            );
        } else {
            return menuItem
        }

    }

    /**
     * Build a drop-down menu item
     * @param item
     * @param mobile
     */
    buildSubMenu(item: MenuItem, mobile: MenuType) {
        //Determine if the link is active
        //Determine if it is active
        const active = this.props.pathname ? (this.props.pathname === item.to) : false;

        //See if we should do anything with the on click
        let linkTo = undefined;
        if (item.to)
            linkTo = () => this.props.reRoute(item.to)

        //Draw the menu if it is mobile or not
        if (mobile === MenuType.Mobile) {
            return (
                <Menu.Item key={item.name + item.icon} active={active}>
                    {/*Now the icon if here*/}
                    {item.icon}
                    {/*Now for the name*/}
                    {item.name}
                    <Menu.Menu>
                        {item.subItems && item.subItems.map(item => this.buildMenuItem(item, mobile, Menu.Item, true))}
                    </Menu.Menu>
                </Menu.Item>
            );

        } else if (mobile === MenuType.Tablet) {
            //Desktop mode
            return (
                <Menu.Item key={item.name + item.icon}>
                    {/*Now the icon if here*/}
                    {item.icon}
                    {/*Now for the name*/}
                    <Dropdown key={item.name}
                              text={item.icon === undefined ? item.name : undefined}
                              onClick={item.onClick ? item.onClick : linkTo}//If there is an onclick use it, otherwise link
                              icon={item.name ? undefined : <Icon name='ellipsis horizontal'/>}
                    >
                        <Dropdown.Menu>
                            {/*Now the icon if here*/}
                            {item.subItems && item.subItems.map(item => this.buildMenuItem(item, mobile, Dropdown.Item, true))}

                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            );
        } else {
            //Desktop mode
            return (
                <Menu.Item key={item.name + item.icon}>
                    {/*Now the icon if here*/}
                    {item.icon}
                    {/*Now for the name*/}
                    <Dropdown key={item.name}
                              text={item.name}
                              onClick={item.onClick ? item.onClick : linkTo}//If there is an onclick use it, otherwise link
                              icon={item.name ? undefined : <Icon name='ellipsis horizontal'/>}
                    >
                        <Dropdown.Menu>
                            {/*Now the icon if here*/}
                            {item.subItems && item.subItems.map(item => this.buildMenuItem(item, mobile, Dropdown.Item, true))}

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
        const {items, itemsRight, reRoute, mobile, ...rest} = this.props;


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

}


//Wrap with router
export default NavBar;

