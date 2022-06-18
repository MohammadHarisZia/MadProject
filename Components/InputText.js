import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../DesignSystem/Colors'
import typo from '../DesignSystem/Typography';

const InputText = ({labelValue, placeholderText, iconType, ...rest}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <Icon name={iconType} size={25} color={Colors.MonochromeBlue700} />
      </View>
      <TextInput
        value={labelValue}
        style={[typo.Text_14pt,styles.input]}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor={Colors.MonochromeBlue300}
        {...rest}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 10,
    marginBottom: 20,
    width: '80%',
    height: 65,
    borderColor: Colors.MonochromeGreen200,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "white",
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    color: Colors.MonochromeBlue900,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default InputText;