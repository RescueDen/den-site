import React from 'react';
import CawsAnimal, {Species} from "../../models/CawsAnimal";
import {StyleSheet,Font, Page, Text, View,Image} from "@react-pdf/renderer";
import {kcstyles} from "./KCBuilder";



//Define the expected props
interface Props{
    //Define the props we expect
    aniData: CawsAnimal
    fontSize:string;
}


const BioSection =  (props:Props) => {

    return (
        <View style={{maxWidth:"100%",textAlign:"center",margin:"1.0in"}}>
            <Text style={[kcstyles.sectionHeader,{fontSize:props.fontSize}]}>DESCRIPTION</Text>
            <Text style={[kcstyles.bio,{marginRight:"10px",fontSize:props.fontSize}]}>{props.aniData.data.BIO}</Text>


        </View>


    );
}

export default BioSection