
//Define the expected props
import {RouteComponentProps, withRouter} from "react-router";
import React from "react";
import ApplicationState from "../../state/ApplicationState";
import {connect} from "react-redux";
import {PublicVoucherViewData, Voucher, VoucherInfo} from "../../models/Voucher";
import {voucherService} from "../../services/voucher.service";
import {Container, Dimmer, Header, Icon, Image, Loader, Segment, Table} from "semantic-ui-react";
import CawsAnimal from "../../models/CawsAnimal";
import AnimalBio from "../animal/details-components/AnimalBio";
import AnimalVaxxHistory from "../animal/details-components/AnimalVaxxHistory";
import VoucherInfoView from "./VoucherInfoView";
import NonShelterAnimalTable from "./NonShelterAnimalTable";
import CAWSLogo from "../../assets/logos/xCAWS_logo_sideways.png"

interface LinkProps extends RouteComponentProps<any> , RouteComponentProps<any> {

    //Keep the voucherID
    voucherSecret?:string;

}


//Define the expected props
interface State {
    //Keep a voucher in mem
    voucherPublicView?:PublicVoucherViewData;
    error?:string;
}



/**
 * This card shows the animal details
 */
class VetVoucherView extends React.Component<LinkProps, State>  {
    state={voucherPublicView:undefined, error:undefined}
    /**
     * Gets called once when the page loads.  Tell the system to download that animal
     */
    componentDidMount(){
        this.loadVoucherView();

    };
    componentDidUpdate(prevProps:LinkProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.voucherSecret !== prevProps.voucherSecret) {
            this.loadVoucherView();
        }
    }


    loadVoucherView = () =>{
        //If there is a
        if(this.props.voucherSecret) {
            voucherService.getPublicVoucherView(this.props.voucherSecret)
            //When it comes back use it
                .then(
                    //If successful html will be returned
                    voucherView => {
                        //Update the state
                        this.setState({voucherPublicView: voucherView})

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
    }

    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {

        if(this.props.voucherSecret && this.state.voucherPublicView == undefined) {
            return(
                <Dimmer active inverted>
                    <Loader size='large'>Loading Voucher</Loader>
                </Dimmer>
            );

        }else if(this.props.voucherSecret && this.state.voucherPublicView) {
            //Get the data
            const voucherPublicData = this.state.voucherPublicView! as PublicVoucherViewData;

            //We have a voucher ID
            return (
                <Container>
                    <Header as='h1'>
                        CAWS Voucher {voucherPublicData.voucher.code}
                        <Header.Subheader>
                            Please reference the voucher code on all invoices.
                        </Header.Subheader>
                    </Header>

                    {/*Voucher Info*/}
                    <Segment>
                        <p>
                            Doctor and Staff, thank you for your support and assistance! Please bill CAWS for the amount due above the client's share, and please Include this voucher with that billing. Thank You!
                        </p>
                        <VoucherInfoView
                            voucher={voucherPublicData.voucher}
                            type={voucherPublicData.type}
                            treatments={voucherPublicData.treatments}
                        />
                    </Segment>

                    {voucherPublicData.animals.map(aniData =>{
                        //Convert to a caws animal
                        const aniClass = new CawsAnimal(aniData);

                        //Add in simple picture
                        return <Segment>
                            <Header as='h2'>{aniClass.getCodeAndName()}</Header>
                            <Header.Subheader>
                                Please reference the animal code and name on all invoices.
                            </Header.Subheader>
                            <Image centered={true} src={aniClass.getImageUrl()} size='small'/>
                            <AnimalBio animal={aniClass}/>
                            <AnimalVaxxHistory animal={aniClass}/>

                        </Segment>
                    })}
                    {voucherPublicData.voucher.animalInfo.length > 0 &&
                        <Segment>
                            <Header as='h2'>Other Animals</Header>
                            <NonShelterAnimalTable
                                animals={voucherPublicData.voucher.animalInfo}
                            />
                        </Segment>

                    }

                    {/*Show a table of related people*/}
                    <Table celled padded>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell singleLine>Relationship</Table.HeaderCell>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Email</Table.HeaderCell>
                                <Table.HeaderCell>Phone</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {voucherPublicData.movements.map(movement =>{
                                return (
                                    <Table.Row>
                                        <Table.Cell>{movement.MovementType}</Table.Cell>
                                        <Table.Cell>{movement.FIRSTNAME} {movement.LASTNAME}</Table.Cell>
                                        <Table.Cell>{movement.EMAIL}</Table.Cell>
                                        <Table.Cell>{movement.PHONE}</Table.Cell>
                                    </Table.Row>

                                );

                            })}
                            {voucherPublicData.voucher.other_people.map(person =>{
                                return (
                                    <Table.Row>
                                        <Table.Cell></Table.Cell>
                                        <Table.Cell>{person.firstname} {person.lastname}</Table.Cell>
                                        <Table.Cell>{person.email}</Table.Cell>
                                        <Table.Cell></Table.Cell>
                                    </Table.Row>

                                );

                            })}
                        </Table.Body>
                    </Table>
                    {this.state.error}
                    <Image
                        centered={true}
                        src={CAWSLogo}
                    />
                </Container>
            )
        }else{
            return (
              <Container>
                  <Segment>
                      The Voucher lookup id must be specified.
                      {this.state.error}
                  </Segment>
              </Container>
            );
        }


    }
};


/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState, myProps:LinkProps): LinkProps {

    return {
        ...myProps,
        voucherSecret:myProps.match.params.voucherSecret
    };
}


//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
const PublicVoucherViewerWithOutRouter =  connect(
    mapStateToProps
)(VetVoucherView);


//Wrap with a withRouter so we get the current location
export default withRouter<LinkProps>(props => <PublicVoucherViewerWithOutRouter {...props}/>);