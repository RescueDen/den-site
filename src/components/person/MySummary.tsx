import React from "react";
import {Header, Icon, Segment, SemanticICONS, Table} from "semantic-ui-react";
import CawsUser from "../../models/CawsUser";
import {formatDate} from "../../utils/date-formater";



//Define the expected props
interface LinkProps  {
    //Define the props we expect
    user:CawsUser;

}

//Add a private support function to create the row
const createRow = ( name:string, value:string, ...icons:SemanticICONS[]) =>{
    return (
        <Table.Row>
            <Table.Cell>
                <Header as='h4' image>
                    {/*For each icon add it*/}
                    {icons.map(icon => <Icon key={icon.toString()} name={icon} />)}
                    <Header.Content>
                        {name}
                    </Header.Content>
                </Header>
            </Table.Cell>
            <Table.Cell>{value}</Table.Cell>
        </Table.Row>
    );
}
/**
 * Provides a quick summary of that person
 * @param myProps
 * @constructor
 */
const MySummary =  (myProps:LinkProps) => {


    return (
        <Segment>
            <Header as="h2">My Information</Header>

            {/*Add in a table with their information*/}
            <Table basic='very' style={{margin: "auto"}} celled collapsing>
                <Table.Body>
                    {createRow("E-Mail", myProps.user.data.email, "mail")}
                    {createRow("Address", myProps.user.data.address+","+myProps.user.data.city + " " + myProps.user.data.zip, "home")}
                    {createRow("First Foster Date", formatDate(myProps.user.data.firstfosterdate) , "calendar outline")}
                    {createRow("Average Foster Time", myProps.user.data.avgfostertime + "(days)", "calendar outline")}
                    {createRow("Days Since Last Foster", myProps.user.data.dayssincelastfoster + "(days)", "calendar outline")}
                    {createRow("Tags", myProps.user.data.additionalflags , "tags")}
                    {createRow("Last ASM Update", myProps.user.data.lastUpdateFromAsm?myProps.user.data.lastUpdateFromAsm.toString() :"" , "clock")}

                </Table.Body>
            </Table>
            <p>If any of this information needs to be updated please email info@caws.org</p>

        </Segment>
    );
}

export default MySummary;