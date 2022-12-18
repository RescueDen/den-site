import React from 'react';
import {DropdownProps, Form, Input, InputProps} from "semantic-ui-react";
import {Address, UsStates} from "../../models/Address";

interface IncomingProps {
    address: Address;
    update: (address: Address) => any;
    errors: { [location: string]: string; }
}

class AddressForm extends React.Component<IncomingProps> {

    updateAddress = (newParams: any) => {
        this.props.update({...this.props.address, ...newParams})
    }

    render() {
        return (<Form>
                <Form.Field
                    control={Input}
                    label='Street'
                    placeholder='street address'
                    value={this.props.address.address}
                    onChange={(event: React.SyntheticEvent<HTMLElement>, data: InputProps) => {
                        const value = data.value ?? '';
                        this.updateAddress({address: value});
                    }}
                    error={this.props.errors.address && {content: this.props.errors.address}}
                />
                <Form.Group widths='equal'>
                    <Form.Field
                        value={this.props.address.city}
                        control={Input}
                        label='City'
                        placeholder='city'
                        onChange={(event: React.SyntheticEvent<HTMLElement>, data: InputProps) => {
                            const value = data.value ?? '';
                            this.updateAddress({city: value});
                        }}
                        error={this.props.errors.city && {content: this.props.errors.city}}
                    />
                    <Form.Select
                        value={this.props.address.state}
                        options={UsStates}
                        label='State'
                        onChange={(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
                            this.updateAddress({state: data.value});
                        }}
                        error={this.props.errors.state && {content: this.props.errors.state}}
                    />
                    <Form.Field
                        value={this.props.address.zipCode}
                        control={Input}
                        label='Zip'
                        onChange={(event: React.SyntheticEvent<HTMLElement>, data: InputProps) => {
                            const value = data.value ?? '';
                            this.updateAddress({zipCode: value});
                        }}
                        error={this.props.errors.zipCode && {content: this.props.errors.zipCode}}
                    />
                </Form.Group>
            </Form>)
    }
}

export default AddressForm;