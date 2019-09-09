
//Define the expected props
import React from "react";
import {
    DropdownProps,
    Form,
    Grid,
    Select,
    Dropdown, TextAreaProps, Segment, Input
} from "semantic-ui-react";
import {NonShelterAnimal, Treatment, Type, Voucher, VoucherInfo} from "../../models/Voucher";
import {DateTimeInput} from "semantic-ui-calendar-react";
import moment from "moment";

interface IncomingProps {
    type:Type;
    voucher:Voucher;
    treatments:Treatment[];
}



/**
 * This card shows the animal details
 */
class VoucherInfoView extends React.Component<IncomingProps> {


    getTreatmentOptions = () =>{
        return this.props.treatments.map(treatment => {
            return {
                key: treatment.id,
                text: treatment.name,
                value: treatment.id,
            }
        });
    }
    getTreatmentValues = () =>{
        return this.props.treatments.map(treatment => {
            return treatment.id
        });
    }

    render() {
        return (
            <>
                <Form>
                    <Form.Field control={Input} label='Voucher Type'
                                value={this.props.type.name}
                                readonly={true}
                    />
                    <Form.Field
                        control={DateTimeInput}
                        label='Appointment Date and Time'
                        name="dateTime"
                        value={this.props.voucher.appointment_date?moment(this.props.voucher.appointment_date).format("MMMM Do YYYY, h:mm:ss a"):""}
                        iconPosition="left"
                        timeFormat={"AMPM"}
                        dateTimeFormat={"MMMM Do YYYY, h:mm:ss a"}
                        readonly={true}
                    />
                    {/* Add the available treatments for the vet and species   */}
                    <Form.Field control={Dropdown} label='Treatments'
                                value={this.getTreatmentValues()}
                                placeholder='Treatments'
                                options={this.getTreatmentOptions()}
                                fluid
                                multiple
                                clearable={false}
                                readonly={true}

                    />
                    <Form.TextArea label='Other Treatments' readonly={true}
                                   value={this.props.voucher.other_treatment}
                    />

                    {/*And just general notes*/}
                    <Form.TextArea label='Notes' readonly={true}
                                   value={this.props.voucher.notes}
                    />

                </Form>
            </>
        )


    }
};


//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export default VoucherInfoView;