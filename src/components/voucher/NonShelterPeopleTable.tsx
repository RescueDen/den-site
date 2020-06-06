//Define the expected props
import React from "react";
import {Button, Form, Header, Icon, Table} from "semantic-ui-react";
import {NonShelterAnimal} from "../../models/Voucher";
import NonShelterAnimalModal from "./NonShelterAnimalModal";
import {Species} from "../../models/ShelterAnimal";
import {PersonData} from "../../models/People";
import NonShelterPersonModal from "./NonShelterPersonModal";

interface IncomingProps {
    people:PersonData[];

    //Pass in the function to update the list
    updateList:(people:PersonData[]) => any;
}


/**
 * This card shows the animal details
 */
class NonShelterPeopleTable extends React.Component<IncomingProps> {

    deletePerson = (row:number ) =>{
        this.props.updateList(this.props.people.filter((value, index) => {
            return index != row;
        }))
    }

    updatePerson = (row:number, person:PersonData ) => {
        //Make a copy of the list
        let listCopy = [...this.props.people];

        //Update the one row
        listCopy[row] = person;
        this.props.updateList(listCopy);
    }
    addPerson = ( person:PersonData ) => {
        //Make a copy of the list
        let listCopy = [...this.props.people, person];

        this.props.updateList(listCopy);
    }

    getEmptyPerson = ():PersonData =>{
        return {
            firstname:"",
            lastname:"",
            id:-1,
            email:"",
            currentFosters:[],
            pastFosters:[]

        }
    }

    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {

        return (
            <>
                {this.props.people.length > 0 &&
                        <Table basic='very'>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Email</Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {/*Make each row*/}
                                {
                                    this.props.people.map((per:PersonData, index: number) => {
                                        return (
                                            <Table.Row key={index +" " + per.firstname}>
                                                <Table.Cell>
                                                    <Header as='h4'>
                                                        {per.firstname} {per.lastname}
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {per.email}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <NonShelterPersonModal
                                                        icon='edit'
                                                        initPerson={per}
                                                        savePerson={(person:PersonData) => {this.updatePerson(index, person)}}
                                                    />

                                                    <Icon name='delete' size='large' onClick={() =>{this.deletePerson(index)}}/>
                                                </Table.Cell>
                                            </Table.Row>
                                        )
                                    })
                                }

                            </Table.Body>
                        </Table>
                }
                <NonShelterPersonModal
                    trigger={<Form.Field control={Button} icon='add'>Add Non-CAWS Person</Form.Field>}
                    initPerson={this.getEmptyPerson()}
                    savePerson={(person:PersonData) => {this.addPerson(person)}}
                />

        </>
        );
    }
}

export default NonShelterPeopleTable ;
