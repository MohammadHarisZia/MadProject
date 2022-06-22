import React,{useState} from "react"
import { View, Text, StyleSheet, ActivityIndicator,Image,ScrollView } from "react-native"
import Header from "../Components/Header"
import Icon from "react-native-vector-icons/Ionicons"
import { Colors } from "../DesignSystem/AppColors"
import typo from "../DesignSystem/Typography"

import UserInfo from "../Components/UserInfo"

import Auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import {launchCamera, launchImageLibrary} from 'react-native-image-picker/src';

import { TouchableOpacity } from "react-native-gesture-handler"

import storage from '@react-native-firebase/storage'



const ProfileScreen = ({ navigation,route }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [pmcID, setPmcID] = useState("");
    const [image, setImage] = useState();
    const [url, setUrl] = useState();
    const [loading, setLoading] = useState(true);
    
    const uploadImageToStorage=(path, imageName)=> {
        let reference = storage().ref(imageName);         // 2
        let task = reference.putFile(path); 
        
        task.on('state_changed', taskSnapshot => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
          });// 3
    
        task.then(() => {                                 // 4
            console.log('Image uploaded to the bucket!');
            // const URL=storage().ref('images/profile-1.png').getDownloadURL();
            // setUrl(URL);
            // console.log(URL);
        }).catch((e) => console.log('uploading image error => ', e));

    }
    const getData = async() => {
        await firestore()
        .collection('users')
        .doc(Auth().currentUser.uid)
        .get()
        .then(documentSnapshot => {
          console.log('User exists: ', documentSnapshot.exists);
      
          if (documentSnapshot.exists) {
            const doc=documentSnapshot.data()
            setName(doc.name)
            setEmail(doc.email)
            setPhone(doc.phone)
            setPmcID(doc.pmcID)
            console.log('User data: ', documentSnapshot.data());
          }
        }).finally(() => setLoading(false))
        //console.log(userDocument);
      }
    React.useEffect(() => {
        getData()
        console.log(image)
    }, [])

    if( loading ) {
        return(
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large"/>
          </View>
        );
      }
    return (
        <>
        <Header/>
        <View style={styles.container}>

        <View style={styles.back}>
            <Icon name="arrow-back" size={30} color={Colors.MonochromeBlue900}
            onPress={()=>{navigation.goBack()}}/>
        </View>
        <ScrollView>
        <View style={styles.profile}>
        <TouchableOpacity onPress={()=>{
            launchImageLibrary().then(result => {
                if(!result.cancelled){
                    console.log(result.assets[0].uri)
                    setImage(result.assets[0].uri)
                    uploadImageToStorage(result.assets[0].uri, Auth().currentUser.uid)
                }else if(result.cancelled){
                    console.log("cancelled")
                }
                else if(result.error){
                    console.log(result.error)}
            }).catch(error => {
                console.log(error)
            })
        }}>
        <Image style={styles.logo} source={image!=null?{uri:image}:require('../assets/Icons/defaultuser.png')}/>
        </TouchableOpacity>
            <Text style={[typo.Header_20pt,styles.headtext]}>{name}</Text>
        
        <View>

        <UserInfo name={"Name:"} labelValue={name}
            onChangeText={(text)=>setName(text)}/>

        <UserInfo name={"Email:"} labelValue={email}
            onChangeText={(text)=>setEmail(text)}/>
        
        <UserInfo name={"Phone:"} labelValue={phone}
            onChangeText={(text)=>setPhone(text)}/>
        
        <UserInfo name={"PmcID:"} labelValue={pmcID}
            onChangeText={(text)=>setPmcID(text)}/>
        </View>
        
        </View>
        </ScrollView>

        </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        zIndex:-10,
        height:"93%",
    backgroundColor: "#F2F3F4",
    },
    back: {
        margin:10
    },
    profile:{
        flex:1,
        alignItems:"center",
    },
    logo:{
        width:90,
        height:90
    },
    headtext:{
        margin:10,
        color:Colors.MonochromeBlue900,
    },
})
export default ProfileScreen