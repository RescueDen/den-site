import React from 'react';

//Load in the routes
import { BrowserRouter, Route } from 'react-router-dom';
import PrivateRoute from './authentication/PrivateRoute';

//Load in the possible paths
import LoginPage from './authentication/LoginPage'
import AlertDisplay from './AlertDisplay';

//And the main app component
import App from './app/App'

//Define the class
class AppRouter extends React.Component{


    //The app router just shows the parts of the different
    render() {
        return (
            <div className="ui container">
                {/*Always show the the alerts*/}
                <AlertDisplay/>

                {/*Go to different components depending upon the path specified*/}
                <BrowserRouter >
                    <div>
                        <PrivateRoute path="/" component={App} />
                        <Route path="/login" component={LoginPage} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }



};



// export default connect(
//     mapStateToProps,
//     {login:userActions.login}
// )(AppRouter);

export default AppRouter;