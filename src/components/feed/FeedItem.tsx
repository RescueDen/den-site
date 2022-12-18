import React from 'react';
import {Feed, Icon, Image, Modal} from "semantic-ui-react";
import {FeedItemData} from "../../models/Feed";
import {getTimeSince} from "../../utils/date-formater";


//Define the expected props
interface Props {
    //Define the props we expect
    data: FeedItemData
}

const FeedItem = (props: Props) => {

    //Determine the label
    let label = undefined

    //Select a label pased upon source
    switch (props.data.source) {
        case "instagram":
            label = <Icon name='instagram'/>;
            break;
        case "asm":
            label = <Icon name='paw'/>;
            break;
        case "achievement":
            label = <Icon name='certificate'/>;
            break;
        case "news":
            label = <Icon name='newspaper outline'/>;
            break;
    }

    //Add an external link
    let link = undefined


    if (props.data.linkurl) {
        link = <a href={props.data.linkurl}> See more at {label}</a>
    }


    return (
        //Wrap in a modal
        <Modal trigger={
            <Feed.Event>
                <Feed.Label>
                    {label}
                </Feed.Label>
                <Feed.Content>
                    <Feed.Summary>
                        {props.data.name}
                        <Feed.Date>{getTimeSince(props.data.date)} ago</Feed.Date>
                    </Feed.Summary>
                    {props.data.preview &&
                        <Feed.Extra text>
                            {props.data.preview}
                        </Feed.Extra>
                    }
                    <Feed.Extra images>
                        <img src={props.data.thumbnailurl}/>
                    </Feed.Extra>
                </Feed.Content>
            </Feed.Event>
        } closeIcon>
            {/*Show the full page info*/}
            {props.data.name &&
                <Modal.Header>{label}{props.data.name}</Modal.Header>
            }

            <Modal.Content image scrolling>
                <Image wrapped size='medium' src={props.data.imgurl}/>
                <Modal.Description>
                    <p>{props.data.preview}</p>
                    {link}
                </Modal.Description>
            </Modal.Content>
        </Modal>


    );
}

export default FeedItem