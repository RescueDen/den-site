import React from 'react';
import CawsAnimal from "../../models/CawsAnimal";
import {StyleSheet,Font, Page, Text, View,Image} from "@react-pdf/renderer";
import cawsLogo from "../../assets/logos/xCAWS_logo_full.png";



//Define the expected props
interface Props{
    //Define the props we expect
    aniData: CawsAnimal
}

//Setup the fonts
// Register font
Font.register({ family: 'LemonTuesday', src: process.env.PUBLIC_URL+"/fonts/LemonTuesday.ttf" });

const styles = StyleSheet.create({
    page: { backgroundColor: 'white' },
    headerSection: { height:'1.4in', backgroundColor:"#fafafa",color: 'black', textAlign: 'left',border:true },
    aniNameSection: {
        width:'9.7in',
        fontFamily:'LemonTuesday', margin: "auto", marginLeft:"0", color:'#35b729', textAlign:'center',fontSize:'.8in', float:"left"
    },
    bodySection: { height:'6.1in', backgroundColor:"#ff5e0f",color: 'black', textAlign: 'center' },
    footerSection: { height:'1.0in', backgroundColor:"#eae2ff",color: 'black', textAlign: 'center'}

});


const FullPageKC =  (props:Props) => {




    return (
        <Page size="LETTER" orientation='landscape' debug={true}>
            <View style={styles.headerSection} >
                <Text style={styles.aniNameSection}>{props.aniData.data.NAME}</Text>
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
            <View style={styles.bodySection} >
                <Text>{props.aniData.data.NAME}</Text>
            </View>
            <View style={styles.footerSection}>
                <Text>Footer</Text>
            </View>
        </Page>
    );
}

export default FullPageKC