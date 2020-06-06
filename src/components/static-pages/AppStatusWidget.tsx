import React from "react";
import {Header, Icon, List, Segment, Step} from "semantic-ui-react";
import ShelterUser from "../../models/ShelterUser";
import {SemanticICONS} from "semantic-ui-react/dist/commonjs/generic";

//Define the expected props
interface AppStatusProps  {
    //Define the props we expect
    name:string;
    icon:any
    user:ShelterUser;
    status: AppStatus[];
}

//Define the expected props
interface AppStatus {
    name:string;
    comment?:string;
    tag?:string;
    show:any;
    icon:SemanticICONS;

}



/**
 * Provides a quick summary of that person
 * @param myProps
 * @constructor
 */
const AppStatusWidget = (props:AppStatusProps) => {

    //Build each component
    const components: JSX.Element[] = [];
    const listComponents: JSX.Element[] = [];

    //the details
    components.push(
        <Header as='h3' key={'header'+props.name}>
            {props.icon}
            <Header.Content>{props.name}</Header.Content>
        </Header>

    )

    //Store the highest status
    let highestStatus = props.status[0];

    //Keep a record of active status
    let active:boolean[] = new Array(props.status.length);

    //Now fill out the active tag
    for(let i =0; i < props.status.length; i++) {
        const tag = props.status[i].tag;

        //check to see if this is an active tag
        if (tag && props.user.hasTag(tag)) {
            highestStatus = props.status[i];
            active[i] = true;
        }
    }

    //Determine what role show
    for(let i =0; i < props.status.length; i++) {
        //Now if any of them past this are active
        let thisActive = false;
        for(let ii = i ; ii < props.status.length; ii++){
            if(active[ii])
                thisActive = true;
        }

        //Now add the item
        // listComponents.push(
        //     <List.Item key={i}>
        //         {thisActive &&
        //         <List.Icon name='check circle outline'/>
        //         }
        //         {!thisActive &&
        //         <List.Icon name='circle outline'/>
        //         }
        //         <List.Content>{props.status[i].name}</List.Content>
        //     </List.Item>
        // )
        listComponents.push(
            <Step disabled={!thisActive} active={highestStatus==props.status[i]}>
                <Icon name={props.status[i].icon} />
                <Step.Content>
                    <Step.Title>{props.status[i].name}</Step.Title>
                    <Step.Description>{props.status[i].comment}</Step.Description>
                </Step.Content>
            </Step>
        )

    }


    //Now add the list items
    components.push(
        <Step.Group>
          {listComponents}
        </Step.Group>
    );

    //Now show the next item
    components.push(
        <Header key={'nextSteps'} as='h4'>Next Step to {props.name}</Header>
    );
    components.push(highestStatus.show);


    return (
        <Segment style={{textAlign:"center"}}>
            {components}
        </Segment>
    );
}


//https://stackoverflow.com/questions/48292707/strongly-typing-the-react-redux-connect-with-typescript
export default AppStatusWidget