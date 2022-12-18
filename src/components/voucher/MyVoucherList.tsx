//Define the expected props
import React from "react";
import {Header, Segment, Table} from "semantic-ui-react";
import {PublicVoucherViewData} from "../../models/Voucher";
import {voucherService} from "../../services/voucher.service";
import {Link} from "react-router-dom";
import {formatDateTime} from "../../utils/date-formater";
import VetDetails from "./VetDetails";

interface Props {

}

interface StateData {
    vouchers?: PublicVoucherViewData[];
    error?: string;
}

class MyVoucherList extends React.Component<Props, StateData> {
    state = {vouchers: undefined, error: undefined};

    componentDidMount() {
        voucherService.getMyVouchers()
            .then(
                list => {
                    this.setState({vouchers: list});
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

    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        if (this.state.vouchers == undefined && this.state.error) {
            return <p>{this.state.error}</p>
        } else if (this.state.vouchers != undefined) {

            let vouchers = this.state.vouchers! as PublicVoucherViewData[];
            return (
                <Segment>
                    <Header as="h2">My Upcoming Vet Appointments</Header>
                    <Table striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Code</Table.HeaderCell>
                                <Table.HeaderCell>Animal</Table.HeaderCell>
                                <Table.HeaderCell>Vet</Table.HeaderCell>
                                <Table.HeaderCell>Appt. Date/Time</Table.HeaderCell>
                                <Table.HeaderCell>Treatments</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {vouchers.map(voucher => {
                                return (
                                    <Table.Row>
                                        <Table.Cell>
                                            {voucher.voucher.code}
                                        </Table.Cell>
                                        <Table.Cell>{voucher.animals.map(ani => <Link
                                            to={`/animal/${ani.id}`}>{ani.name}</Link>)}</Table.Cell>
                                        <Table.Cell>
                                            {voucher.vet &&
                                                <VetDetails vet={voucher.vet}/>
                                            }
                                        </Table.Cell>
                                        <Table.Cell>{formatDateTime(voucher.voucher.appointment_date)}</Table.Cell>
                                        <Table.Cell>{voucher.treatments.map(treatment => treatment.name).join(",")}{voucher.voucher.other_treatment}</Table.Cell>
                                    </Table.Row>
                                );
                            })
                            }
                        </Table.Body>
                    </Table>
                    {this.state.error}
                </Segment>
            );
        } else {
            return null;
        }
    }
}


//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export default MyVoucherList;
