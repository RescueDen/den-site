import React from 'react';

import {Button, Container, Grid, Icon, Label, Segment} from "semantic-ui-react";
import StaticComponent from "./StaticComponent";
import {CodeResponse} from "../../models/Access";
import {accessService} from "../../services/access.service";
import PermissionBlock from "../authentication/PermissionBlock";
import * as FileSaver from "file-saver";
import ReloadingImage from "../app/ReloadingImage";


//Store the hub state
interface MyState {
    code?: CodeResponse;
    error?: string;

}

class CAWSHub extends React.Component<any, MyState> {
    state = {code: undefined, error: undefined}

    //Download the log
    downloadLog = () => {
        //Get the data
        accessService.downloadLog("hub").then(//If successful html will be returned
            blob => {
                //Update the state
                FileSaver.saveAs(blob, "hubLog.txt");
            }, //If there was an error, show to the user
            errorResponse => {
                //Dispatch the error
                try {
                    this.setState({error: errorResponse.response.data.message});
                } catch (e) {
                    this.setState({error: errorResponse.toString()});

                }

            })


    }

    /**
     * No need to keep the article in the app state.  Keep locally to allow it to be removed from mem
     */
    componentDidMount() {
        //Now set it
        accessService.getCode("hub")
            //When it comes back use it
            .then(//If successful html will be returned
                codeInfo => {
                    //Update the state
                    this.setState({code: codeInfo})
                }, //If there was an error, show to the user
                errorResponse => {
                    //Dispatch the error
                    try {
                        this.setState({error: errorResponse.response.data.message});
                    } catch (e) {
                        this.setState({error: errorResponse.toString()});

                    }

                });
    };

    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {

        //Get teh current code
        let code: any = <Icon loading name='spinner'/>

        //If the code is defined set it
        if (this.state.code) {
            const codeObj = this.state.code! as CodeResponse
            code = codeObj.code;
        }


        return (<>
                <Grid stackable columns={2}>
                    <Grid.Column>
                        <Container>
                            <Segment>
                                <StaticComponent pagePath={"cawsHub"} public={false}/>

                                {/*/!*Add a lock symbol*!/*/}
                                {/*<div style={{"textAlign": "center"}}>*/}
                                {/*    <Label size='huge'>*/}
                                {/*        <Icon name='lock'/>*/}
                                {/*        /!*{code}*!/*/}
                                {/*        3794*/}
                                {/*    </Label>*/}
                                {/*</div>*/}

                                {/*Display an error if needed*/}
                                {this.state.error}


                            </Segment>
                            {/*For authorized users, give they access to the log*/}
                            <PermissionBlock reqPerm={"access_logs"}>
                                <Button onClick={this.downloadLog}>
                                    Download Access Logs for the Hub
                                </Button>
                            </PermissionBlock>
                        </Container>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.7821053920884!2d-111.91274778460368!3d40.76681694219721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8752f4f8cd2f9b73%3A0xaa1825c24ccedc4b!2sUtah+Arts+Hub!5e0!3m2!1sen!2sus!4v1549217795237"
                                width="100%" height="300" frameBorder="0" style={{"border": 0}}
                                allowFullScreen></iframe>
                        </Segment>
                    </Grid.Column>
                </Grid>

                {/*Show the current supplies*/}
                <Segment>
                    <StaticComponent pagePath={"cawsSupplies"} public={false}/>
                </Segment>

            </>

        );


    }
}

export default CAWSHub