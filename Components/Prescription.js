import React,{useState,useEffect} from 'react';
import typo from '../DesignSystem/Typography';
import {Colors} from '../DesignSystem/AppColors';
import {View, Text, StyleSheet} from 'react-native'

const Prescription =({medicine,compound,form,size,freq,note,...rest})=>{
    return(
        <View style={styles.Container}>
            <View style={styles.header}>
              <Text style={[typo.Header_20pt,styles.headerText]}>{medicine}</Text>
            </View>
            <View style={styles.infoContainer}>

                <View style={styles.info}>
                <Text style={[typo.Header_14pt,styles.text]}>Compound:</Text>
                <Text style={[typo.Text_14pt,styles.text]}>{compound}</Text>
                </View>

                <View style={styles.info}>
                <Text style={[typo.Header_14pt,styles.text]}>Dosage Form:</Text>
                <Text style={[typo.Text_14pt,styles.text]}>{form}</Text>
                </View>

                <View style={styles.info}>
                <Text style={[typo.Header_14pt,styles.text]}>Dosage Frequency:</Text>
                <Text style={[typo.Text_14pt,styles.text]}>{freq} times a day</Text>
                </View>

                <View style={styles.info}>
                <Text style={[typo.Header_14pt,styles.text]}>Dosage Size:</Text>
                <Text style={[typo.Text_14pt,styles.text]}>{size}mg</Text>
                </View>

                <View style={styles.info}>
                <Text style={[typo.Header_14pt,styles.text]}>Note:</Text>
                <Text style={[typo.Text_14pt,styles.text,{width:"60%",textAlign:'right'}]}>{note}</Text>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    Container:{
        flex:1,
        backgroundColor:Colors.MonochromeBlue100,
        padding:10,
        marginVertical:8,
        marginHorizontal:16,
        borderRadius:10,
    },
    header:{
        margin:5
    },
    headerText:{
        color:Colors.MonochromeBlue1000,
    },
    infoContainer:{
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderTopWidth: StyleSheet.hairlineWidth,
        width:"90%",
        alignSelf:"center",
      },
    info:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:5,
        marginBottom:5,
    },
    text:{
        color:Colors.Secondary1,
    }
})

export default Prescription;