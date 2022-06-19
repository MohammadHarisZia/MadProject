import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../DesignSystem/AppColors'
import typo from '../DesignSystem/Typography';

const InputText = ({Color,SocialName, iconType,...rest}) => {
  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity {...rest} style={{alignItems:'center'}}>
      <View style={styles.iconStyle}>
        <Icon name={iconType} size={45} color={Color}/>
      </View>
      <Text style={[typo.Text_12pt,styles.text]}>Sign in With {SocialName}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center',
    margin:5
  },
  text:{
    color: Colors.MonochromeBlue1000,
    width:"70%",
    textAlign: 'center',
  }
});
export default InputText;