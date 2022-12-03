import React from 'react';
import {Header, Dropdown, DropdownProps, Responsive, Image} from "semantic-ui-react";

import LivesSavedDisplay from "./LivesSavedDisplay";
// import TableauWidthWrapper from "./TableauWidthWrapper";
import BFImage from "../../assets/pictures/bestFriends2025.jpg";
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
                <Header size='large' textAlign='center'>Lives Saved!</Header>
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
                    key={this.state.year}
                    year={this.state.year}
                />
                <Header size='large' textAlign='center'>CAWS Rescue Progress</Header>
                {/*<TableauWidthWrapper url={"https://public.tableau.com/views/CAWSRescueStatistics/CAWSRescueStatistics"} />*/}
                <Header size='large' textAlign='center'>Utah and USA Rescue Progress</Header>
                <p>
                    Check out how our community compares to Utah and the rest of the country using the Best Friends' Community Lifesaving Dashboard
                </p>
                <a href='https://bestfriends.org/2025-goal' target="_blank">
                    <Image centered={true} size='medium' src={BFImage} />
                </a>

            </>
        );





    }
}

export default LivesSavedPage;