import React from 'react';
import CawsAnimal, {Species} from "../../models/CawsAnimal";
import {StyleSheet,Font, Page, Text, View,Image} from "@react-pdf/renderer";
import cawsLogo from "../../assets/logos/xCAWS_logo_full.png";
import {kcstyles} from "./FullPageKC";



//Define the expected props
interface Props{
    //Define the props we expect
    aniData: CawsAnimal
}


const BioSection =  (props:Props) => {

    return (
        <View style={{maxWidth:"100%",textAlign:"center",margin:"1.0in"}}>
            <Text style={kcstyles.sectionHeader}>DESCRIPTION</Text>
            <Text style={[kcstyles.bio,{marginRight:"10px"}]}>{props.aniData.data.BIO}</Text>


        </View>


    );
}

export default BioSection