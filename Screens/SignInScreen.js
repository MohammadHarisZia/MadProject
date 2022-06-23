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
//import auth from '../firebase'
//import firebase from "firebase/app"
//import "firebase/auth"

import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '277621475423-99dlgq4157obgjtjmiuu9lf4h369m6s9.apps.googleusercontent.com',
});

import { AuthContext } from '../Components/context';

//import {signInWithEmailAndPassword } from "firebase/auth";
//import {signInWithRedirect,GoogleAuthProvider,getRedirectResult,FacebookAuthProvider } from "firebase/auth";

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = React.useContext(AuthContext);

  const SignIn = () => {
    if(email.length>0 && password.length>0){
      Auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    signIn(user.uid);
    
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    Alert.alert(errorCode,errorMessage);
  });
}
else{
  Alert.alert("Please enter email and password")
}
}

// const Social=(social)=>{
//   var provider
//   if(social==='google'){
//     provider = new firebase.auth.GoogleAuthProvider()
//   }else if(social==='facebook'){
//     provider= new firebase.auth.FacebookAuthProvider()
//   }
// auth.signInWithRedirect(provider);
// auth
//   .getRedirectResult()
//   .then((result) => {
//     if (result.credential) {
//       /** @type {auth.OAuthCredential} */
//       var credential = result.credential;

//       // This gives you a Google Access Token. You can use it to access the Google API.
//       var token = credential.accessToken;
//       // ...
//     }
//     // The signed-in user info.
//     var user = result.user;
//     console.log(user.uid," ",user.email)
//   }).catch((error) => {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;
//     // ...
//   });
// console.log("doesnt work lol")
// }

const onGoogleButtonPress=async() =>{

  try{
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = Auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  Auth().signInWithCredential(googleCredential).then(async userCredential => {
    
    let user = userCredential.user;

    firestore().collection('users').doc(user.uid).set({
      name: user.displayName,
      email: user.email,
      password: "",
      phone: "",
      pmcID: "",
      image:""
    }).then((docRef) => {
      console.log("Document Added");
      console.log(user.uid)
      signIn(user.uid);
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });
  })  
  .catch(error => {
    console.log(error);
  })
  }catch(error){console.log(error)}
}

return(
    <View style={styles.container}>
        <View style={styles.logoContainer}>
        <PakMedicLogo width={150} height={150}/>
        </View>
        <View>
            <InputText labelValue={email} onChangeText={(userEmail) => setEmail(userEmail)} 
            placeholderText={'Email'} iconType={'user'}></InputText>
            <InputText labelValue={password} onChangeText={(userPassword) => setPassword(userPassword)} 
            placeholderText={'Password'} iconType={'lock'} secureTextEntry={true}></InputText>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={()=>SignIn()}>
                <Text style={[typo.Text_14pt,styles.buttonText]}>Login</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.signUpContainer}>
        <Text
        style={[typo.Text_14pt,styles.text]}>
          Don't have an acount? 
          <Text style={styles.navButton} 
          onPress={() => {navigation.navigate("SignUpScreen")}}> Create here</Text>
      </Text>
      </View>
      <View style={styles.line}/>
      <View style={styles.SocialsContainer}>
        <SocialBtn Color={"#E74C3C"} SocialName={"Google"} iconType={"google"} onPress={()=>{onGoogleButtonPress()}}/>
        <SocialBtn Color={"#2471A3"} SocialName={"Facebook"} iconType={"facebook-square"} onPress={()=>{}}/>
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