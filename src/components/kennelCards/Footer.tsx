import React from 'react';
import CawsAnimal, {Species} from "../../models/CawsAnimal";
import {Text, View, Image, StyleSheet} from "@react-pdf/renderer";
import facebookIcon from "../../assets/kc/facebookClear.png";
import instagramIcon from "../../assets/kc/instagramClear.png";
import mailIcon from "../../assets/kc/mailIcon.png";
import {kcstyles} from "./KCBuilder";

//Define the expected props
interface Props{
    //Define the props we expect
    aniData: CawsAnimal;
    iconSize:string;
    height:string;
    qrData?:string;
}


const Footer = (props:Props) => {


    const footerStyles = StyleSheet.create({
        footerImg: {height: props.iconSize, width: props.iconSize},
        footerGroup: {
            margin: "auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center"
        }
    });

    return (
        <View style={[kcstyles.footerSection,{height:props.height}]}>
            <View style={footerStyles.footerGroup}>
                <Image style={footerStyles.footerImg} src={facebookIcon}/>
                <Text style={kcstyles.footerText}>@caws.org</Text>
            </View>
            <View style={footerStyles.footerGroup}>
                <Image style={footerStyles.footerImg} src={instagramIcon}/>
                <Text style={kcstyles.footerText}>@cawsanimals</Text>
            </View>
            <View style={footerStyles.footerGroup}>
                <Image style={footerStyles.footerImg} src={mailIcon}/>
                <Text style={kcstyles.footerText}>{props.aniData.data.SPECIES}s@caws.org</Text>
            </View>

            {props.qrData &&
                <View style={footerStyles.footerGroup}>
                    <Image src={props.qrData}/>
                </View>
            }


        </View>
    );

}

export default Footer