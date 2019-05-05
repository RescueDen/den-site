import React from 'react';
import CawsAnimal from "../../models/CawsAnimal";
import {StyleSheet,Font, Page, Text, View,Image} from "@react-pdf/renderer";
import cawsLogo from "../../assets/logos/xCAWS_logo_full.png";
import InfoSection from "./InfoSection";
import BioSection from "./BioSection";
import Footer from "./Footer";
import {kcstyles} from "./KCBuilder";



//Define the expected props
interface HalfPageKCProps{
    //Define the props we expect
    aniDataFirst: CawsAnimal;
    qrDataFirst?:string;

    //And the second props
    aniDataSecond?: CawsAnimal;
    qrDataSecond?:string;
}
interface HalfPageContentProps{
    //Define the props we expect
    aniData: CawsAnimal;
    qrData?:string;

}


//Simple wrapper to show two half pages
const HalfPageKC =  (props:HalfPageKCProps) => {

    return (
        <Page size="LETTER" orientation='portrait' >
            <HalfPageContent aniData={props.aniDataFirst} qrData={props.qrDataFirst} />

            {/* If there is a second one   */}
            {props.aniDataSecond &&
                <HalfPageContent aniData={props.aniDataSecond} qrData={props.qrDataSecond}/>
            }

        </Page>
    );
}

const HalfPageContent = (props:HalfPageContentProps) => {
    return (
        <>
            <View style={[kcstyles.headerSection,{height:'1.0in'}]} >
                <Text
                    style={[
                        kcstyles.aniNameSection,
                        {
                            width:'7.3in',
                            fontSize:'0.6in'
                        }
                    ]
                    }>{props.aniData.data.NAME}</Text>
                <Image src={cawsLogo}
                       style={
                           {
                               height: '0.75in',
                               position: "absolute",
                               top: "0.1in",
                               right: "0.2in"
                           }
                       }/>
            </View>
            <View style={{ height:'3.88in' }} >
                {/*Add the left and right sides*/}
                {/*Left*/}
                <View style={
                    {
                        width:"4.25in",
                        position: "absolute",
                        top: "0.17in",
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
                                maxWidth: "3.4in",
                                maxHeight: "2.1in",
                                marginLeft: "auto",
                                marginRight: "auto",
                                marginBottom:"10px"
                            }
                        }
                    />
                    {/* Add the section info    */}
                    <InfoSection fontSize="0.12in" aniData={props.aniData}/>

                </View>
                {/*Left*/}
                <View style={
                    {
                        width: "4.25in",
                        position: "absolute",
                        top: "0",
                        right: "0"
                    }
                }
                >
                    <BioSection fontSize='0.15in' aniData={props.aniData}/>
                </View>

            </View>
            <Footer key={props.aniData.data.ID} fontSize={"0.15in"} qrData={props.qrData} iconSize=".32in" height='0.62in' aniData={props.aniData}/>
        </>


    );
}

export default HalfPageKC