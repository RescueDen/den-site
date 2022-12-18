import React from 'react';
import {connect} from 'react-redux';
import ApplicationState from "../../state/ApplicationState";

import {ThunkDispatch} from "redux-thunk";
import {CategoryInfoSummary, LogSummary} from "../../models/Logging";
import {loggingActions} from "../../actions/logging.actions";
import {Tab} from "semantic-ui-react";
import LoggingTab from "./LoggingTab";


//Define the expected props
interface LinkProps {

}

interface StateProps {
    categorySummary: CategoryInfoSummary;
    logSummary: LogSummary;
    userAsmId: number;

}


interface DispatchProps {
    //And the actions that must be done
    getCategorySummary: () => any;
    getLogSummary: (asmId: number) => any;
    removeLog: (type: string, logId: number) => any;
}


/**
 * Show the logging details
 */
class Logging extends React.Component<LinkProps & StateProps & DispatchProps, any> {

    /**
     * Gets called once when the page loads.  Tell the system to download or update the summary
     */
    componentDidMount() {
        // reset login status
        this.props.getCategorySummary();
        this.props.getLogSummary(this.props.userAsmId);
    };


    //Build the panes
    buildTabs() {

        //Now add each
        if (this.props.categorySummary.categories) {
            return Object.keys(this.props.categorySummary.categories).map((catName: string) => {
                //And we have my data
                if (this.props.logSummary.recentLogs) {
                    return {
                        menuItem: catName,
                        render: () => <LoggingTab
                            catInfo={this.props.categorySummary.categories[catName]}
                            recentLogs={this.props.logSummary.recentLogs[catName]}
                            totalsSum={this.props.logSummary.totalsSum[catName]}
                            timeHistory={this.props.logSummary.historySummary[catName]}
                            removeLog={(id: number) => this.props.removeLog(catName, id)}

                        />
                    }
                } else {
                    return {
                        menuItem: catName,
                    }
                }
            });
        } else {
            return undefined
        }

    }

    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        //If we have the panes
        return (
            <Tab menu={{secondary: true, pointing: true}} panes={this.buildTabs()}/>
        );

    }
}

/**
 * Map from the global state to things we need here
 * @param state
 * @param myProps
 */
function mapStateToProps(state: ApplicationState, myProps: LinkProps): LinkProps & StateProps {
    return {
        ...myProps,
        userAsmId: state.authentication.loggedInUser ? state.authentication.loggedInUser.data.shelterId : -1,
        categorySummary: state.logging.categorySummary,
        logSummary: state.logging.loggingSummary
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, any>): DispatchProps {
    return {
        getCategorySummary: () => dispatch(loggingActions.getCategorySummary()),
        getLogSummary: (asmId: number) => dispatch(loggingActions.getLogSummary(asmId)),
        removeLog: (type: string, asmId: number) => dispatch(loggingActions.removeLog(type, asmId)),
    };

}

//https://stackoverflow.com/questions/48292707/strongly-typing-the-react-redux-connect-with-typescript
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Logging);

