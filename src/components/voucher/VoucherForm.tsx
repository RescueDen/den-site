//Define the expected props
import AnimalState from "../../state/AnimalState";
import React from "react";
import {Button, Dropdown, DropdownProps, Form, Grid, Header, Segment, Select, TextAreaProps} from "semantic-ui-react";
import {ThunkDispatch} from "redux-thunk";
import ApplicationState from "../../state/ApplicationState";
import {connect} from "react-redux";
import {
    NonShelterAnimal,
    Voucher,
    VoucherDraft,
    VoucherInfo,
    VoucherIssued,
    VoucherRedeemed,
    VoucherVoid
} from "../../models/Voucher";
import RemoteSearch from "../animal/RemoteSearch";
import AnimalListTable from "../animal/AnimalListTable";
import NonShelterAnimalTable from "./NonShelterAnimalTable";
import {Species} from "../../models/ShelterAnimal";
import {animalActions} from "../../actions/animal.actions";
import {DateTimeInput} from "semantic-ui-calendar-react";
import moment from 'moment';
import NonShelterPeopleTable from "./ClientTable";

interface IncomingProps {
    voucherInfo: VoucherInfo;

    //Store the current voucher (could be empty default)
    initVoucher: Voucher;

    //Pass in a onSubmit
    onSubmit: (voucher: Voucher, issue: boolean) => any;

    // //And the button
    // buttonText:string;

    children: any;
}

interface LinkProps {
    //Define the props we expect
    cawsAnimalsDb: AnimalState

    //Updating
    updating: boolean;

}

//Store the local voucher instate
interface VoucherFormState {
    voucher: Voucher;
}

interface DispatchProps {
    //And the actions that must be done
    downloadAnimal: (id: number) => any;

}

/**
 * This card shows the animal details
 */
class VoucherForm extends React.Component<IncomingProps & LinkProps & DispatchProps, VoucherFormState> {
    state = {voucher: this.props.initVoucher};

    /**
     * Support call to get type options
     */
    getTypeOptions = () => {
        return this.props.voucherInfo!.types.map(typ => {
            return {
                key: typ.id,
                text: typ.name,
                value: typ.id
            }
        });
    };

    updateVoucher = (newParams: any) => {
        this.setState({voucher: {...this.state.voucher, ...newParams}});
    }

    voidVoucher = () => {
        const vo = window.confirm("Are you sure you want to void " + this.state.voucher.code)

        if (vo) {
            let copy = this.state.voucher;
            copy.status = VoucherVoid;
            this.props.onSubmit(this.state.voucher, false)
        }
    }

    redeemVoucher = () => {
        const vo = window.confirm("Are you sure you want to redeem " + this.state.voucher.code)

        if (vo) {
            let copy = this.state.voucher;
            copy.status = VoucherRedeemed;
            this.props.onSubmit(this.state.voucher, false)
        }
    }

    //Add Shelter Animal
    addShelterAnimal = (id: number) => {
        //Get the animal info
        this.props.downloadAnimal(id);
        //Update the state
        this.updateVoucher({animalIds: [...this.state.voucher.animalIds, id]});
    }

    //Remove Shelter Animal
    removeShelterAnimal = (id: number) => {
        this.updateVoucher({
            animalIds: this.state.voucher.animalIds.filter((test: number) => {
                return test !== id
            })
        });
    }

    //Add Shelter Animal
    updateNonShelterAnimals = (list: NonShelterAnimal[]) => {
        this.updateVoucher({animalInfo: list})
    }
    //Add Shelter Animal
    updateNonShelterPeople = (list: number[]) => {
        this.updateVoucher({clientIds: list})
    }

    //Get a list of vets that will work on each species
    getVetOptions = () => {
        //Start by getting the species
        const species: Species[] = this.determineSpecies();

        //Now filter the vet options
        return this.props.voucherInfo!.vets.filter(vet => {
            for (let sp = 0; sp < species.length; sp++) {
                if ((vet.species.indexOf(species[sp]) < 0)) {
                    return false;
                }
            }
            return true;

        }).map(vet => {
            //Map them into options
            return {
                key: vet.id,
                text: vet.name,
                value: vet.id
            }
        });


    };
    //Get a list of vets that will work on each species
    getTreatmentOptions = () => {
        //Start by getting the species
        const species: Species[] = this.determineSpecies();

        //Now filter the vet options
        return this.props.voucherInfo!.treatments.map(treatment => {
            //Assume enabled
            let enabled = true;

            //see if the treatment can be used on the species
            if (species.length > 0) {
                for (let sp = 0; sp < species.length; sp++) {
                    if ((treatment.species.indexOf(species[sp]) < 0)) {
                        enabled = false;
                    }
                }
            }

            //Get the current vet
            const currentVet = this.props.voucherInfo.vets.find(vet => vet.id == this.state.voucher.vetId);
            if (currentVet) {
                if (currentVet.treatments.indexOf(treatment.id) < 0) {
                    enabled = false;
                }
            }


            //Map them into options
            return {
                key: treatment.id,
                text: treatment.name,
                value: treatment.id,
                disabled: (!enabled)
            }
        });


    };

    //Determine the species
    determineSpecies = () => {
        //March over each animal and get the species used
        let speciesSet = new Set<Species>();

        //March over each animal in the list
        this.state.voucher.animalIds.forEach(id => {
            //If we have this animal
            if (this.props.cawsAnimalsDb.animals[id]) {
                speciesSet.add(this.props.cawsAnimalsDb.animals[id].data.species as Species)
            }


        });

        //Also check the other animals
        this.state.voucher.animalInfo.map(info => {
            //If we have this animal
            speciesSet.add(info.species);

        });


        return Array.from(speciesSet);
    }

    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        return (
            <>
                <Form>
                    <Form.Field control={Select} label='Voucher Type'
                                value={this.state.voucher.type}
                                placeholder='Select Voucher Type'
                                options={this.getTypeOptions()}
                                onChange={(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
                                    if (data.value)
                                        this.updateVoucher({type: +data.value})
                                }
                                }
                    />
                    {/*Animal Information*/}
                    <Segment vertical>
                        <Header size='small'>Animal Information</Header>
                        {/* Add the animal search*/}
                        <Form.Field control={RemoteSearch} label='Find CAWS Animal'
                                    selectAnimal={this.addShelterAnimal}/>
                        {/*Center the tables*/}
                        <Grid centered={true}>
                            {/*  Keep the list of CAWS Animals  */}
                            <AnimalListTable aniLink="/animal" animalIdList={this.state.voucher.animalIds}
                                             onDelete={this.removeShelterAnimal}/>
                        </Grid>
                        {/* Always allow non caws animals   */}
                        <Form.Field>
                            <label>Non CAWS Animal</label>
                            <NonShelterAnimalTable animals={this.state.voucher.animalInfo}
                                                   updateList={this.updateNonShelterAnimals}/>
                        </Form.Field>
                    </Segment>
                    <Segment vertical>
                        <Header size='small'>Appointment Information</Header>
                        <Form.Group widths='equal'>
                            {/* Select a vet based upon the species    */}
                            <Form.Field control={Select} label='Veterinarian'
                                        value={this.state.voucher.vetId}
                                        placeholder='Select Veterinarian'
                                        options={this.getVetOptions()}
                                        search
                                        onChange={(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
                                            if (data.value)
                                                this.updateVoucher({vetId: +data.value})
                                        }
                                        }
                            />

                            {/*Add a date/time for the appointment time*/}
                            <Form.Field
                                control={DateTimeInput}
                                label='Appointment Date and Time'
                                name="dateTime"
                                value={this.state.voucher.appointment_date ? moment(this.state.voucher.appointment_date).format("MMMM Do YYYY, h:mm:ss a") : ""}
                                iconPosition="left"
                                timeFormat={"AMPM"}
                                dateTimeFormat={"MMMM Do YYYY, h:mm:ss a"}
                                onChange={(e: React.SyntheticEvent<HTMLElement>, data: any) => {
                                    if (data.value)
                                        this.updateVoucher({appointment_date: moment(data.value, "MMMM Do YYYY, h:mm:ss a").toDate()})
                                }
                                }
                            />
                        </Form.Group>
                        {/* Add the available treatments for the vet and species   */}
                        <Form.Field control={Dropdown} label='Treatments'
                                    value={this.state.voucher.treatmentIds}
                                    placeholder='Select Treatments'
                                    options={this.getTreatmentOptions()}
                                    search
                                    fluid
                                    multiple
                                    selection
                                    onChange={(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
                                        if (data.value)
                                            this.updateVoucher({treatmentIds: data.value as number[]})
                                    }
                                    }
                        />
                        {/*Add Other Treatments*/}
                        <Form.TextArea label='Other Treatments' placeholder='List any other treatments...'
                                       value={this.state.voucher.other_treatment}
                                       onChange={(event: React.SyntheticEvent<HTMLElement>, data: TextAreaProps) => {
                                           if (data.value)
                                               this.updateVoucher({other_treatment: data.value})
                                       }
                                       }
                        />
                    </Segment>
                    <Segment vertical>
                        <Form.Field>
                            <label>Non-Shelter Clients</label>
                            <NonShelterPeopleTable clientIds={this.state.voucher.clientIds}
                                                   updateList={this.updateNonShelterPeople}/>
                        </Form.Field>
                    </Segment>
                    <Segment vertical>
                        {/*And just general notes*/}
                        <Form.TextArea label='Notes' placeholder='Any notes. This is to all involved.'
                                       value={this.state.voucher.notes}
                                       onChange={(event: React.SyntheticEvent<HTMLElement>, data: TextAreaProps) => {
                                           if (data.value)
                                               this.updateVoucher({notes: data.value})
                                       }
                                       }
                        />
                    </Segment>

                </Form>
                <Button
                    negative
                    onClick={this.voidVoucher}
                    loading={this.props.updating}
                    disabled={this.state.voucher.status === VoucherDraft}
                >
                    Void
                </Button>
                <Button
                    onClick={this.redeemVoucher}
                    loading={this.props.updating}
                    disabled={this.state.voucher.status !== VoucherIssued}
                >
                    Mark Redeemed
                </Button>
                <Button
                    floated={"right"}
                    primary
                    onClick={() => this.props.onSubmit(this.state.voucher, true)}
                    loading={this.props.updating}
                >
                    Send
                </Button>
                <Button
                    secondary
                    floated={"right"}
                    onClick={() => this.props.onSubmit(this.state.voucher, false)}
                    loading={this.props.updating}
                >
                    Save
                </Button>
            </>
        )


    }
}

/**
 * All of them share the same mapDispatchToProps
 * @param dispatch
 * @param ownProps
 */
function mapDispatchToProps(dispatch: ThunkDispatch<any, any, any>, ownProps: IncomingProps): DispatchProps {
    return {
        ...ownProps,
        downloadAnimal: (id: number) => dispatch(animalActions.getAnimal(id))
    };

}


/**
 * Map from the global state to things we need here
 * @param state
 * @param props
 */
function mapStateToProps(state: ApplicationState, props: IncomingProps): IncomingProps & LinkProps {

    return {
        ...props,
        cawsAnimalsDb: state.animals,
        updating: state.voucher.updating
    };
}


//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VoucherForm);
