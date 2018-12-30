import React from 'react';
import JSX from 'react';

import {
    Dimmer, Header, Icon,
    Image,
    Loader,
    Segment, Table
} from "semantic-ui-react";
import  {EventData} from "../../models/Events";

import {eventsService} from "../../services/events.service";
import {formatDate} from "../../utils/date-formater";
import {ExistingSignUps, SignUpResponse} from "../../models/SignUp";
import Form, {WidgetProps} from "react-jsonschema-form-semanticui-fixed";
import MyFosterSelection from "../forms/MyFosterSelection";

//Define the expected props
interface LinkProps  {

    signups: ExistingSignUps
    selectedRow?: number
    selectRow: (row:number) => any;
    deleteRow: (row:number) => any;
}




/**
 * Show the details of a single up coming event
 */
class SignUpsTable extends React.Component<LinkProps> {

    //Build the table rows
    buildTable() : JSX.ReactNode[]{

        //Start to build the list of React
        let tblRows: JSX.ReactNode[] = [];

        //Add each row
        for(let ind =0; ind < this.props.signups.rowids.length; ind++){
            tblRows.push(
              <Table.Row active={this.props.signups.rowids[ind] == this.props.selectedRow}>
                  {/*Output each row for the header*/}
                  {this.buildRow(ind)}

              </Table.Row>
            );
        }


        return tblRows;

    }
    //Build the table rows
    buildRow(idx: number) : JSX.ReactNode[]{
        //Start to build the list of React
        let rowValues: JSX.ReactNode[] = [];

        //Get the current values
        const values = this.props.signups.values[idx];

        //March over each header
        let h =0;

        //Add each value
        for(; h < values.length; h++){
            rowValues.push(<Table.Cell>{values[h]}</Table.Cell>)
        }
        //Fill in any remaining blanks
        for(; h < this.props.signups.headers.length; h++){
            rowValues.push(<Table.Cell>{values[h]}</Table.Cell>)
        }

        for(; h < this.props.signups.headers.length; h++ ){
            //If we have the number of values
            rowValues.push(<Table.Cell></Table.Cell>)

        }

        //Add an edit button and link
        rowValues.push(
            <Table.Cell >
                <Icon
                    onClick={() => this.props.selectRow(this.props.signups.rowids[idx])}
                    name="edit"
                />
                <Icon
                onClick={() => this.props.deleteRow(this.props.signups.rowids[idx])}
                name="delete"
                />


            </Table.Cell>
        );

        return rowValues;

    }

    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {

        //Return the
        return(
        <Table celled>
            {/*Add the table header*/}
            <Table.Header>
                <Table.Row>
                    {this.props.signups.headers.map(header =>{
                        return <Table.HeaderCell key={header}>{header}</Table.HeaderCell>
                    })}
                    {/*Add an extra row for edit*/}
                    <Table.HeaderCell key="edit">Edit</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            {/*Now add each row*/}
            <Table.Body>
                {this.buildTable()}
            </Table.Body>

        </Table>

        );



    }
};

export default SignUpsTable;