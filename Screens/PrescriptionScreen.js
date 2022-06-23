import React,{useState,useEffect} from 'react';
import typo from '../DesignSystem/Typography';
import {Colors} from '../DesignSystem/AppColors';
import {View, Text, StyleSheet, TextInput, TouchableOpacity,Alert,FlatList,ActivityIndicator} from 'react-native'
import RadioButton from 'react-native-customizable-radio-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal'

import Header from '../Components/Header';
import firestore from '@react-native-firebase/firestore';
import Prescription from '../Components/Prescription';

import ExtraDimensions from 'react-native-extra-dimensions-android'

const PrescriptionScreen = ({navigation}) => {
  
  const [modalVisible, setModalVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [Medicine, setMedicine] = useState("");
  const [Compound, setCompound] = useState("");
  const [DosageForm, setDosageForm] = useState("");
  const [DosageSize, setDosageSize] = useState("");
  const [Frequency, setFrequency] = useState("");
  const [Details, setDetails] = useState("");
  const [Dockey, setDockey] = useState("");

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const subscriber = firestore()
      .collection('Prescription')
      .onSnapshot(querySnapshot => {
        const users = [];
  
        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        })
  
        setUsers(users);
        setLoading(false);
      });
  
    // Unsubscribe from events when no longer in use
    return () => {subscriber()};
  }, []);

  const onCancelPress=()=>{
    setMedicine("");
    setCompound("");
    setDosageForm("");
    setDosageSize("");
    setFrequency("");
    setDetails("");
    setDockey("");
    toggleModal();
  }

  const onAddPress=()=>{
    if(Medicine.length>0 && Compound.length>0 && DosageSize.length>0 && Frequency.length>0 && Details.length>0){
      firestore().collection("Prescription").add({
        Medicine:Medicine,
        Compound:Compound,
        DosageForm:DosageForm,
        DosageSize:DosageSize,
        Frequency:Frequency,
        Details:Details,
      }).then(()=>{
        console.log("Added");
        onCancelPress();
      }).catch(error=>{
        console.log(error);
      })
    }
    else{
      Alert.alert("Please fill all the fields");
    }
  }
  const onEditPress=(med,comp,form,size,freq,details,key)=>{
    setEdit(true)
    setMedicine(med);
    setCompound(comp);
    setDosageForm(form);
    setDosageSize(size);
    setFrequency(freq);
    setDetails(details);
    setDockey(key);
    toggleModal();
  }
  const onEdit=()=>{
    if(Medicine.length>0 && Compound.length>0 && DosageSize.length>0 && Frequency.length>0 && Details.length>0){
      firestore().collection("Prescription").doc(Dockey).update({
        Medicine:Medicine,
        Compound:Compound,
        DosageForm:DosageForm,
        DosageSize:DosageSize,
        Frequency:Frequency,
        Details:Details,
      }).then(()=>{
        console.log("Edited");
        onCancelPress();
      }).catch(error=>{
        console.log(error);
      })
    }
    else{
      Alert.alert("Please fill all the fields");
    }
  }


  const deviceWidth = ExtraDimensions.getRealWindowWidth()
  const deviceHeight =ExtraDimensions.getRealWindowHeight()
  const data = [
    {
      id:1,
      text: 'injection'
     },
     {
      id:2,
      text: 'tablet'
     },
     {
      id:3,
      text: 'capsule'
     },
     {
      id:4,
      text: 'syrup'
     },
    ];
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <>
    <Header navigation={navigation}/>

    <View style={styles.container}>
      <View style={styles.addContainer}>
        <TouchableOpacity style={styles.addButton} onPress={()=>{setEdit(false);toggleModal()}}>
      <Text style={[typo.Text_16pt,styles.addButtonText]}>Add  <Icon name="plus-circle" size={20} 
      color={Colors.MonochromeBlue100} /></Text>
      </TouchableOpacity>
      </View>
      <Modal isVisible={modalVisible} deviceWidth={deviceWidth}
      deviceHeight={deviceHeight} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.ModalContainer}>
          <View style={styles.header}>
            <Text style={[typo.Header_20pt,styles.headerText]}>Add Medicine</Text>
            </View>
            <View style={styles.line}/>
            <View style={styles.body}>
            <View style={styles.inputContainer}>
              <Text style={[typo.Text_16pt,styles.inputText]}>Medicine</Text>
              <TextInput style={[typo.Text_16pt,styles.input]} onChangeText={text=>setMedicine(text)}
              value={Medicine}/>
            </View>
            <View style={styles.inputContainer}>
              <Text style={[typo.Text_16pt,styles.inputText]}>Compound</Text>
              <TextInput style={[typo.Text_14pt,styles.input]} onChangeText={text=>setCompound(text)}
              value={Compound}/>
            </View>
            <View style={styles.dosage}>
              <Text style={[typo.Text_16pt,styles.inputText]}>Dosage Form</Text>
              <View style={styles.RadioContainer}>
          <RadioButton box={false}
          data={data}
          onValueChange={(value)=>{setDosageForm(value.text)}}
          labelStyle={styles.radioText}
          formStyle={styles.radios}
          containerStyle={styles.radio}
          innerCircleStyle={{backgroundColor:Colors.MonochromeGreen700}}
          circleContainerStyle={{borderColor:Colors.MonochromeBlue700,padding:0,margin:0}}
            />
            </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={[typo.Text_16pt,styles.inputText]}>Dosage Size</Text>
              <TextInput style={[typo.Text_14pt,styles.input]} value={DosageSize} onChangeText={text=>setDosageSize(text)}
              keyboardType={"default"}/>
            </View>
            <View style={styles.inputContainer}>
              <Text style={[typo.Text_16pt,styles.inputText]}>Dosage frequency</Text>
              <TextInput style={[typo.Text_14pt,styles.input]} value={Frequency} onChangeText={text=>setFrequency(text)}
              keyboardType={"numeric"}/>
            </View>
            <View style={styles.detailContainer}>
              <Text style={[typo.Text_16pt,styles.detailText]}>Enter Precautionary Details</Text>
              <TextInput multiline={true} style={[typo.Text_14pt,styles.detail]} onChangeText={text=>setDetails(text)}
              value={Details}/>
            </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.Cancelbutton} onPress={()=>onCancelPress()}>
                <Text style={[typo.Header_16pt,styles.CancelbuttonText]}>Cancel</Text>
              </TouchableOpacity>
              {!edit?(
                <TouchableOpacity style={styles.Addbutton} onPress={()=>onAddPress()}>
                <Text style={[typo.Header_16pt,styles.AddbuttonText]}>Add</Text>
              </TouchableOpacity>
              ):(
                <TouchableOpacity style={styles.Addbutton} onPress={()=>onEdit()}>
                <Text style={[typo.Header_16pt,styles.AddbuttonText]}>Edit</Text>
              </TouchableOpacity>
              )}
              
            </View>
          
        </View>
      </Modal>
      <View style={styles.listContainer}>
        {!loading ? (
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <View style={styles.listItemContainer}>
              <Prescription medicine={item.Medicine} compound={item.Compound} form={item.DosageForm}
              size={item.DosageSize} freq={item.Frequency} note={item.Details} dockey={item.key}
              onPress={()=>{
                onEditPress(item.Medicine,item.Compound,item.DosageForm,
                  item.DosageSize,item.Frequency,item.Details,item.key)
                }}/>
              </View>
          )}/>) : ( <ActivityIndicator size="large" color={Colors.MonochromeBlue700} />)}
        </View>
    </View>
    </>
      
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    zIndex:-10,
    height:"93%",
    backgroundColor: "#F2F3F4",
},
addContainer: {
  flexDirection:'row',
    marginTop:20,
    width: '95%',
    justifyContent:"flex-end",
},
addButton: {
  backgroundColor: Colors.Secondary2,
    padding:10,
    width:'30%',
    borderRadius:5,
},
addButtonText: {
  textAlign:"center",
  color:"white",
},
ModalContainer: {
  backgroundColor: '#F2F3F4',
  borderRadius: 10,
  //height: 570,
  alignItems: 'center',
  paddingTop: 20,
  paddingBottom: 20,
},
header: {
  marginBottom:5,
  alignItems: 'center',
},
headerText: {
  color: Colors.MonochromeBlue900,
},
line:{
  borderBottomColor: 'black',
  borderBottomWidth: StyleSheet.hairlineWidth,
  width:"90%"
},
body:{
  flexDirection:'row',
  flexWrap:'wrap',
  width: '90%',
  margin:10,
  justifyContent:"space-between",
},
detailContainer:{
  marginTop:20,
  width:"100%",
  justifyContent:'space-between',
  height:120,
},
inputContainer:{
  width:"48%",
  justifyContent:'space-between',
  height:70,
},
detailText:{
  color:Colors.Secondary1,
  margin:3,
},
inputText:{
  color:Colors.Secondary1,
  margin:3
},
detail:{
  textAlignVertical:'top',
  paddingLeft: 10,
  flex: 1,
  height: 120,
  color: Colors.MonochromeBlue900,
  fontSize:13,
  borderWidth:1,
  borderColor: Colors.MonochromeGreen500,
  borderRadius:10,
},
input:{
  paddingLeft: 5,
  flex: 1,
  height: 60,
  color: Colors.MonochromeBlue900,
  fontSize:13,
  borderWidth:1,
  borderColor: Colors.MonochromeGreen500,
  borderRadius:10,
},
dosage:{
  width:"100%",
  marginTop:20,
  marginBottom:40,
},
RadioContainer:{
  width:"100%",
  alignItems: 'center',
  //marginBottom:10,
},
radio:{
  width:"19%",
},
radios:{
  width:"90%",
  marginTop:5,
  flexDirection:"row",
  flexWrap:"wrap",
  justifyContent:"space-between",
},
radioText:{
  fontSize:13,
  color:Colors.MonochromeBlue900,
  padding:0,
  margin:0,
},
buttonContainer:{
  flexDirection:'row',
  marginTop:10,
    width: '90%',
    justifyContent:"space-between",
},
Cancelbutton:{
  backgroundColor: "#E8F8F5",
    padding:10,
    width:'45%',
    borderRadius:15,
    borderWidth:1,
    borderColor: Colors.MonochromeGreen500,
},
Addbutton:{
  backgroundColor: Colors.Primary1,
    padding:10,
    width:'45%',
    borderRadius:15,
    borderWidth:1,
    borderColor: Colors.MonochromeGreen500,
},
CancelbuttonText:{
  textAlign:"center",
  color:Colors.Secondary1
},
AddbuttonText:{
  textAlign:"center",
  color:Colors.Secondary1,
},
listContainer:{
  margin:10,
  height:"90%",
},

});

export default PrescriptionScreen;
