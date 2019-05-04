import React from 'react';
import CawsAnimal from "../../models/CawsAnimal";
import {StyleSheet,Font, Page, Text, View,Image} from "@react-pdf/renderer";
import cawsLogo from "../../assets/logos/xCAWS_logo_full.png";
import InfoSection from "./InfoSection";
import BioSection from "./BioSection";
import Footer from "./Footer";



//Define the expected props
interface Props{
    //Define the props we expect
    aniData: CawsAnimal;
    qrData?:string;
}

//Setup the fonts
// Register font
Font.register({ family: 'LemonTuesday', src: process.env.PUBLIC_URL+"/fonts/LemonTuesday.ttf" });
Font.register({ family: 'LeagueSpartan-Bold', src: process.env.PUBLIC_URL+"/fonts/LeagueSpartan-Bold.ttf" });
Font.register({ family: 'Gidole-Regular', src: process.env.PUBLIC_URL+"/fonts/Gidole-Regular.ttf" });
Font.register({ family: 'Arimo', src: process.env.PUBLIC_URL+"/fonts/Arimo-Regular.ttf" });

export const kcstyles = StyleSheet.create({
    page: { backgroundColor: 'white' },
    headerSection: { height:'1.4in', backgroundColor:"#fafafa",color: 'black', textAlign: 'left'},
    aniNameSection: {
        width:'9.7in',
        fontFamily:'LemonTuesday', margin: "auto", marginLeft:"0", color:'#35b729', textAlign:'center',fontSize:'.8in', float:"left"
    },
    bodySection: { height:'6.1in' },
    footerSection: {
        height:'1.0in',
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
        fontSize:'0.25in',
        color:'#ff5e0f'
    },
    infoRow:{
        fontFamily:'Gidole-Regular',
        fontSize:'0.2in',
        color:'#000000'
    },
    bio:{
        fontFamily:'Gidole-Regular',
        fontSize:'0.2in',
        color:'#000000',
        textAlign:"justify"
    },
    footerText:{
        fontFamily:'Arimo',
        fontSize:'0.25in',
        color:'#000000',
        marginLeft:"5px"
    }
});


const FullPageKC =  (props:Props) => {




    return (
        <Page size="LETTER" orientation='landscape' >
            <View style={kcstyles.headerSection} >
                <Text style={kcstyles.aniNameSection}>{props.aniData.data.NAME}</Text>
                <Image src={cawsLogo}
                       style={
                           {
                               height: '1in',
                               position: "absolute",
                               top: "0.17in",
                               right: "0.25in"
                           }
                       }/>
            </View>
            <View style={kcstyles.bodySection} >
                {/*Add the left and right sides*/}
                {/*Left*/}
                <View style={
                    {
                        width:"5.5in",
                        position: "absolute",
                        top: "0.33in",
                        left: "0"
                    }
                }
                >
                    {/*The big picture*/}
                    <Image
                        src={props.aniData.getImageUrl()}
                        allowDangerousPaths={true}
                        style={
                            {
                                maxWidth: "5.4in",
                                maxHeight: "3.6in",
                                marginLeft: "auto",
                                marginRight: "auto",
                                marginBottom:"10px"
                            }
                        }
                    />
                    {/* Add the section info    */}
                    <InfoSection aniData={props.aniData}/>

                </View>
                {/*Left*/}
                <View style={
                    {
                        width: "5.5in",
                        position: "absolute",
                        top: "0",
                        right: "0"
                    }
                }
                >
                    <BioSection aniData={props.aniData}/>
                </View>

            </View>
            <Footer key={props.aniData.data.ID} qrData={props.qrData} iconSize=".42in" aniData={props.aniData}/>
        </Page>
    );
}

export default FullPageKC