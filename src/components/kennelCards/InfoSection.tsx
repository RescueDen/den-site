import React from 'react';
import CawsAnimal, {Species} from "../../models/CawsAnimal";
import {StyleSheet,Font, Page, Text, View,Image} from "@react-pdf/renderer";
import cawsLogo from "../../assets/logos/xCAWS_logo_full.png";
import {kcstyles} from "./KCBuilder";



//Define the expected props
interface Props{
    //Define the props we expect
    aniData: CawsAnimal
    fontSize:string;
}


const InfoSection =  (props:Props) => {

    //Build the two styles
    const headerStyle = [kcstyles.sectionHeader, {fontSize:props.fontSize}];
    const textStyle = [kcstyles.infoRow, {fontSize:props.fontSize}];

    return (
        <View style={{display: "flex",flexDirection: "row", justifyContent:"space-around"}}>
            <View style={{maxWidth:"50%"}}>
                <Text style={headerStyle}>{props.aniData.data.SPECIES.toUpperCase()} INFORMATION</Text>
                <Text style={textStyle}>Breed: {props.aniData.data.BREED}</Text>
                <Text style={textStyle}>Age: {props.aniData.data.AGE}</Text>
                <Text style={textStyle}>Sex: {props.aniData.data.SEX}</Text>
                {props.aniData.getAdoptionFee() &&
                    <Text style={textStyle}>Adoption Fee: {props.aniData.getAdoptionFee()}</Text>
                }
                {/*{props.aniData.getTrainingDeposit() &&*/}
                {/*    <Text style={textStyle}>Training Deposit: {props.aniData.getTrainingDeposit()}</Text>*/}
                {/*}*/}
            </View>
            <View style={{maxWidth: "50%"}}>
                <Text style={headerStyle}>MY FAMILY</Text>
                {props.aniData.isSpecies([Species.dog]) &&
                    <Text style={textStyle}>Housetrained: {props.aniData.formatYesNoUnknown(props.aniData.data.ISHOUSETRAINED)}</Text>
                }
                <Text style={textStyle}>Good with dogs: {props.aniData.formatYesNoUnknown(props.aniData.data.ISGOODWITHDOGS)}</Text>
                <Text style={textStyle}>Good with cats: {props.aniData.formatYesNoUnknown(props.aniData.data.ISGOODWITHCATS)}</Text>
                <Text style={textStyle}>Good with children: {props.aniData.formatYesNoUnknown(props.aniData.data.ISGOODWITHCHILDREN)}</Text>
            </View>

        </View>


    );
}

export default InfoSection