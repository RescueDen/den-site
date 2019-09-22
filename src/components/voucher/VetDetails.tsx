
//Define the expected props
import React from "react";
import {Button, Header, Modal, Image, Table} from "semantic-ui-react";
import {
    Vet
} from "../../models/Voucher";

interface Props {
    vet:Vet;
}

class VetDetails extends React.Component<Props> {

    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        return (
            <Modal trigger={<Button compact basic>{this.props.vet.name}</Button>}>
                <Modal.Header>{this.props.vet.name}</Modal.Header>
                <Modal.Content image>
                    {this.props.vet.logoUrl && this.props.vet.logoUrl.length > 0 &&
                    <Image centered size='medium' src={this.props.vet.logoUrl}/>
                    }
                    <Modal.Description>
                        <p><b>Address:</b> {this.props.vet.address}</p>
                        <p><b>Phone:</b> {this.props.vet.phone}</p>
                        <p><b>Url:</b> <a href={this.props.vet.site}>{this.props.vet.site}</a></p>
                        <p><b>Notes:</b><br/>{this.props.vet.notes}</p>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
};

export default VetDetails;
