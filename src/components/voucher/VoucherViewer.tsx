//Define the expected props
import {RouteComponentProps, withRouter} from "react-router";
import React from "react";
import {Container, Dimmer, Header, Loader, Segment} from "semantic-ui-react";
import {ThunkDispatch} from "redux-thunk";
import ApplicationState from "../../state/ApplicationState";
import {connect} from "react-redux";
import {voucherActions} from "../../actions/voucher.actions";
import {Voucher, VoucherInfo} from "../../models/Voucher";
import VoucherForm from "./VoucherForm";
import {voucherService} from "../../services/voucher.service";

interface LinkProps extends RouteComponentProps<any>, RouteComponentProps<any> {
    voucherInfo?: VoucherInfo;

    //Keep the voucherID
    voucherId?: number;

}


interface DispatchProps {
    //And the actions that must be done
    getGetVoucherInfo: () => any;

}

//Define the expected props
interface State {
    //Keep a voucher in mem
    voucher?: Voucher;
    error?: string;
    loading: boolean;
}


/**
 * This card shows the animal details
 */
class VoucherViewer extends React.Component<DispatchProps & LinkProps> {
    state = {voucher: undefined, loading: false, error: undefined}

    /**
     * Gets called once when the page loads.  Tell the system to download that animal
     */
    componentDidMount() {
        // get the forms
        this.props.getGetVoucherInfo();

        //If there is a
        if (this.props.voucherId) {
            voucherService.getVoucherById(this.props.voucherId)
                //When it comes back use it
                .then(
                    //If successful html will be returned
                    voucher => {
                        //Update the state
                        this.setState({voucher: voucher})

                    },
                    //If there was an error, show to the user
                    errorResponse => {
                        //Dispatch the error
                        try {
                            this.setState({error: errorResponse.response.data.message});
                        } catch (e) {
                            this.setState({error: errorResponse.toString()});

                        }

                    }
                );
        }

    };

    updateVoucher = (voucher: Voucher, issue: boolean) => {
        //Send to the server
        this.setState({loading: true});

        voucherService.updateVoucher(voucher, issue).then(
            //If successful html will be returned
            voucher => {
                //Now tell the system to reload
                this.setState({loading: false});

                //Route to it
                this.props.history.push('/vouchers')
            },
            //If there was an error, show to the user
            errorResponse => {
                //Dispatch the error
                try {
                    this.setState({loading: false, error: errorResponse.response.data.message});
                } catch (e) {
                    this.setState({loading: false, error: errorResponse.toString()});
                }
            }
        );

    }

    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {

        if (this.props.voucherId) {
            //We have a voucher ID
            return (
                <Container>
                    <Segment>
                        {/*Add a dimmer if needed*/}
                        {this.state.voucher == undefined || this.state.loading &&
                            <Dimmer inverted active={true}>
                                <Loader inverted>Loading</Loader>
                            </Dimmer>
                        }
                        <Header>Edit Voucher</Header>
                        {this.props.voucherInfo && this.state.voucher &&
                            <VoucherForm
                                initVoucher={this.state.voucher!}
                                voucherInfo={this.props.voucherInfo}
                                onSubmit={this.updateVoucher}
                            >

                            </VoucherForm>
                        }
                        {this.state.error}

                    </Segment>
                </Container>
            )
        } else {
            return (
                <Container>
                    <Segment>
                        {/*Add a dimmer if needed*/}
                        {this.state.voucher == undefined || this.state.loading &&
                            <Dimmer inverted active={true}>
                                <Loader inverted>Loading</Loader>
                            </Dimmer>
                        }
                        <Header>New Voucher </Header>
                        {this.props.voucherInfo &&
                            <VoucherForm
                                initVoucher={this.props.voucherInfo.default_voucher}
                                voucherInfo={this.props.voucherInfo}
                                onSubmit={this.updateVoucher}
                            >

                            </VoucherForm>
                        }
                        {this.state.error}
                    </Segment>
                </Container>
            );
        }


    }
}

/**
 * All of them share the same mapDispatchToProps
 * @param dispatch
 * @param ownProps
 */
function mapDispatchToProps(dispatch: ThunkDispatch<any, any, any>): DispatchProps {
    return {
        getGetVoucherInfo: () => dispatch(voucherActions.getVoucherInfo())
    };

}


/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state: ApplicationState, myProps: LinkProps): LinkProps {

    return {
        ...myProps,
        voucherInfo: state.voucher.info,
        voucherId: myProps.match.params.voucherId
    };
}

//Wrap with a withRouter so we get the current location
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(VoucherViewer));
