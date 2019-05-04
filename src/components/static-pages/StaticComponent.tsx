import React from "react";
import { Dimmer,  Loader} from "semantic-ui-react";
import {staticService} from "../../services/static.service";

//Define the expected props
interface Props  {
    //Define the props we expect
    pagePath:string;
    public:boolean
}

//Keep a state of open documents
interface MyState{
    html: string;


}
class StaticComponent extends React.Component<Props, MyState> {
    state = {html:""};


    /**
     * No need to keep the article in the app state.  Keep locally to allow it to be removed from mem
     */
    componentDidMount(){
        //If the user is logged in get the logged in
        let page :Promise<string>;

        //Now set it
        if(this.props.public){
            page = staticService.getPublicPage(this.props.pagePath)
        }else{
            page = staticService.getPrivatePage(this.props.pagePath)
        }

        //When it comes back use it
        page.then(
            //If successful html will be returned
            article => {
                //Update the state
                this.setState({html:article})
            },
            //If there was an error, show to the user
            errorResponse => {
                //Dispatch the error
                try {
                    this.setState({html:errorResponse.response.data.message});
                }catch(e){
                    this.setState({html:errorResponse.toString()});

                }

            }

        );
    };

    render(): React.ReactNode {
        if(this.state.html.length == 0) {
            return (
                <Dimmer inverted active>
                    <Loader size='small'></Loader>
                </Dimmer>
            );
        }else{
            return <div dangerouslySetInnerHTML={{__html: this.state.html}}/>;


        }
    }


}

export default StaticComponent