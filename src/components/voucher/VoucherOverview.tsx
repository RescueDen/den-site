
//Define the expected props
import {RouteComponentProps} from "react-router";
import AnimalState from "../../state/AnimalState";
import FormsSummary, {isFormItemData} from "../../models/FormsSummary";
import React from "react";
import {
    Button,
    Container,
    Dimmer,
    DropdownProps,
    Form,
    Header,
    Icon,
    Image,
    Loader,
    Segment,
    Select
} from "semantic-ui-react";
import {DocumentItemData, isDirectory} from "../../models/DocumentSummary";
import Breadcrumbs from "../newsAndInfo/Breadcrumbs";
import DocumentHierarchy from "../newsAndInfo/DocumentHierarchy";
import FormViewer from "../forms/FormViewer";
import {ThunkDispatch} from "redux-thunk";
import {formsActions} from "../../actions/forms.actions";
import ApplicationState from "../../state/ApplicationState";
import {connect} from "react-redux";
import {voucherActions} from "../../actions/voucher.actions";
import {Voucher, VoucherInfo} from "../../models/Voucher";
import VoucherForm from "./VoucherForm";
import VoucherSearchParams from "./VoucherSearchParams";
import VoucherList from "./VoucherList";
import {Link} from "react-router-dom";

interface LinkProps {
    voucherInfo?:VoucherInfo;


}


interface DispatchProps{
    //And the actions that must be done
    getGetVoucherInfo: () => any;

}


/**
 * This card shows the animal details
 */
class NewVoucher extends React.Component<DispatchProps&LinkProps> {

    /**
     * Gets called once when the page loads.  Tell the system to download that animal
     */
    componentDidMount(){
        // get the forms
        this.props.getGetVoucherInfo();

    };

    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {

        return(
            <Container>
                <Segment>
                    <Header>Existing Voucher Search <Button primary icon='add' floated='right'> New Voucher </Button></Header>
                    {this.props.voucherInfo &&
                        <VoucherSearchParams
                            voucherInfo={this.props.voucherInfo}
                        />
                    }
                    {this.props.voucherInfo &&
                        <VoucherList voucherInfo={this.props.voucherInfo}/>

                    }
                    <Link
                        to={`/voucher`}
                    >


                    </Link>
                </Segment>
            </Container>
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
        getGetVoucherInfo:() =>  dispatch(voucherActions.getVoucherInfo())
    };

}


/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState, myProps:LinkProps): LinkProps {

    return {
        ...myProps,
        voucherInfo:state.voucher.info
    };
}


//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(NewVoucher);
