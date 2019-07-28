import React from 'react';
import {Header, Dropdown, DropdownProps, Responsive} from "semantic-ui-react";

import LivesSavedDisplay from "./LivesSavedDisplay";
import {ResponsiveOnUpdateData} from "semantic-ui-react/dist/commonjs/addons/Responsive";


//Store the hub state
interface MyState{
    //Keep the current year
    year:number;

}


class LivesSavedPage extends React.Component<any, MyState> {
    state={year:(new Date()).getFullYear()}


    getYearOptions = () =>{
        //Build a list
        let years = [];

        //Add each year
        for(let y = 2015; y <= (new Date()).getFullYear(); y++){
            years.push({
                key: y,
                text: `${y}`,
                value: y,
            });

        }
        return years;
    }

    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {

        return (
            <>
                <Header as={"h1"} textAlign='center'>Lives Saved!</Header>
                <Dropdown
                    placeholder='Compact'
                    compact
                    selection
                    value={this.state.year}
                    options={this.getYearOptions()}
                    onChange={
                        (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
                            if(data.value) {
                                this.setState({year: +data.value});
                            }
                        }
                    }
                />
                <LivesSavedDisplay
                    style={{

                    }}
                    year={this.state.year}
                />

            </>
        );





    }
}

export default LivesSavedPage;