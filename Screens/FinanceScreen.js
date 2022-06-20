import React from 'react';
import Typography from '../DesignSystem/Typography';
import {Colors} from '../DesignSystem/AppColors';
import LightTheme from '../DesignSystem/LightTheme';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import PakMedicLogo from '../assets/Icons/PakMedicLogo';
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '../Components/Header';

const FinanceScreen = ({navigation}) => {
  return (
    <>
    <Header/>
    <View style={styles.flex}>
    <Text style={{color:"black"}}>Finance</Text>
    </View>
    </>
      
  );
};

const styles = StyleSheet.create({
    flex: {
        height:"100%",
        width:"100%",
        flex:1,
        alignItems: 'center',
      },
});

export default FinanceScreen;
