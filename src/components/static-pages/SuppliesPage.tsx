import React from "react";
import {Grid, Header, Image, Segment, SemanticICONS, Table} from "semantic-ui-react";
import fromFood from '../../assets/pictures/frommFood.jpg'
import FormsSummary, {isFormItemData} from "../../models/FormsSummary";
import {connect} from "react-redux";
import ApplicationState from "../../state/ApplicationState";
import {ThunkDispatch} from "redux-thunk";
import {formsActions} from "../../actions/forms.actions";
import FormViewer from "../forms/FormViewer";


//Define the expected props
interface LinkProps {
    //Define the props we expect
    formsSummary: FormsSummary

}

interface DispatchProps{
    //And the actions that must be done
    getFormsSummary: () => any;

}

const suppliesFormId = "1DGIXYL4Ozu2doVrpopSB4U1qwTj-GBRJ";

/**
 * Provides a quick summary of that person
 * @param myProps
 * @constructor
 */
class SuppliesPage extends React.Component<LinkProps&DispatchProps > {

    /**
     * Gets called once when the page loads.  Tell the system to download that animal
     */
    componentDidMount(){
        // get the forms
        this.props.getFormsSummary();

    };

    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {

        //See if there is a suppliesForm
        const suppliesForm  = this.props.formsSummary.findArticleItem(suppliesFormId)

        return (
            <div>
                <Header as="h2">Supplies</Header>

                <Segment>
                    {/*Add in the info about the dog foster food*/}
                    <Header as="h3">Foster Dog Food</Header>

                    {/*Add in the information about the food*/}
                    <p>In an effort to help our fosters, CAWS subsidies <a
                        href="https://frommfamily.com/products/dog/classic/dry/#adult">Fromm Adult Food</a>. A 33lb bag
                        is available for $20 and can be used for fosters and your personal dogs.
                        The <a href="http://www.dogsmeow.com/">Dog’s Meow</a> has generously offered to distribute this
                        food for us. You can purchase bags now, and pick them up at either Dog’s Meow location.
                        Just select the store location and pay via paypal. You will receive an email voucher with a
                        unique ID that must be shown to the Dog’s Meow Staff during pickup.
                        You can either print this or open it on your phone. This is a new system so please use the form
                        on the dashboard to let us know if you have any problems.</p>
                    <Grid stackable columns={2}>
                        <Grid.Column textAlign='center'>
                            <Image centered={true} size='medium' src={fromFood}/>

                        </Grid.Column>
                        <Grid.Column>
                            <div dangerouslySetInnerHTML={{
                                __html: "<form action=\"https://www.paypal.com/cgi-bin/webscr\" method=\"post\" target=\"_top\">\n" +
                                    "<input type=\"hidden\" name=\"cmd\" value=\"_s-xclick\">\n" +
                                    "<input type=\"hidden\" name=\"hosted_button_id\" value=\"GL2Q6VZX62CDS\">\n" +
                                    "<table>\n" +
                                    "<tr><td><input type=\"hidden\" name=\"on0\" value=\"Status\">Status</td></tr><tr><td><select name=\"os0\">\n" +
                                    "\t<option value=\"Volunteer\">Volunteer $25.00 USD</option>\n" +
                                    "\t<option value=\"Current Fosterer\">Current Fosterer $20.00 USD</option>\n" +
                                    "</select> </td></tr>\n" +
                                    "<tr><td><input type=\"hidden\" name=\"on1\" value=\"Pick-Up Location\">Pick-Up Location</td></tr><tr><td><select name=\"os1\">\n" +
                                    "\t<option value=\"SLC: 2047 East 3300 South, Salt Lake City, Utah, 84109\">SLC: 2047 East 3300 South, Salt Lake City, Utah, 84109 </option>\n" +
                                    "\t<option value=\"Draper: 866 E 12300 S, Draper Utah, 84020\">Draper: 866 E 12300 S, Draper Utah, 84020 </option>\n" +
                                    "</select> </td></tr>\n" +
                                    "</table>\n" +
                                    "<input type=\"hidden\" name=\"currency_code\" value=\"USD\">\n" +
                                    "<input type=\"image\" src=\"https://www.paypalobjects.com/en_US/i/btn/btn_paynowCC_LG.gif\" border=\"0\" name=\"submit\" alt=\"PayPal - The safer, easier way to pay online!\">\n" +
                                    "<img alt=\"\" border=\"0\" src=\"https://www.paypalobjects.com/en_US/i/scr/pixel.gif\" width=\"1\" height=\"1\">\n" +
                                    "</form>\n" +
                                    "\n"
                            }}>
                            </div>
                        </Grid.Column>
                    </Grid>
                </Segment>

                {/*Add the form to request information*/}
                {suppliesForm && isFormItemData(suppliesForm)  &&
                    <FormViewer key={suppliesForm.id} formData={suppliesForm} />


                }
            </div>
        );
    }
}

/**
 * All of them share the same mapDispatchToProps
 * @param dispatch
 * @param ownProps
 */
function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>):DispatchProps {
    return {
        getFormsSummary:() =>  dispatch(formsActions.getFormsSummary())
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
        formsSummary:state.forms.formsSummary,
    };
}

//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(SuppliesPage);

