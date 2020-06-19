
//Define the expected props
import AnimalState from "../../state/AnimalState";
import React from "react";
import {Icon, List, Pagination, PaginationProps, Table} from "semantic-ui-react";
import ApplicationState from "../../state/ApplicationState";
import {connect} from "react-redux";
import {Voucher, VoucherInfo, VoucherSearch, VoucherSearchResults, VoucherStatus} from "../../models/Voucher";
import {voucherActions} from "../../actions/voucher.actions";
import {animalActions} from "../../actions/animal.actions";
import {ThunkDispatch} from "redux-thunk";
import {Link} from "react-router-dom";
import {formatDate} from "../../utils/date-formater";

interface IncomingProps {
    voucherInfo:VoucherInfo;
}

interface LinkProps {
    updating:boolean;
    results?:VoucherSearchResults;
    //Get the current voucher search for pagnation
    currentParams:VoucherSearch;

    //Define the props we expect
    cawsAnimalsDb: AnimalState
}

interface DispatchProps{
    //Post a new Search
    postNewSearch:(searchParams:VoucherSearch) => any;
    //And the actions that must be done
    downloadAnimal: (id:number) => any;
}



/**
 * This card shows the animal details
 */
class VoucherList extends React.Component<IncomingProps&LinkProps&DispatchProps> {
    /**
     * Check to see if the props changed
     * @param prevProps
     */
    componentDidUpdate(prevProps:LinkProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.results && (prevProps.results == undefined) ) {
            this.getAnimalInfo();

        }else if (this.props.results &&  prevProps.results && (this.props.results.results.length !==  prevProps.results.results.length) ){
            this.getAnimalInfo();
        }
    }

    /**
     * Check to see if the props changed
     * @param prevProps
     */
    getAnimalInfo() {
        this.props.results!.results.forEach(voucher => {
            voucher.animalIds.forEach(id => {this.props.downloadAnimal(id)})
        });

    }
    getTypeName = (type:number) =>{
        for(let i =0; i < this.props.voucherInfo.types.length; i++){
            if(this.props.voucherInfo.types[i].id == type){
                return this.props.voucherInfo.types[i].name;
            }
        }
        return "?";
    }
    getVet = (vetId:number) =>{
        for(let i =0; i < this.props.voucherInfo.vets.length; i++){
            if(this.props.voucherInfo.vets[i].id == vetId){
                return this.props.voucherInfo.vets[i].name;
            }
        }
        return "?";
    }
    getAnimalNames = (voucher:Voucher) =>{
        return (
            <List>
                {voucher.animalIds.map(id =>{
                    if(this.props.cawsAnimalsDb.animals[id]){
                        return <List.Item>{this.props.cawsAnimalsDb.animals[id].getCodeAndName()}</List.Item>
                    }else{
                        return null;
                    }
                })}
                {voucher.animalInfo.map(info =>{
                    return <List.Item>{info.name}</List.Item>

                })}
            </List>
        )


    }
    /**
     * Gets called once when the page loads.  Tell the system to download that animal
     */
    goToPage = (event: React.MouseEvent<HTMLAnchorElement>, data: PaginationProps) =>{
        // get the forms
        if(data.activePage) {
            this.props.postNewSearch({...this.props.currentParams, page: +data.activePage});
        }

    };

    getTreatments = (voucher:Voucher) =>{
        return (
            <>
                <List>
                    {voucher.treatmentIds.map(id =>{
                        for(let i =0; i < this.props.voucherInfo.treatments.length; i++){
                            if(this.props.voucherInfo.treatments[i].id == id){
                                return (
                                    <List.Item>
                                        {this.props.voucherInfo.treatments[i].name}
                                    </List.Item>
                                )
                            }
                        }
                    })}

                </List>
                {voucher.other_treatment}
            </>
        )


    }
    getAppointmentDate = (voucher:Voucher) =>{

        if(voucher.appointment_date){

             return  formatDate(voucher.appointment_date)
        }else{
            return "";
        }
    }


    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {

        return(
            <Table striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Code</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Animal</Table.HeaderCell>
                        <Table.HeaderCell>Vet</Table.HeaderCell>
                        <Table.HeaderCell>Appt.</Table.HeaderCell>
                        <Table.HeaderCell>Treatments</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.props.results &&
                        this.props.results.results.map(row =>{
                            return (
                                <Table.Row>
                                    <Table.Cell>
                                        <Link
                                            to={`/voucher/${row.id}`}>
                                            <Icon name='edit' />
                                        </Link>
                                        {row.code}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {this.getTypeName(row.type)}
                                    </Table.Cell>
                                    <Table.Cell>{VoucherStatus[row.status]}</Table.Cell>
                                    <Table.Cell>{this.getAnimalNames(row)}</Table.Cell>
                                    <Table.Cell>{this.getVet(row.vetId)}</Table.Cell>
                                    <Table.Cell>{this.getAppointmentDate(row)}</Table.Cell>
                                    <Table.Cell>{this.getTreatments(row)}</Table.Cell>
                                </Table.Row>
                            );
                        })
                    }
                </Table.Body>
                <Table.Footer>
                    <Table.Row textAlign='right'>
                        <Table.HeaderCell colSpan='7'>
                        {this.props.results &&
                            <Pagination
                                activePage={this.props.results!.page}
                                totalPages={this.props.results!.numberPages}
                                onPageChange={this.goToPage}
                            />
                        }
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );

    }
};


/**
 * All of them share the same mapDispatchToProps
 * @param dispatch
 * @param ownProps
 */
function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>):DispatchProps {
    return {
        postNewSearch:(searchParams:VoucherSearch) =>  dispatch(voucherActions.updateVoucherSearch(searchParams)),
        downloadAnimal:(id:number) =>  dispatch(animalActions.getAnimal(id))

    };

}

/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState,props:IncomingProps): LinkProps&IncomingProps {

    return {
        ...props,
        updating:state.voucher.updating,
        results:state.voucher.results,
        cawsAnimalsDb:state.animals,
        currentParams:state.voucher.currentSearch
    };
}


//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(VoucherList);
