import React from 'react';

import {Container, Grid, Segment} from "semantic-ui-react";
import StaticComponent from "./StaticComponent";
import TheFeed from "../feed/TheFeed";
import EventsList from "../events/EventsList";


class Welcome extends React.Component<any> {
    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        return(
            <>
                <Grid stackable columns={2}>
                    <Grid.Column>
                        <Container>
                            <Segment>
                                <StaticComponent pagePath={"welcome"} public={false}/>
                            </Segment>
                            <EventsList/>
                        </Container>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                            <TheFeed/>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </>
        );


    }
}

export default Welcome