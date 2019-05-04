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


const InfoSection =  (props:Props) => {

    return (
        <View style={{display: "flex",flexDirection: "row", justifyContent:"space-around"}}>
            <View style={{maxWidth:"50%"}}>
                <Text style={kcstyles.sectionHeader}>{props.aniData.data.SPECIES.toUpperCase()} INFORMATION</Text>
                <Text style={kcstyles.infoRow}>Breed: {props.aniData.data.BREED}</Text>
                <Text style={kcstyles.infoRow}>Age: {props.aniData.data.AGE}</Text>
                {props.aniData.getAdoptionFee() &&
                    <Text style={kcstyles.infoRow}>Adoption Fee: {props.aniData.getAdoptionFee()}</Text>
                }
                {props.aniData.getTrainingDeposit() &&
                    <Text style={kcstyles.infoRow}>Training Deposit: {props.aniData.getTrainingDeposit()}</Text>
                }
            </View>
            {props.aniData.isSpecies([Species.dog]) &&
                <View style={{maxWidth: "50%"}}>
                    <Text style={[kcstyles.sectionHeader]}>MY FAMILY</Text>
                    <Text style={kcstyles.infoRow}>Housetrained: {props.aniData.formatYesNoUnknown(props.aniData.data.ISHOUSETRAINED)}</Text>
                    <Text style={kcstyles.infoRow}>Good with dogs: {props.aniData.formatYesNoUnknown(props.aniData.data.ISGOODWITHDOGS)}</Text>
                    <Text style={kcstyles.infoRow}>Good with cats: {props.aniData.formatYesNoUnknown(props.aniData.data.ISGOODWITHCATS)}</Text>
                    <Text style={kcstyles.infoRow}>Good with children: {props.aniData.formatYesNoUnknown(props.aniData.data.ISGOODWITHCHILDREN)}</Text>
                </View>
            }
        </View>


    );
}

export default InfoSection