import React from 'react';
import {Grid, Label} from "semantic-ui-react";


const Version = () => {
    return <Grid>
        <Grid.Column textAlign="center">
            <Label size="large">RescueDen Version {process.env.REACT_APP_VERSION}</Label>
        </Grid.Column>
    </Grid>
};

export default Version