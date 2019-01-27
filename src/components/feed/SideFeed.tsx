import React, {ReactNode} from "react";
import {Dropdown, Feed, Grid, Header, Icon, Label, Menu, Segment, Sidebar} from "semantic-ui-react";
import ApplicationState from "../../state/ApplicationState";
import {ThunkDispatch} from "redux-thunk";
import {feedActions} from "../../actions/feed.actions";
import {connect} from "react-redux";
import TheFeed from "./TheFeed";

//Income Props
interface FeedProps{
    children:any

}


//Setup up path props to get the current path
interface StateProps {
    feedShown:boolean
}

//Setup up path props to get the current path
interface DispatchProps {
    //And the actions that must be done
    toggleFeed: () => any;

}


class SideFeed extends React.Component<FeedProps&StateProps&DispatchProps> {



    /**
     * Re-render eveyr time this is called
     * @returns {*}
     */
    render() {
        return (
            <Sidebar.Pushable style={{minHeight:"100vh", overflow: "scroll"}}>
                <Sidebar
                    as={Menu}
                    animation='overlay'
                    icon='labeled'
                    vertical
                    // onHide={() => {
                    //     if(this.props.feedShown) {
                    //         this.props.toggleFeed();
                    //     }}}
                    visible={this.props.feedShown}
                    direction='right'

                >

                    <Label  corner='left' icon='close' onClick={() => this.props.toggleFeed()}/>
                    <TheFeed/>

                </Sidebar>
                <Sidebar.Pusher >
                    {this.props.children}
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );

    }

};

/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState,myProps:FeedProps ):FeedProps&StateProps {
    return {
        ...myProps,
        feedShown:state.feed.feedShown,
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>):DispatchProps {
    return {
        toggleFeed:() =>  dispatch(feedActions.toggleFeed()),
    };

}
export default connect (
    mapStateToProps,
    mapDispatchToProps
)(SideFeed);

