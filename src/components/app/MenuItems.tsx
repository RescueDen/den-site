import {Icon, Image} from "semantic-ui-react";
import logoImage from "../../assets/logos/xCAWS_logo_sideways.png";
import logoIcon from "../../assets/logos/xCAWS_logoBW_noText.png";
import React from "react";


export const leftMenuItems = [
    //The logo
    {
        name: <Image size='tiny' src={logoImage}/>,
        to:'/welcome'
    },
    {
        name: "Getting Started",
        to: '/gettingstarted',
        icon: <Icon name='check square outline'/>
    },
    {//Now foster info
        name: "Learn",
        icon: <Icon name='info circle'/>,
        reqPerm: 'get_news',
        subItems: [
            {
                name: "News",
                to: '/news',
                reqPerm: 'get_news',
                icon: <Icon name='newspaper outline'/>
            },
            {
                name: "Info",
                to: '/info',
                reqPerm: 'get_info',
                icon: <Icon name='tv'/>
            },
            {
                name: "Courses",
                to: '/courses',
                reqPerm: "get_courses",
                icon: <Icon name='university'/>
            }
        ]

    },
    {//Now foster info
        name: "Fosters",
        reqPerm: "get_animal_info",
        icon: <Icon name='paw'/>,
        subItems: [
            {
                name: "In Need",
                to: '/inneed',
            },
            {
                name: "Your Current Fosters",
                to: '/currentfosters',
            },
            {
                name: "Your Past Fosters",
                to: '/pastfosters',
            }
        ]

    },
    {//Show all of the forms
        name: "Forms",
        to: '/forms',
        icon: <Icon name='edit outline'/>
    },
    {//Show all of the forms
        name: "Events & RSVPs",
        to: '/events',
        icon: <Icon name='calendar alternate outline'/>
    },
    {//Now inside caws
        name: "Inside CAWS",
        reqPerm: "inside_caws",
        icon: <Icon name='bullseye'/>,
        subItems: [
            {
                name: "Inside Documentation",
                to: '/inside',
                reqPerm: "inside_caws",
                icon: <Icon name='bullseye'/>
            },
            {
                name: "Kennel Card Generator",
                to: '/kennelcard',
                icon:<Icon name='id card outline'/>,

            }
        ]

    },
    {
        name: "Achievements",
        to: '/achievements',
        icon: <Icon name='certificate'/>
    },
    {//Show all of the forms
        name: "CAWS Hub",
        to: '/cawshub',
        reqPerm: "access_hub",
        icon: <Icon name='building'/>
    },

];

export const rightMenuItems = [
    {//Now foster info
        name:<Icon size='large' name='user circle' />,
        subItems:[
            {//Also show my info
                name:"My Info",
                to:'/myinfo',
                icon:<Icon name='user outline' />
            },
            {
                name:"Logging",
                to:'/logging',
                reqPerm:"volunteer_logging",
                icon:<Icon name='history' />
            },
            {
                name:"Supplies",
                to:'/supplies',
                reqPerm:"foster_supplies",
                icon:<Icon name='shopping basket' />
            },
            {
                name:"",

            },
            {//Show all of the forms
                name:"Help",
                to:'/help',
                icon:<Icon name='help circle' />
            },
            {//Lower the User to change preferences
                name:"Preferences",
                to:'/preferences',
                icon:<Icon name='settings' />
            },
            {//Show all of the forms
                name:"Log out",
                to:'/login',
                icon:<Icon name='log out' />
            }
        ]

    }
    ];