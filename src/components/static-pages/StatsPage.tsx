import React from 'react';

import {Icon, Segment, Container, Grid, Placeholder, Label, Loader, Button} from "semantic-ui-react";
import StaticComponent from "./StaticComponent";
import {CodeResponse} from "../../models/Access";
import {staticService} from "../../services/static.service";
import {accessService} from "../../services/access.service";
import PermissionBlock from "../authentication/PermissionBlock";
import * as FileSaver from "file-saver";
import {Stats} from "../../models/Stats";
import {statsService} from "../../services/stats.service";


//Store the hub state
interface MyState{
    stats?: Stats;
    error?:string;

}


class StatsPage extends React.Component<any, MyState> {
    state={stats:undefined, error:undefined}

    /**
     * No need to keep the article in the app state.  Keep locally to allow it to be removed from mem
     */
    componentDidMount(){
        //Get the data
        statsService.getStats().then(
            //If successful html will be returned
            stats => {
                //Update the state
                this.setState({stats:stats});

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

        //If we have no statis
        if(!this.state.stats){
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
                <>
                    {JSON.stringify(this.state.stats)}
                </>

            );
        }





    }
}

export default StatsPage