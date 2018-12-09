import React from 'react';
import CawsAnimal from "../../../models/CawsAnimal";
import {Header, Segment, Table, Image, Icon} from "semantic-ui-react";
import {SemanticICONS} from "semantic-ui-react/dist/commonjs/generic";
import {formatDate} from "../../../utils/date-formater";

//Add in the props
interface Props {
    animal:CawsAnimal;
}


const AnimalVaxxHistory =  (myProps:Props) =>{


    return (
        <Segment>
            <Header as="h2">{myProps.animal.data.NAME}'s Vaccine History</Header>

            <Table basic='very' style={{margin:"auto"}} celled collapsing>
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
                        <Table.Row key={vax.TYPE+vax.DATEREQUIRED}>
                            <Table.Cell>
                                <Header as='h4' >
                                    <Header.Content>
                                        {vax.TYPE}
                                    </Header.Content>
                                </Header>
                            </Table.Cell>
                            <Table.Cell>{formatDate(vax.DATEREQUIRED)}</Table.Cell>
                            <Table.Cell>{formatDate(vax.DATE)}</Table.Cell>
                            <Table.Cell>{vax.VET}</Table.Cell>
                            <Table.Cell>{vax.COMMENTS}</Table.Cell>

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