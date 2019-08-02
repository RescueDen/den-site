//Define the expected props
import React from "react";
import {Button, Form, Header, Icon, Table} from "semantic-ui-react";
import {NonShelterAnimal} from "../../models/Voucher";
import NonShelterAnimalModal from "./NonShelterAnimalModal";
import {Species} from "../../models/CawsAnimal";

interface IncomingProps {
    animals:NonShelterAnimal[];

    //Pass in the function to update the list
    updateList:(animals:NonShelterAnimal[]) => any;
}


/**
 * This card shows the animal details
 */
class NonShelterAnimalTable extends React.Component<IncomingProps> {

    deleteAnimal = (row:number ) =>{
        this.props.updateList(this.props.animals.filter((value, index) => {
            return index != row;
        }))
    }

    updateAnimal = (row:number, animal:NonShelterAnimal ) => {
        //Make a copy of the list
        let listCopy = [...this.props.animals];

        //Update the one row
        listCopy[row] = animal;
        this.props.updateList(listCopy);
    }
    addAnimal = ( animal:NonShelterAnimal ) => {
        //Make a copy of the list
        let listCopy = [...this.props.animals, animal];

        this.props.updateList(listCopy);
    }

    getEmptyAnimal = ():NonShelterAnimal =>{
        return {
            name:"",
            species:Species.cat,
            sex:"M",
            age:0,
            comments:""

        }
    }


    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {

        return (
            <>
                {this.props.animals.length > 0 &&
                        <Table basic='very'>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Species</Table.HeaderCell>
                                    <Table.HeaderCell>Sex</Table.HeaderCell>
                                    <Table.HeaderCell>Age (Years)</Table.HeaderCell>
                                    <Table.HeaderCell>Comments</Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {/*Make each row*/}
                                {
                                    this.props.animals.map((ani:NonShelterAnimal, index: number) => {
                                        return (
                                            <Table.Row key={index +" " + ani.name}>
                                                <Table.Cell>
                                                    <Header as='h4'>
                                                        {ani.name}
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {ani.species}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {ani.sex}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {ani.age}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {ani.comments}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <NonShelterAnimalModal
                                                        icon='edit'
                                                        initAnimal={ani}
                                                        saveAnimal={animal => {this.updateAnimal(index, animal)}}
                                                    />

                                                    <Icon name='delete' size='large' onClick={() =>{this.deleteAnimal(index)}}/>
                                                </Table.Cell>
                                            </Table.Row>
                                        )
                                    })
                                }

                            </Table.Body>
                        </Table>
                }
                <NonShelterAnimalModal
                    trigger={<Form.Field control={Button} icon='add'>Add Non-CAWS Animal</Form.Field>}
                    initAnimal={this.getEmptyAnimal()}
                    saveAnimal={animal => {this.addAnimal(animal)}}
                />

        </>
        );
    }
}

export default NonShelterAnimalTable ;
