import React, {useState, useEffect} from 'react';
import Typography from '../DesignSystem/Typography';
import {Colors} from '../DesignSystem/Colors';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import Heading from '../Components/Heading';

import DropDown from '../assets/Icons/DropDown.svg';
import SearchIcon from '../assets/Icons/Search.svg';

const ComplaintDeskBar = ({navigation, route}) => {
  return (
    <View style={[styles.bar, styles.flex]}>
      <TouchableOpacity style={[styles.flex, styles.touch, {width: 130}]}>
        <Text
          style={[Typography.Text_14pt, {color: Colors.MonochromeBlue1000}]}>
          All
        </Text>
        <DropDown
          width={20}
          height={20}
          fill={Colors.MonochromeBlue1000}></DropDown>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.flex, styles.touch, {width: 170}]}>
        <Text
          style={[Typography.Text_14pt, {color: Colors.MonochromeBlue1000}]}>
          Search
        </Text>
        <SearchIcon
          width={15}
          height={15}
          fill={Colors.MonochromeBlue1000}></SearchIcon>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    color: Colors.MonochromeBlue1000,
    marginRight: 90,
    marginBottom: 6,
  },
  touch: {
    backgroundColor: Colors.MonochromeBlue300,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.MonochromeBlue500,
  },
  bar: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    width: '100%',
    backgroundColor: Colors.MonochromeGreen200,
  },
});

export default ComplaintDeskBar;
