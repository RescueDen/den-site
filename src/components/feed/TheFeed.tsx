import React, {ReactNode} from "react";
import {Dropdown, Feed, Grid, Header, Icon, Label, Menu, Segment, Sidebar} from "semantic-ui-react";
import {MenuItem} from "../menu/NavBar";
import {RouteComponentProps, RouteProps} from "react-router";
import {MenuMode} from "../menu/ResponsiveNavBar";
import ApplicationState from "../../state/ApplicationState";
import {ThunkDispatch} from "redux-thunk";
import {feedActions} from "../../actions/feed.actions";
import {connect} from "react-redux";
import {FeedItemData} from "../../models/Feed";
import FeedItem from "./FeedItem";

//Income Props
interface FeedProps{
    children:any

}


//Setup up path props to get the current path
interface StateProps {
    feedShown:boolean
    feedItems:FeedItemData[]
}

//Setup up path props to get the current path
interface DispatchProps {
    //And the actions that must be done
    toggleFeed: () => any;
    updateFeed: () => any;

}


class TheFeed extends React.Component<FeedProps&StateProps&DispatchProps> {



    /**
     * Gets called once when the page loads.  Tell the system to download that animal
     */
    componentDidMount(){
        // get the forms
        this.props.updateFeed();

    };
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

                    <Header as='h2'
                            icon>
                        <Icon name='feed'  />
                        <Header.Content>The CAWS Feed
                            <Header.Subheader>See what is happening in the world of CAWS</Header.Subheader>
                        </Header.Content>
                    </Header>
                    <Feed >
                        {this.props.feedItems.map( item =>{
                            return <FeedItem key={item.id} data={item}/>
                        })}
                    </Feed>
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
        feedItems:state.feed.feedItems
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>):DispatchProps {
    return {
        toggleFeed:() =>  dispatch(feedActions.toggleFeed()),
        updateFeed:() => dispatch(feedActions.updateFeed())
    };

}
export default connect (
    mapStateToProps,
    mapDispatchToProps
)(TheFeed);

