//Define the expected props
import {AchievementData} from "../../../models/Achievements";
import * as React from "react";
import {Grid, Placeholder} from "semantic-ui-react";
import AchievementBadge from "./AchievementBadge";

interface LinkProps {
    //Define the props we expect
    achievements?: AchievementData[];

}


/**
 * Show a list of achievement badges
 * @param myProps
 * @constructor
 */
const AchievementList = (myProps: LinkProps) => {

    if (myProps.achievements) {
        return (
            <Grid centered doubling columns={5}>
                {myProps.achievements.map(ach => {
                    return (
                        <Grid.Column textAlign='center' key={ach.id}>
                            <AchievementBadge achievement={ach}/>
                        </Grid.Column>
                    );
                })}
            </Grid>
        );
    } else {
        return (
            <Grid centered doubling columns={5}>
                <Grid.Column textAlign='center' key={"placeHolder"}>
                    <Placeholder size='tiny'>
                        <Placeholder.Image/>
                    </Placeholder>
                </Grid.Column>
            </Grid>
        );
    }

}

export default AchievementList