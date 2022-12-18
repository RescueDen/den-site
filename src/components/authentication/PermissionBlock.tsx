import {connect} from 'react-redux';


import ApplicationState from "../../state/ApplicationState";
import Permissions from "../../models/Permissions";


interface PermissionBlockProps {
    children: any
    reqPerm: string
}

interface StateProps {
    permissions?: Permissions
}


const PermissionBlock = (props: StateProps & PermissionBlockProps) => {
    //Check to see if I have the permissions to do this
    if (props && props.permissions && props.permissions.allowed(props.reqPerm)) {
        return props.children;
    } else {
        //Return null
        return null;
    }


}


/**
 * Map from the global state to things we need here
 * @param state
 * @param myProps
 */
function mapStateToProps(state: ApplicationState, myProps: PermissionBlockProps): StateProps & PermissionBlockProps {
    return {
        ...myProps,
        permissions: state.authentication.permissions
    };
}

export default connect(
    mapStateToProps
)(PermissionBlock);
