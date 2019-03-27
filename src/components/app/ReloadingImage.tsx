import React, { Component } from 'react';

import {Icon, Image, Label} from "semantic-ui-react";


//Define the expected props
interface LinkProps {
    //Define the props we expect
    src: string;
    interval: number;

}


//Define the expected props
interface State {
    //Define the props we expect
    random: number;

}

class ReloadingImage extends Component<LinkProps> {
    state = {random:Math.random()}

    //Store an interval
    interval : NodeJS.Timeout | undefined;

    /**
     * Gets called once when the page loads.  Tell the system to download or update the summary
     */
    componentDidMount(){
        this.interval = setInterval(() => this.setState({ random: Math.random() }), this.props.interval);

    };

    componentWillUnmount() {
        if (this.interval){
            clearInterval(this.interval);
        }
    }




    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        return (
            <>
            <Image
                /*label={
                    <Label color='green' ribbon='right'>
                        <Icon loading name='spinner' />
                        Hub View
                    </Label>
                }*/

                fluid src={`${this.props.src}/${this.state.random}`}/>
                </>

        );

    }


}

export default ReloadingImage;