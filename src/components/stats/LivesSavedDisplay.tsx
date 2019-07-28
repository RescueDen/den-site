import React from 'react';

import {Icon, Segment, Container, Grid, Placeholder, Label, Loader, Button, Responsive} from "semantic-ui-react";
import {AdoptionStat, Stats} from "../../models/Stats";
import {ResponsiveOnUpdateData} from "semantic-ui-react/dist/commonjs/addons/Responsive";
import {statsService} from "../../services/stats.service"
import LivesSavedD3 from "./LivesSavedD3";
//Pass in the year

interface MyProps{
    year: number;

}

//Store the hub state
interface MyState{
    //Keep the internal state of options
    adoptions?: AdoptionStat[];
    error?:string;


    //Keep the width and height
    width:number;
    height:number;

}


class LivesSavedDisplay extends React.Component<MyProps, MyState> {
    state={adoptions:undefined, error:undefined, width:1, height:600}

    constructor(props:MyProps) {
        super(props);
    }

    /**
     * no need to keep adoptions by year in state
     */
    componentDidMount() {
        //Get the data
        statsService.getAdoptionsByYear(this.props.year).then(
            //If successful html will be returned
            adoptionsReturn => {
                //Update the state
                this.setState({adoptions: adoptionsReturn});

            },
            //If there was an error, show to the user
            errorResponse => {
                //Dispatch the error
                try {
                    this.setState({error: errorResponse.response.data.message});
                } catch (e) {
                    this.setState({error: errorResponse.toString()});

                }

            }
        );
    }
    //Update the width
    updateWidth = (event: React.SyntheticEvent<HTMLElement>, data: ResponsiveOnUpdateData) =>{
        this.setState({width:data.width});
    }


    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {

        return (
            <Responsive fireOnMount onUpdate={this.updateWidth}>
                {this.state.adoptions &&
                    <LivesSavedD3
                        key={this.props.year + this.state.width + this.state.height}
                        width={this.state.width}
                        height={this.state.height}
                        adoptions={this.state.adoptions!}
                    />
                }

            </Responsive>

        );


    }


}

export default LivesSavedDisplay;

// {/*<Segment>*/}
// {/*        <div ref={this.myRef} />;*/}
// {/*        /!*{JSON.stringify(this.state.adoptions)}*!/*/}
// {/*        /!*{this.state.error &&*!/*/}
// {/*        /!*<p>{this.state.error}</p>*!/*/}
// {/*        }*/}
// {/*    </Segment>*/}