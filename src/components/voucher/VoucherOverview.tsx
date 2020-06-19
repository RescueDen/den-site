//Define the expected props
import React from "react";
import {Button, Container, Grid, Header, Segment} from "semantic-ui-react";
import {ThunkDispatch} from "redux-thunk";
import ApplicationState from "../../state/ApplicationState";
import {connect} from "react-redux";
import {voucherActions} from "../../actions/voucher.actions";
import {VoucherInfo} from "../../models/Voucher";
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
                    {/*Add a simple header*/}
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column>
                                <Header>Existing Voucher Search & Listings</Header>
                            </Grid.Column>
                            {/*The add voucher button on right*/}
                            <Grid.Column textAlign='right'>
                                <Link
                                    to={`/voucher`}
                                >
                                    <Button primary icon='add' floated='right'> New Voucher </Button>
                                </Link>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    {this.props.voucherInfo &&
                        <VoucherSearchParams
                            voucherInfo={this.props.voucherInfo}
                        />
                    }
                    {this.props.voucherInfo &&
                        <VoucherList voucherInfo={this.props.voucherInfo}/>
                    }

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
