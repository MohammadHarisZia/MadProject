import React,{useState,useEffect} from 'react';
import typo from '../DesignSystem/Typography';
import {Colors} from '../DesignSystem/AppColors';
import {View, Text, StyleSheet} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import AwesomeAlert from 'react-native-awesome-alerts';

import firestore from '@react-native-firebase/firestore';

const Prescription =({medicine,compound,form,size,freq,note,dockey,...rest})=>{
    const [Alert, setAlert] = useState(false);

    const showAlert=()=>{
        setAlert(true);
    }
    const hideAlert=()=>{
        setAlert(false);
    }

    const onDeletePress = () => {
        firestore().collection('Prescription').doc(dockey).delete().then(() => {
            console.log('Document successfully deleted!');
            hideAlert()
        }).catch(error => {
            console.error('Error removing document: ', error);
        })
    }
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

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.Deletebutton} onPress={()=>showAlert()}>
                <Text style={[typo.Header_14pt,styles.DeletebuttonText]}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.Editbutton} {...rest}>
                <Text style={[typo.Header_14pt,styles.EditbuttonText]}>Edit</Text>
              </TouchableOpacity>
            </View>
            <AwesomeAlert
          show={Alert}
          showProgress={false}
          title="Confirmation"
          message="Are u sure u want to delete Prescription?"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="cancel"
          confirmText="delete"
          confirmButtonColor="#F1948A"
          onCancelPressed={() => {
            hideAlert()
          }}
          onConfirmPressed={() => {
            onDeletePress()
          }}
        />
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
    },
    buttonContainer:{
        flexDirection:'row',
        marginTop:10,
          width: '100%',
          justifyContent:"space-evenly",
      },
      Deletebutton:{
        backgroundColor: "#F1948A",
          padding:10,
          paddingHorizontal:20,
          width:'100%',
          borderRadius:20,
          borderWidth:1,
          borderColor: Colors.MonochromeBlue500,
      },
      Editbutton:{
        backgroundColor: "#85C1E9",
        paddingHorizontal:30,
          padding:10,
          width:'100%',
          borderRadius:20,
          borderWidth:1,
          borderColor: Colors.MonochromeBlue500,
      },
      DeletebuttonText:{
        textAlign:"center",
        color:Colors.MonochromeBlue1000
      },
        EditbuttonText:{
        textAlign:"center",
        color:Colors.MonochromeBlue1000,
      },
})

export default Prescription;