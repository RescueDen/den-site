import React from 'react';
import CawsAnimal from "../../models/CawsAnimal";
import {StyleSheet,Font, Page, Text, View,Image} from "@react-pdf/renderer";
import cawsLogo from "../../assets/logos/xCAWS_logo_full.png";
import InfoSection from "./InfoSection";
import BioSection from "./BioSection";
import Footer from "./Footer";
import {kcstyles} from "./KCBuilder";



//Define the expected props
interface Props{
    //Define the props we expect
    aniData: CawsAnimal;
    qrData?:string;
}


const FullPageKC =  (props:Props) => {




    return (
        <Page size="LETTER" orientation='landscape' >
            <View style={[kcstyles.headerSection,{height:'1.4in'}]} >
                <Text
                    style={[
                        kcstyles.aniNameSection,
                        {
                            width:'9.7in',
                            fontSize:'.8in'
                        }
                    ]
                    }>{props.aniData.data.NAME}</Text>
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
            <View style={{ height:'6.1in' }} >
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
                    <InfoSection fontSize='0.2in' aniData={props.aniData}/>

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
                    <BioSection fontSize='0.2in' aniData={props.aniData}/>
                </View>

            </View>
            <Footer key={props.aniData.data.ID} fontSize={"0.25in"} qrData={props.qrData} iconSize=".42in" height='1.0in' aniData={props.aniData}/>
        </Page>
    );
}

export default FullPageKC