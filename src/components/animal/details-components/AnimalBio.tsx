import React from 'react';
import CawsAnimal from "../../../models/CawsAnimal";
import {Header, Segment, Table, Image, Icon, Grid} from "semantic-ui-react";
import {SemanticICONS} from "semantic-ui-react/dist/commonjs/generic";

//Add in the props
interface Props {
    animal:CawsAnimal;
}

//Add a private support function to create the row
const createRow = ( name:string, value:string, ...icons:SemanticICONS[]) =>{
    return (
        <Table.Row>
            <Table.Cell>
                <Header as='h4' image>
                    {/*For each icon add it*/}
                    {icons.map(icon => <Icon key={icon.toString()} name={icon} />)}
                    <Header.Content>
                        {name}
                    </Header.Content>
                </Header>
            </Table.Cell>
            <Table.Cell>{value}</Table.Cell>
        </Table.Row>
    );
}

const AnimalBio =  (myProps:Props) =>{


    return (

        <Grid stackable columns={2}>
            <Grid.Column>
                <p>{myProps.animal.data.BIO}</p>
            </Grid.Column>
            <Grid.Column>
                {/*Add in a table with their information*/}
                <Table basic='very' style={{margin:"auto"}} celled collapsing>
                    <Table.Body>
                        {createRow("Breed", myProps.animal.data.BREED, "paw")}
                        {createRow("Sex", myProps.animal.data.SEX, "man", "woman")}
                        {/*{createRow("Fixed", myProps.animal.data.N, "man", "woman")}*/}
                        {createRow("Age", myProps.animal.data.AGE, "calendar outline")}
                        {createRow("Is Good With Cats?", myProps.animal.formatYesNoUnknown(myProps.animal.data.ISGOODWITHCATS))}
                        {createRow("Is Good With Dogs?", myProps.animal.formatYesNoUnknown(myProps.animal.data.ISGOODWITHDOGS))}
                        {createRow("Is Good With Children?", myProps.animal.formatYesNoUnknown(myProps.animal.data.ISGOODWITHCHILDREN), "child")}
                        {createRow("Is House Trained?", myProps.animal.formatYesNoUnknown(myProps.animal.data.ISHOUSETRAINED), "home")}
                        {createRow("Current Location", myProps.animal.getCurrentStatus(), "location arrow")}

                    </Table.Body>
                </Table>
            </Grid.Column>
        </Grid>

    );



};

export default AnimalBio