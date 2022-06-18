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


const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

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
            <TouchableOpacity style={styles.button}>
                <Text style={[typo.Text_14pt,styles.buttonText]}>Login</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.signUpContainer}>
        <Text
        style={[typo.Text_14pt,styles.text]}>
          Don't have an acount? 
          <Text style={styles.navButton} 
          onPress={() => {}}> Create here</Text>
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