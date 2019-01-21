import React from 'react';

import {CategoryInfo, LogData, MonthInfo} from "../../models/Logging";
import {Container, Form, Header, Icon, Responsive, Tab, Table} from "semantic-ui-react";
import {formatDate} from "../../utils/date-formater";
import {BarChart, BarData, LineChart, LineData} from 'react-easy-chart';
import {ResponsiveOnUpdateData} from "semantic-ui-react/dist/commonjs/addons/Responsive";
import LogForm from "./LogForm";

//Define the expected props
interface Props {
    catInfo:CategoryInfo;
    recentLogs?: LogData[];
    timeHistory?: MonthInfo[];
    total?: number

    removeLog: (id:number) => any

};


//Define the expected props
interface State {
    plotWidth:number
    plotHeight:number

};


//Store the month ab
const months = ['Jan', "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Provides a quick summary of that person
 * @param myProps
 * @constructor
 */
class LoggingTab extends React.Component<Props, State> {
    state= {plotWidth:100, plotHeight:100}

    //Update the plot size
    updatePlot = (e:React.SyntheticEvent<HTMLElement>, { width }: ResponsiveOnUpdateData) =>{

        this.setState({plotHeight:width*.4, plotWidth:width*.8})
    }

    buildRecentSegment() {
        const units = this.props.catInfo.unit.charAt(0).toUpperCase() + this.props.catInfo.unit.slice(1);

        return (
            <div>
                <Header as='h3'>Recent {this.props.catInfo.unit}</Header>
                <Table singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Type</Table.HeaderCell>
                            <Table.HeaderCell>{units}</Table.HeaderCell>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Comments</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {/*Add each row*/}
                        {this.props.recentLogs &&
                        this.props.recentLogs.map(log =>{
                            return (
                                <Table.Row>
                                    <Table.Cell>{this.props.catInfo.types[log.type+""].name}</Table.Cell>
                                    <Table.Cell>{log.value}</Table.Cell>
                                    <Table.Cell>{formatDate(log.date)}</Table.Cell>
                                    <Table.Cell>{log.comments}</Table.Cell>
                                    <Table.Cell
                                        onClick = {() => {this.props.removeLog(log.id)}}
                                    >
                                        <Icon name='delete'/>
                                    </Table.Cell>
                                </Table.Row>
                            );

                        })}
                    </Table.Body>
                </Table>

            </div>
        );
    }

    buildLogForm() {
        return (
          <div>
              <Header as='h3'>Log {this.props.catInfo.unit}</Header>
              <LogForm
                   catInfo={this.props.catInfo}
              />
          </div>
        );
    }



    /**
     * Look up the data for that months
     **/
    lookUpMonthValue(mon:number, year:number):number{
        if (this.props.timeHistory){
            for (let i = 0; i < this.props.timeHistory.length; i++){
                //If the year and month match return
                if(mon == this.props.timeHistory[i].month && year == this.props.timeHistory[i].year){
                    return this.props.timeHistory[i].total
                }

            }

            return 0.0;
        }else{
            return 0.0;
        }

    }


    buildTimeSummary() {

        //Only build the summary if we have at least one history
        if(this.props.timeHistory && this.props.timeHistory.length > 0){
            //Determine the first year month
            let mon = this.props.timeHistory[0].month;
            let yr = this.props.timeHistory[0].year;

            //Build the data
            let data = [] as BarData[];

            //While the data is in the past
            const now = new Date();
            const currentMonth =  now.getMonth()+1;
            const currentYear =  now.getFullYear();

            //Add all of the children
            while(mon <= currentMonth || yr < currentYear){
                //Get the current total
                const total = this.lookUpMonthValue(mon, yr);

                //Get the month name
                let name = months[mon-1];
                if (mon == 1){
                    name +=  "-" + yr
                }
                //Store the info
                data.push(
                    {
                        x: name,
                        y: total
                    }
                );

                //Bump up the month
                mon ++;

                //If we are into next year fix
                if(mon > 12){
                    mon = 1
                    yr++;
                }


            }
            return (
                <Responsive fireOnMount onUpdate={this.updatePlot}>
                    <Header as='h3'>History</Header>
                    <BarChart
                        axisLabels={{x: 'Month', y: "tests"}}
                        width={this.state.plotWidth}
                        height={this.state.plotHeight}
                        axes
                        datePattern="%b-%Y"
                        data={data}
                        colorBars
                        margin={{top: 0, right: 0, bottom: 30, left: 100}}
                    />
                </Responsive>
            );



        }else{
            return undefined
        }


    }


    render() {

        //If we have the panes
        return (
            <Tab.Pane attached={false} key={this.props.catInfo.name}>
                <p>{this.props.catInfo.description}</p>

                {/*Add more recent hours*/}
                {this.buildLogForm()}
                <br/>
                {/*If there are recent logs add them*/}
                {this.props.recentLogs && this.props.recentLogs.length > 0 &&
                this.buildRecentSegment()
                }


                <br/>
                {/*Add all of the info*/}
                {this.props.timeHistory &&
                    this.buildTimeSummary()
                }


            </Tab.Pane>
        );
    }

}


//https://stackoverflow.com/questions/48292707/strongly-typing-the-react-redux-connect-with-typescript
export default LoggingTab;
