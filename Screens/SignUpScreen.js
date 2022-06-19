import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView
} from 'react-native';

import InputText from '../Components/InputText';
import PakMedicLogo from '../assets/Icons/PakMedicLogo'
import {Colors} from '../DesignSystem/Colors';
import typo from '../DesignSystem/Typography';
import SocialBtn from '../Components/SocialsButton';
import firebase from '../firebase'
// Initialize Firebase Authentication and get a reference to the service

import { getAuth,createUserWithEmailAndPassword } from "firebase/auth";

const SignInScreen = ({navigation}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [Cpassword, setCPassword] = useState();
    const [phone, setPhone] = useState();
    const [pmcID, setPmcID] = useState();
    const auth = getAuth();

    const SignUp=()=>{
        console.log("i was pressed")
        createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user.uid,user.email)
    // ...
  })
  .catch((error) => {
    console.log(error)
  });
    }

return(
    <View style={styles.container}>
        <View style={styles.logoContainer}>
        <PakMedicLogo width={70} height={70}/>
        </View>
        <View>
            <InputText labelValue={email} onChangeText={(userEmail) => setEmail(userEmail)} 
            placeholderText={'Email'} iconType={'user'}></InputText>

            <InputText labelValue={password} onChangeText={(userPassword) => setPassword(userPassword)} 
            placeholderText={'Password'} iconType={'lock'} secureTextEntry={true}></InputText>

            <InputText labelValue={Cpassword} onChangeText={(userCPassword) => setCPassword(userCPassword)} 
            placeholderText={'Confirm Password'} iconType={'lock'} secureTextEntry={true}></InputText>

            <InputText labelValue={phone} onChangeText={(userphone) => setPhone(userphone)} 
            placeholderText={'Phone no.'} iconType={'phone'} keyboardType={'phone-pad'}></InputText>

            <InputText labelValue={pmcID} onChangeText={(ID) => setPmcID(ID)} 
            placeholderText={'PMC ID'} iconType={'stethoscope'}></InputText>

        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={()=>{SignUp()}}>
                <Text style={[typo.Text_14pt,styles.buttonText]}>Register</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.signUpContainer}>
        <Text
        style={[typo.Text_14pt,styles.text]}>
          Already a user?
          <Text style={styles.navButton} 
          onPress={() => {navigation.navigate("SignInScreen")}}> Sign In here</Text>
      </Text>
      </View>
      <View style={styles.line}/>
      <View style={styles.SocialsContainer}>
        <SocialBtn Color={"#E74C3C"} SocialName={"Google"} iconType={"google"}/>
        <SocialBtn Color={"#2471A3"} SocialName={"Facebook"} iconType={"facebook-square"}/>
        <SocialBtn Color={"#5DADE2"} SocialName={"Twitter"} iconType={"twitter-square"}/>

      </View>
    </View>
)}
const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent:'center',
  },
  logoContainer: {
    marginBottom:20,
  },
  buttonContainer:{
    flexDirection:'row',
    margin:10,
    width: '80%',
    justifyContent:"flex-end",
  },
  button:{
    backgroundColor: Colors.Secondary1,
    padding:10,
    width:'40%',
    borderRadius:5,
  },
  buttonText:{
    textAlign:"center",
    color:"white",
  },
  signUpContainer:{
    margin:10
  },
  text:{
    color:Colors.MonochromeBlue700,
  },
  navButton:{
    color:Colors.MonochromeBlue1000,
  },
  line:{
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width:"80%"
  },
  SocialsContainer:{
    width:"60%",
    flexDirection:'row',
    justifyContent:"space-evenly",
    margin:10
  }
});
export default SignInScreen