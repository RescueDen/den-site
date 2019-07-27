import React from 'react';

import {Icon, Segment, Container, Grid, Placeholder, Label, Loader, Button} from "semantic-ui-react";
import {AdoptionStat, Stats} from "../../models/Stats";
import {statsService} from "../../services/stats.service";


//Pass in the year
interface MyProps{
    year: number;
}

//Store the hub state
interface MyState{
    //Keep the internal state of options
    adoptions?: AdoptionStat[];
    error?:string;

}


class LivesSavedDisplay extends React.Component<MyProps, MyState> {
    state={adoptions:undefined, error:undefined}

    /**
     * No need to keep the article in the app state.  Keep locally to allow it to be removed from mem
     */
    componentDidMount(){
        //Get the data
        statsService.getAdoptionsByYear(this.props.year).then(
            //If successful html will be returned
            adoptionsReturn => {
                //Update the state
                this.setState({adoptions:adoptionsReturn});

            },
            //If there was an error, show to the user
            errorResponse => {
                //Dispatch the error
                try {
                    this.setState({error:errorResponse.response.data.message});
                }catch(e){
                    this.setState({error:errorResponse.toString()});

                }

            }
        )
    };
    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {

        //If we have no adoptions
        if(!this.state.adoptions){
           return(
               <Segment>
                    <Loader active />

                    <Placeholder.Header image>
                       <Placeholder.Line />
                       <Placeholder.Line />
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                       <Placeholder.Line />
                       <Placeholder.Line />
                       <Placeholder.Line />
                       <Placeholder.Line />
                    </Placeholder.Paragraph>
                </Segment>
           )
        }else{
            return(
                <Segment>
                    {JSON.stringify(this.state.adoptions)}
                    {this.state.error &&
                    <p>{this.state.error}</p>
                    }
                </Segment>

            );
        }





    }
}

export default LivesSavedDisplay;