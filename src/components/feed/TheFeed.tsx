import React from "react";
import {Feed, Header, Icon} from "semantic-ui-react";
import ApplicationState from "../../state/ApplicationState";
import {ThunkDispatch} from "redux-thunk";
import {feedActions} from "../../actions/feed.actions";
import {connect} from "react-redux";
import {FeedItemData} from "../../models/Feed";
import FeedItem from "./FeedItem";


//Setup up path props to get the current path
interface Props {
}


//Setup up path props to get the current path
interface StateProps {
    feedItems: FeedItemData[]
}

//Setup up path props to get the current path
interface DispatchProps {
    updateFeed: () => any;

}


class TheFeed extends React.Component<Props & StateProps & DispatchProps> {


    /**
     * Gets called once when the page loads.  Tell the system to download that animal
     */
    componentDidMount() {
        // get the forms
        this.props.updateFeed();

    };

    /**
     * Re-render eveyr time this is called
     * @returns {*}
     */
    render() {
        return (
            <>

                <Header as='h2'
                        icon textAlign='center'>
                    <Icon name='feed'/>
                    <Header.Content>The CAWS Feed
                        <Header.Subheader>See what is happening in the world of CAWS</Header.Subheader>
                    </Header.Content>
                </Header>
                <Feed>
                    {this.props.feedItems.map(item => {
                        return <FeedItem key={item.id} data={item}/>
                    })}
                </Feed>
            </>

        );

    }

}

/**
 * Map from the global state to things we need here
 * @param state
 * @param myProps
 */
function mapStateToProps(state: ApplicationState, myProps: Props): Props & StateProps {
    return {
        ...myProps,
        feedItems: state.feed.feedItems
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, any>): DispatchProps {
    return {
        updateFeed: () => dispatch(feedActions.updateFeed())
    };

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TheFeed);

