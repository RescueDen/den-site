import React from 'react';

// @ts-ignore
import TableauReport from 'tableau-react-embed';
import {ResponsiveOnUpdateData} from "semantic-ui-react/dist/commonjs/addons/Responsive";
import {Responsive} from "semantic-ui-react";


interface MyProps{
    url: string;

}

//Store the hub state
interface MyState{


    //Keep the width and height
    width:number;
    height:number;

}


class TableauWidthWrapper extends React.Component<MyProps, MyState> {
    state={width:100, height:100}


    //Update the width
    updateWidth = (event: React.SyntheticEvent<HTMLElement>, data: ResponsiveOnUpdateData) =>{
        //Get the new width
        let newWidth = this.state.width;
        let newHeight = this.state.height;

        //Set the state based upon some requirements
        if(data.width > 800){
            newWidth = 1200;
            newHeight = 1127;
        }else if (data.width > 500){
            newWidth = 1200;
            newHeight = 1127;
        }else{
            newWidth = data.width;
            newHeight = 1877;
        }



        this.setState({width:newWidth, height:newHeight});
    }


    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {

        //Define the constants
        const options = {
            hideTabs: false,
            width:this.state.width,
            height:this.state.height
            // All other vizCreate options are supported here, too
            // They are listed here: https://onlinehelp.tableau.com/current/api/js_api/en-us/JavaScriptAPI/js_api_ref.htm#ref_head_9
        };

        return (
            <Responsive
                fireOnMount
                onUpdate={this.updateWidth}>
                <TableauReport
                    key={this.state.width}
                    url={this.props.url}
                    options={options} // vizCreate options
                />


            </Responsive>

        );


    }


}

export default TableauWidthWrapper;

// {/*<Segment>*/}
// {/*        <div ref={this.myRef} />;*/}
// {/*        /!*{JSON.stringify(this.state.adoptions)}*!/*/}
// {/*        /!*{this.state.error &&*!/*/}
// {/*        /!*<p>{this.state.error}</p>*!/*/}
// {/*        }*/}
// {/*    </Segment>*/}