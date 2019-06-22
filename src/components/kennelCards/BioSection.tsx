import React from 'react';
import CawsAnimal, {Species} from "../../models/CawsAnimal";
import {StyleSheet,Font, Page, Text, View,Image} from "@react-pdf/renderer";
import {kcstyles} from "./KCBuilder";



//Define the expected props
interface Props{
    //Define the props we expect
    aniData: CawsAnimal
    defaultSize:FontSpec;
    minSize:FontSpec;
    fontUnit:string;
}

//Store the font spec
export interface FontSpec {
    fontSize:number;
    numChars:number;

}


const BioSection =  (props:Props) => {

    //Debug code
    // const count = 1000;
    // props.aniData.data.BIO = count + ": ";
    // for(let i =0; i < count; i++){
    //     let random_ascii = Math.floor((Math.random() * 25) + 97);
    //     let random_string = String.fromCharCode(random_ascii)
    //
    //     props.aniData.data.BIO += " " + random_string;
    //
    //
    // }
    //
    // console.log(props.aniData.data.BIO );

    //Compute the font size
    const length:number = props.aniData.data.BIO.length;

    //Get the size
    let fontSize:number = props.defaultSize.fontSize;

    // //See if we are at the min
    // if (length > props.defaultSize.numChars){
    //     //Just linear interpolation
    //     fontSize =  props.defaultSize.fontSize + (length - props.defaultSize.numChars) * (props.defaultSize.fontSize - props.minSize.fontSize)/ (props.defaultSize.numChars - props.minSize.numChars);
    //
    // }
    // //Add the limit
    // if(length > props.minSize.numChars){
    //     fontSize = props.minSize.fontSize;
    // }



    return (
        <View style={{maxWidth:"100%",textAlign:"center",margin:"1.0in"}}>
            <Text style={[kcstyles.sectionHeader,{fontSize: fontSize + props.fontUnit }]}>DESCRIPTION</Text>
            <Text style={[kcstyles.bio,{marginRight:"10px",fontSize: fontSize + props.fontUnit }]}>{props.aniData.data.BIO}</Text>


        </View>


    );
}

export default BioSection