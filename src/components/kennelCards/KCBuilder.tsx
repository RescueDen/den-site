import React from 'react'
import {connect} from "react-redux";
import ApplicationState from "../../state/ApplicationState";
import {animalActions} from "../../actions/animal.actions";
import AnimalState from "../../state/AnimalState";
import {ThunkDispatch} from "redux-thunk";
import {RouteComponentProps} from "react-router-dom";
import queryString from "query-string";
import {Document, Page, PDFViewer, Text, View} from "@react-pdf/renderer";
import FullPageKC from "./FullPageKC";


//Define the expected props
interface IncomingProps extends RouteComponentProps<any>  {

}

//Define the expected props
interface LinkProps  {
    //Define the props we expect
    cawsAnimalsDb: AnimalState

}




interface DispatchProps{
    //And the actions that must be done
    downloadAnimal: (id:number) => any;

}

//Define the expected props
interface SearchState  {
    //Define the props we expect
    searchTerm: string

    //Store a list of things to render
    idList:number[];

}


/**
 * This card shows the animal details
 */
class KCBuilder extends React.Component<IncomingProps&DispatchProps&LinkProps, SearchState> {
    state={searchTerm:"", idList:[] as number[]};

    /**
     * Gets called once when the page loads.  Tell the system to download that animal
     */
    componentDidMount(){
        //Get the query string
        const string = this.props.location.search;

        //Get the params
        const params = queryString.parse(string);

        //Get the ids
        const queryList = params["id"];

        //Do the thing based upon type
        if (queryList) {
            if (Array.isArray(queryList)) {
                //Cast as array
                const queryListArray = queryList as any[];

                //Map
                this.addIds(queryListArray.map((num:any) => {
                   return +num;

                }));

            }else{
                this.addId(+queryList);
            }
        }

        console.log(params);


    };

    //Add new ids
    addId = (id:number) =>{
        this.setState({idList: [...this.state.idList, id]});

        //Make sure we have the animal
        this.props.downloadAnimal(id);


    }
    addIds = (ids:number[]) =>{
        this.setState({idList: [...this.state.idList, ...ids]});

        //Make sure we have the animal
        ids.forEach((id:number) =>{
           this.props.downloadAnimal(id);
        });
    }


    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        //Build the list of animal data
        let aniDataList = this.state.idList.filter(id =>{
            return this.props.cawsAnimalsDb.animals[id] != undefined;

            }


        ).map( id =>{
            return this.props.cawsAnimalsDb.animals[id];
        })


        return (
            <>
                <PDFViewer style={{width: '100%', height: '80vh'}} key={this.state.idList.toString()}>
                    <Document>
                        {aniDataList.map(data => {
                            return (
                                <FullPageKC aniData={data}/>
                            );
                        })}
                    </Document>
                </PDFViewer>
            </>
        )


    }
};

/**
 * All of them share the same mapDispatchToProps
 * @param dispatch
 * @param ownProps
 */
function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>, ownProps:IncomingProps):DispatchProps {
    return {
        downloadAnimal:(id:number) =>  dispatch(animalActions.getAnimal(id))
    };

}


/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState,props:IncomingProps ): IncomingProps&LinkProps {

    return {
        ...props,
        cawsAnimalsDb:state.animals,
    };
}


//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(KCBuilder);

