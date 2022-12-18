import React from 'react';
import {Icon} from "semantic-ui-react";

//Add in the props
interface IncomingProps {
    value: number;
}

const NonEditCheck = (myProps: IncomingProps) => {

    switch (myProps.value) {
        case 0:
            return <Icon name='square outline'/>;
        case 1:
            return <Icon name='check square outline'/>;
        default:
            return null
    }


};

export default NonEditCheck