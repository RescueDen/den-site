
//Define the expected props
import {AchievementData} from "../../../models/Achievements";
import * as React from "react";
import {Header, Image, Label, Popup, Segment} from "semantic-ui-react";
import {formatDate} from "../../../utils/date-formater";
import {Link} from "react-router-dom";

interface LinkProps  {
    //Define the props we expect
    achievement:AchievementData;

}


/**
 * Show an individual achievement badge
 * @param myProps
 * @constructor
 */
const AchievementBadge =  (myProps:LinkProps) => {

    //Get the content
    const label = (
        <Header as='h5'>
            <Header.Content>
                {myProps.achievement.name}
                {myProps.achievement.date &&
                <Header.Subheader>{formatDate(myProps.achievement.date)}</Header.Subheader>
                }
            </Header.Content>
        </Header>
    );

    return (
        <Popup
            inverted
            position='top center'
            trigger={
            <Link to={`/achievements/${myProps.achievement.id}`}>
                <Image centered size='tiny'
                       src={myProps.achievement.badgeUrl}
                />
                <Label  basic pointing>{label}</Label>
            </Link>

        }>
            <Popup.Header>{myProps.achievement.name}</Popup.Header>
            <Popup.Content>
                {myProps.achievement.description}
            </Popup.Content>
        </Popup>

    );

}

export default AchievementBadge