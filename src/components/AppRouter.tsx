import React from 'react';

//Load in the routes
import { BrowserRouter, Route } from 'react-router-dom';
import PrivateRoute from './authentication/PrivateRoute';

//Load in the possible paths
import LoginPage from './authentication/LoginPage'
import AlertDisplay from './AlertDisplay';

//And the main app component
import App from './app/App'
import {Container} from "semantic-ui-react";
import RegisterPage from "./authentication/RegisterPage";
import ActivationPage from "./authentication/ActivationPage";
import PasswordResetPage from "./authentication/PasswordResetPage";
import HelpViewer from "./static-pages/HelpViewier";
import VetVoucherView from "./voucher/VetVoucherView";

//Define the class
class AppRouter extends React.Component{


    //The app router just shows the parts of the different
    render() {
        return (
            <div>
                {/*Always show the the alerts*/}
                <AlertDisplay/>

                {/*Go to different components depending upon the path specified*/}
                <BrowserRouter >
                    <div>
                        <Container>
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                            <Route path="/activate" component={ActivationPage} />
                            <Route path="/passwordreset" component={PasswordResetPage} />
                            <Route path="/loginhelp" component={HelpViewer} />
                            <Route path="/loginhelp" component={HelpViewer} />
                            <Route key={'/vet/voucher/vouchers'} path="/vet/voucher/:voucherSecret" component={VetVoucherView} />

                        </Container>
                        <PrivateRoute to={'/login'} exclude={["/login", "/register","/activate", "/passwordreset", "/loginhelp", "/loginhelp/",'/vet/voucher']} path="/" component={App} />

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