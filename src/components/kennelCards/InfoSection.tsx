import React from 'react';
import ShelterAnimal, {Species} from "../../models/ShelterAnimal";
import {Text, View} from "@react-pdf/renderer";
import {kcstyles} from "./KCBuilder";


//Define the expected props
interface Props {
    //Define the props we expect
    aniData: ShelterAnimal
    fontSize: string;
}


const InfoSection = (props: Props) => {

    //Build the two styles
    const headerStyle = [kcstyles.sectionHeader, {fontSize: props.fontSize}];
    const textStyle = [kcstyles.infoRow, {fontSize: props.fontSize}];

    return (
        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
            <View style={{maxWidth: "50%"}}>
                <Text style={headerStyle}>{props.aniData.data.species.toUpperCase()} INFORMATION</Text>
                <Text style={textStyle}>Breed: {props.aniData.data.breed}</Text>
                <Text style={textStyle}>Age: {props.aniData.data.age}</Text>
                <Text style={textStyle}>Sex: {props.aniData.data.sex}</Text>
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
                    <Text
                        style={textStyle}>Housetrained: {props.aniData.formatYesNoUnknown(props.aniData.data.isHouseTrained)}</Text>
                }
                <Text style={textStyle}>Good with
                    dogs: {props.aniData.formatYesNoUnknown(props.aniData.data.isGoodWithDogs)}</Text>
                <Text style={textStyle}>Good with
                    cats: {props.aniData.formatYesNoUnknown(props.aniData.data.isGoodWithCats)}</Text>
                <Text style={textStyle}>Good with
                    children: {props.aniData.formatYesNoUnknown(props.aniData.data.isGoodWithChildren)}</Text>
            </View>

        </View>


    );
}

export default InfoSection