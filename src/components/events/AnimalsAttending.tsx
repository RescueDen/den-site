import React from 'react';
import JSX from 'react';

import {
    Icon, Responsive, Segment,
    Table
} from "semantic-ui-react";

import {ExistingSignUps} from "../../models/SignUp";
import {eventsService} from "../../services/events.service";
import CawsAnimal, {findShelterIds} from "../../models/CawsAnimal";
import {animalService} from "../../services/animal.service";
import AnimalList from "../animal/SearchableAnimalListCompact";
import SearchableAnimalListCompact from "../animal/SearchableAnimalListCompact";

//Define the expected props
interface LinkProps  {

    publicColumns?: { [id: string]: any[]; }
}

//Define the expected props
interface MyState  {
    animals:number[];
    error?:string;
}



/**
 * Show the details of a single up coming event
 */
class AnimalsAttending extends React.Component<LinkProps,MyState> {
    state={animals:[] as number[], error:undefined};

    /**
     * Gets called once when the page loads.  Tell the system to download that animal
     */
    componentDidMount() {
       this.updateIdFromShelterCodes()

    };

    /**
     * Check to see if the props changed
     * @param prevProps
     */
    componentDidUpdate(prevProps:LinkProps) {
        // Typical usage (don't forget to compare props):
        if (JSON.stringify(this.props.publicColumns) !== JSON.stringify(prevProps.publicColumns)) {
            this.updateIdFromShelterCodes();
        }
    }

    //Update the id state from shelter code
    updateIdFromShelterCodes = () =>{
        //Build the list of shelter codes
        let shelterCodes = [] as string[];

        //Get the columns
        const publicColumns = this.props.publicColumns;

        //Check to see if need to download info
        if (publicColumns) {
            Object.keys(publicColumns).forEach(function (colName) {
                shelterCodes.push(...findShelterIds(publicColumns[colName]));


            });
        }

        //Get the ides from the shelter coes
        animalService.getAnimalsFromCodes(shelterCodes).then(
            //If successful html will be returned
            list => {
                //Update the state
                this.setState({animals: list});


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




    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {

        //Return the
        if(this.state.animals.length > 0) {
            return (
                <Segment>
                    <SearchableAnimalListCompact aniLink="/animal" title="Other Animals Attending"
                                                 animalIdList={this.state.animals}/>
                    <p>{this.state.error}</p>
                </Segment>


            );
        }else{
            return null
        }



    }
};

export default AnimalsAttending;