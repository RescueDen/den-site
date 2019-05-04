import React from 'react';
import CawsAnimal, {Species} from "../../models/CawsAnimal";
import {Text, View, Image, StyleSheet} from "@react-pdf/renderer";
import {kcstyles} from "./FullPageKC";
import facebookIcon from "../../assets/kc/facebookClear.png";
import instagramIcon from "../../assets/kc/instagramClear.png";
import mailIcon from "../../assets/kc/mailIcon.png";


//Define the expected props
interface Props{
    //Define the props we expect
    aniData: CawsAnimal;
    iconSize:string;
}

const Footer =  (props:Props) => {

    const footerStyles = StyleSheet.create({
        footerImg: { height: props.iconSize, width:props.iconSize},
        footerGroup:{ margin: "auto", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}
    });

    return (
        <View style={kcstyles.footerSection} >
            <View style={footerStyles.footerGroup}>
                <Image   style={footerStyles.footerImg} src={facebookIcon}/>
                <Text  style={kcstyles.footerText}>@caws.org</Text>
            </View>
            <View style={footerStyles.footerGroup}>
                <Image   style={footerStyles.footerImg} src={instagramIcon}/>
                <Text style={kcstyles.footerText}>@cawsanimals</Text>
            </View>
            <View style={footerStyles.footerGroup}>
                <Image   style={footerStyles.footerImg} src={mailIcon}/>
                <Text style={kcstyles.footerText}>{props.aniData.data.SPECIES}s@caws.org</Text>
            </View>
        </View>
    );
}

export default Footer