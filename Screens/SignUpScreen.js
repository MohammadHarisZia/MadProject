import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';

import InputText from '../Components/InputText';
import PakMedicLogo from '../assets/Icons/PakMedicLogo'
import {Colors} from '../DesignSystem/AppColors';
import typo from '../DesignSystem/Typography';
import SocialBtn from '../Components/SocialsButton';
import auth from '../firebase'
import { AuthContext } from '../Components/context';

import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

//import {db} from '../firebase'
// Initialize Firebase Authentication and get a reference to the service
const SignInScreen = ({navigation}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Cpassword, setCPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [pmcID, setPmcID] = useState("");
    const { signUp } = React.useContext(AuthContext);

    const SignUp= ()=>{
      if(name.length>0 && email.length>0 && password.length>0 && Cpassword.length>0 && pmcID.length>0){
      if(password!=Cpassword){
        Alert.alert("Password does not match")
        if(phone.length<10){
          Alert.alert("Phone number is not valid")
        }
      }
      else{
        Auth().createUserWithEmailAndPassword(email, password)
      .then(async(userCredential) => {

       firestore().collection('users').doc(userCredential.user.uid).set({
          name: name,
          email: email,
          password: password,
          phone: phone,
          pmcID: pmcID,
          image:""
        }).then((docRef) => {
          console.log("Document Added");
          signUp(userCredential.user);
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });
      })
      .catch((error) => {
        Alert.alert(error.code,error.message)
      });
    }
  }
    else{
      Alert.alert("Please fill all the fields")
    }
  }

return(
  <ScrollView>
    <View style={styles.container}>
        <View style={styles.logoContainer}>
        <PakMedicLogo width={70} height={70} style={{margin:10}}/>
        </View>
        <View>
            <InputText labelValue={name} onChangeText={(userName) => setName(userName)} 
            placeholderText={'Name'} iconType={'user'}></InputText>

            <InputText labelValue={email} onChangeText={(userEmail) => setEmail(userEmail)} 
            placeholderText={'Email'} iconType={'envelope'}></InputText>

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
    </ScrollView>
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