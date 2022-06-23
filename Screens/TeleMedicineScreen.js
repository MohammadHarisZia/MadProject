import React,{useEffect,useState} from 'react';
import typo from '../DesignSystem/Typography';
import {Colors} from '../DesignSystem/AppColors';

import {View, Text, StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native';

import Header from '../Components/Header';

const TeleMedicineScreen = ({navigation}) => {
  return (
    <>
    <Header navigation={navigation}/>
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[typo.Header_24pt,styles.header]}>Hello,Doctor</Text>
      </View>
    </View>
    </>
    )
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    zIndex:-10,
    height:"93%",
    backgroundColor: "#F2F3F4",
  },
  headerContainer: {
    margin:20,
    width: "100%",
  },
  header: {
    color: Colors.MonochromeBlue900,
    marginBottom: 10,
  },

});

export default TeleMedicineScreen;
