import React from 'react';
import CawsAnimal from "../../../models/ShelterAnimal";
import {Header, Segment, Table, Image, Icon} from "semantic-ui-react";
import {SemanticICONS} from "semantic-ui-react/dist/commonjs/generic";
import {formatDate} from "../../../utils/date-formater";

//Add in the props
interface Props {
    animal:CawsAnimal;
    hideHeader?:boolean;
}


const AnimalVaxxHistory =  (myProps:Props) =>{


    return (
        <Segment>
            {!myProps.hideHeader &&
                < Header as = "h2" > {myProps.animal.data.name}'s Vaccine History</Header>
            }

            <Table basic='very' style={{margin:"auto"}} celled className={"unstackable"}>
                {/*Add the header info*/}
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Date Required</th>
                        <th>Date Given</th>
                        <th>Vet</th>
                        <th>Comments</th>
                    </tr>
                </thead>
                <Table.Body>

                {/*//Get the vaccine history in order*/}
                {myProps.animal.getVaccineHistoryInOrder().map(vax =>{
                    return (
                        <Table.Row key={vax.type+vax.dateRequired} >
                            <Table.Cell>
                                <Header as='h4' >
                                    <Header.Content>
                                        {vax.type}
                                    </Header.Content>
                                </Header>
                            </Table.Cell>
                            <Table.Cell>{formatDate(vax.dateRequired)}</Table.Cell>
                            <Table.Cell>{formatDate(vax.date)}</Table.Cell>
                            <Table.Cell>{vax.vet}</Table.Cell>
                            <Table.Cell>{vax.comments}</Table.Cell>

                        </Table.Row>
                    );


                })}
                </Table.Body>
            </Table>

            {/*Add in a table with their information*/}


        </Segment>
    );



};

export default AnimalVaxxHistory