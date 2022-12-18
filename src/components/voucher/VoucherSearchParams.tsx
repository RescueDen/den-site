//Define the expected props
import AnimalState from "../../state/AnimalState";
import React from "react";
import {Checkbox, Container, Dropdown, DropdownProps, Form, InputProps, Segment} from "semantic-ui-react";
import {ThunkDispatch} from "redux-thunk";
import ApplicationState from "../../state/ApplicationState";
import {connect} from "react-redux";
import {voucherActions} from "../../actions/voucher.actions";
import {VoucherInfo, VoucherSearch, VoucherStatus} from "../../models/Voucher";
import RemoteSearch from "../animal/RemoteSearch";
import {animalActions} from "../../actions/animal.actions";
import ShelterUser, {getEmptyCawsUser} from "../../models/ShelterUser";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";

interface LinkProps {
    updating: boolean;
    currentParams: VoucherSearch;

    //Define the props we expect
    cawsAnimalsDb: AnimalState
    //Define the props we expect
    user: ShelterUser;

}

interface IncomingProps {
    voucherInfo: VoucherInfo;

}

interface DispatchProps {
    //Post a new Search
    postNewSearch: (searchParams: VoucherSearch) => any;
    //And the actions that must be done
    downloadAnimal: (id: number) => any;

}

/**
 * Support call to get status options
 */
export const getStatusOptions = () => {
    return Object.keys(VoucherStatus).map(id => {
        return {
            text: VoucherStatus[+id], key: +id, value: +id
        }
    });

};

/**
 * This card shows the animal details
 */
class VoucherSearchParams extends React.Component<IncomingProps & DispatchProps & LinkProps> {

    //Update and perform new search
    updateSearchParam = (newParams: any) => {
        //Get a new param
        let params: any = {...this.props.currentParams, ...newParams};

        //If any of the newParams are empty remove them from the object
        Object.keys(newParams).forEach(key => {
            if (params[key].toString().length === 0) {
                delete params[key];
            }
        });

        //Now update
        this.props.postNewSearch(params);
    }


    /**
     * Gets called once when the page loads.  Tell the system to download that animal
     */
    componentDidMount() {
        // get the forms
        this.props.postNewSearch(this.props.currentParams);

    };

    //Add Shelter Animal
    selectShelterAnimal = (id: number) => {
        //Get the animal info
        this.props.downloadAnimal(id);
        //Update the state
        this.updateSearchParam({animalId: id});
    }
    //Add Shelter Animal
    clearShelterAnimal = () => {

        //Update the state
        this.updateSearchParam({animalId: ""});
    }

    /**
     * Support call to get type options
     */
    getTypeOptions = () => {
        return this.props.voucherInfo.types.map(typ => {
            return {
                key: typ.id, text: typ.name, value: typ.id
            }
        });
    };

    getCurrentAnimal = () => {
        if (this.props.currentParams.animalId) {
            let animal = this.props.cawsAnimalsDb.animals[this.props.currentParams.animalId];

            if (animal) {
                return animal.getCodeAndName();
            }
        }
        return "";

    }

    isOnlyMyVouchers = () => {
        return this.props.currentParams.issuer === this.props.user.data.id;
    }
    swapOnlyMyVoucher = () => {
        if (this.props.currentParams.issuer === this.props.user.data.id) {
            delete this.props.currentParams.issuer;
            this.props.postNewSearch(this.props.currentParams);

        } else {
            this.props.postNewSearch({...this.props.currentParams, ...{issuer: this.props.user.data.id}});

        }
    }
    clearSearch = () => {
        this.props.postNewSearch({
            page: this.props.currentParams.page, pageSize: this.props.currentParams.pageSize
        });
    }

    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        return (<Container>
                <Segment>
                    <Form>
                        <Form.Group key='voucher' widths='equal'>
                            {/*Hold the voucher type*/}
                            <Form.Dropdown label={"Voucher Type"} control={Dropdown}
                                           clearable
                                           value={this.props.currentParams.type}
                                           options={this.getTypeOptions()}
                                           selection
                                           fluid
                                           onChange={(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
                                               this.updateSearchParam({type: data.value})
                                           }}
                            />
                            {/*Hold the voucher type*/}
                            <Form.Dropdown label={"Voucher Status"}
                                           clearable
                                           value={this.props.currentParams.type}
                                           options={getStatusOptions()}
                                           selection
                                           fluid
                                           onChange={(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
                                               this.updateSearchParam({status: data.value})
                                           }}
                            />
                            {/* The voucher code   */}
                            <Form.Input fluid label='Voucher Code'
                                        value={this.props.currentParams.code}
                                        onChange={(event: React.SyntheticEvent<HTMLElement>, data: InputProps) => {
                                            this.updateSearchParam({code: data.value})
                                        }}
                            />
                        </Form.Group>
                        <Form.Group key='animal' widths='equal'>
                            <Form.Field control={RemoteSearch} label='Select CAWS Animal'
                                        selectAnimal={this.selectShelterAnimal}/>
                            <Form.Input label=' CAWS Animal '
                                        fluid
                                        readOnly
                                        value={this.getCurrentAnimal()}
                                        action={{
                                            labelPosition: 'right',
                                            icon: 'delete',
                                            content: "clear",
                                            onClick: this.clearShelterAnimal
                                        }}
                            />

                        </Form.Group>
                        <Form.Group inline key='me'>
                            <Button onClick={this.clearSearch}>Clear Search</Button>
                            <Form.Field>
                                <Checkbox
                                    label='My Vouchers Only'
                                    checked={this.isOnlyMyVouchers()}
                                    onChange={this.swapOnlyMyVoucher}
                                />
                            </Form.Field>
                        </Form.Group>
                    </Form>
                </Segment>
            </Container>);

    }
}

/**
 * All of them share the same mapDispatchToProps
 * @param dispatch
 * @param ownProps
 */
function mapDispatchToProps(dispatch: ThunkDispatch<any, any, any>): DispatchProps {
    return {
        postNewSearch: (searchParams: VoucherSearch) => dispatch(voucherActions.updateVoucherSearch(searchParams)),
        downloadAnimal: (id: number) => dispatch(animalActions.getAnimal(id))

    };

}


/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state: ApplicationState, myProps: IncomingProps): IncomingProps & LinkProps {

    return {
        ...myProps,
        updating: state.voucher.updating,
        currentParams: state.voucher.currentSearch,
        cawsAnimalsDb: state.animals,
        user: state.authentication.loggedInUser ? state.authentication.loggedInUser : getEmptyCawsUser(),
    };
}


//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export default connect(mapStateToProps, mapDispatchToProps)(VoucherSearchParams);
