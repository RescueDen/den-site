import React from 'react'
import {connect} from "react-redux";
import ApplicationState from "../../state/ApplicationState";
import {animalActions} from "../../actions/animal.actions";
import AnimalState from "../../state/AnimalState";
import {ThunkDispatch} from "redux-thunk";
import {RouteComponentProps} from "react-router-dom";
import queryString from "query-string";
import {Document, Font, PDFViewer, StyleSheet, Page, PDFDownloadLink} from "@react-pdf/renderer";
import QRCode from 'qrcode'
import HalfPageKC from "./HalfPageKC";
import CawsAnimal from "../../models/CawsAnimal";
import {Button, Checkbox, Container, Dimmer, Grid, Icon, Input, Label, Loader} from "semantic-ui-react";
import FullPageKC from "./FullPageKC";
import RemoteSearch from "../animal/RemoteSearch";

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

const baseUrl = 'https://us01.sheltermanager.com/animal?id='


//Setup the fonts
// Register font
Font.register({ family: 'LemonTuesday', src: process.env.PUBLIC_URL+"/fonts/LemonTuesday.ttf" });
Font.register({ family: 'LeagueSpartan-Bold', src: process.env.PUBLIC_URL+"/fonts/LeagueSpartan-Bold.ttf" });
Font.register({ family: 'Gidole-Regular', src: process.env.PUBLIC_URL+"/fonts/Gidole-Regular.ttf" });
Font.register({ family: 'Arimo', src: process.env.PUBLIC_URL+"/fonts/Arimo-Regular.ttf" });

export const kcstyles = StyleSheet.create({
    page: { backgroundColor: 'white' },
    headerSection: {  backgroundColor:"#fafafa",color: 'black', textAlign: 'left'},
    aniNameSection: {
        fontFamily:'LemonTuesday', margin: "auto", marginLeft:"0", color:'#35b729', textAlign:'center', float:"left"
    },
    footerSection: {
        backgroundColor:"#eae2ff",
        color: 'black',
        display: "flex",
        flexDirection: "row",
        alignContent: "flex-start",
        justifyContent: "space-around",
        alignItems: "center"
    },
    sectionHeader:{
        fontFamily:'LeagueSpartan-Bold',
        color:'#ff5e0f'
    },
    infoRow:{
        fontFamily:'Gidole-Regular',
        color:'#000000'
    },
    bio:{
        fontFamily:'Gidole-Regular',
        color:'#000000',
        textAlign:"justify"
    },
    footerText:{
        fontFamily:'Arimo',
        color:'#000000',
        marginLeft:"5px"
    }
});


//Define the expected props
interface SearchState  {
    //Define the props we expect
    searchTerm: string

    //Store a list of things to render
    idList:number[];

    //Store the qr data to render based upon id
    qrData:{ [id: number]: string; }

    //Define if it is full page
    fullPage:boolean;
}


/**
 * This card shows the animal details
 */
class KCBuilder extends React.Component<IncomingProps&DispatchProps&LinkProps, SearchState> {
    state={searchTerm:"", idList:[] as number[], qrData: {} as { [id: number]: string; } , fullPage:true};

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

        //Check to see if the format was defined
        const format = params["format"];
        if(format == "full"){
            this.setFullPage(true)
        }else if (format == "half"){
            this.setFullPage(false);
        }



    };

    //Add new ids
    addId = (id:number) =>{
        this.setState({idList: [...this.state.idList, id]});

        //Make sure we have the animal
        this.props.downloadAnimal(id);

        //Build the qr code data
        this.buildQrCodes([id], {} as { [id: number]: string; });

    }
    addIds = (ids:number[]) =>{
        this.setState({idList: [...this.state.idList, ...ids]});

        //Make sure we have the animal
        ids.forEach((id:number) =>{
           this.props.downloadAnimal(id);


        });

        //Now build the qr codes
        this.buildQrCodes(ids, {} as { [id: number]: string; });
    }

    buildQrCodes = (ids:number[], newQr: { [id: number]: string; }) =>{

        //Get the next number
        const nextID = ids.pop();

        if(nextID) {
            QRCode.toDataURL(baseUrl + nextID, {
                color: {
                    dark: '#1a4789',  // Blue dots
                    light: '#0000' // Transparent background
                }
            }).then(data => {

                //Add the new qr code
                newQr[nextID]= data;

                //Now call the next one in the list
                this.buildQrCodes(ids,newQr);

            })
        }else{
            //We are done, save it
            //Wait some time
            this.setState(
                {
                    qrData: {...this.state.qrData, ...newQr}
                }
            );
        }



    }

    setFullPage = (fullPage:boolean) =>{
        this.setState({fullPage: fullPage});

    }

    buildPages = (aniDataList:CawsAnimal[]) =>{
        //Build the list of components
        let listOfPages:any[] = [];

        //If it is full page
        if(this.state.fullPage){
            //One page per kc
            listOfPages = aniDataList.map(data => {
                return (
                    <FullPageKC aniData={data} qrData={this.state.qrData[data.data.ID]}/>
                );
            });
        }else {
            //Do two pages at a time
            for (let i = 0; i < aniDataList.length; i += 2) {//Notice we go up by two
                //Get page one
                const data1 = aniDataList[i];
                const qr1 = this.state.qrData[data1.data.ID];
                //Now see if there is a second one
                let data2 = undefined;
                let qr2 = undefined;
                if (i + 1 < aniDataList.length) {
                    data2 = aniDataList[i + 1];
                    qr2 = this.state.qrData[data2.data.ID];
                }


                //Build a new page
                listOfPages.push(
                    <HalfPageKC key={"" + data1.data.ID + (data2 ? data2.data.ID : "")} aniDataFirst={data1}
                                aniDataSecond={data2} qrDataFirst={qr1} qrDataSecond={qr2}/>
                );

            }
        }
        return listOfPages;
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


        //Build the header
        return (
            <>
                <Container>
                    {/*Define a stackable grid to offset the header from the search box*/}
                    <Grid stackable columns={2}>
                        <Grid.Column floated='left' textAlign='left'>
                            <RemoteSearch selectAnimal={this.addId}/>
                        </Grid.Column>
                        <Grid.Column floated='right' textAlign='right' >

                            {/*  Add Button to download  */}
                            <PDFDownloadLink
                                key={this.state.idList.toString()+aniDataList.length+this.state.qrData.toString()+this.state.fullPage}
                                className={"ui button"}
                                document={
                                    <Document>
                                        {this.buildPages(aniDataList)}
                                    </Document>
                                }
                                fileName="kennelCards.pdf"
                            >
                                {({ blob, url, loading, error }) => (loading ? 'Loading...' : 'Download PDF')}
                            </PDFDownloadLink>


                            {/*    Allow switch between full and half*/}
                            <Button.Group>
                                <Button positive={!this.state.fullPage} onClick={() => this.setFullPage(false)}>Half</Button>
                                <Button.Or />
                                <Button  positive={this.state.fullPage} onClick={() => this.setFullPage(true)}>Full</Button>
                            </Button.Group>



                        </Grid.Column>
                    </Grid>
                    <div>
                        <Loader active={this.state.idList.length != aniDataList.length} />
                        <PDFViewer style={{width: '100%', height: '80vh'}}
                                   key={this.state.idList.toString() + aniDataList + aniDataList.length + this.state.qrData.toString() + this.state.fullPage}>
                            <Document>
                                {this.buildPages(aniDataList)}
                            </Document>
                        </PDFViewer>
                    </div>
                    }

                </Container>


            </>

        );

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

