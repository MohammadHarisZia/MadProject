import React, {useState, useEffect} from 'react';
import Typography from '../DesignSystem/Typography';
import {Colors} from '../DesignSystem/Colors';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import PlusIcon from '../assets/Icons/PlusIcon';

const AddMoreBtn = (props, {navigation, route}) => {
  return (
    <TouchableOpacity style={[styles.flex, styles.btn]} onPress={props.click}>
      <Text style={{color: Colors.MonochromeBlue100}}>Add More</Text>
      <PlusIcon
        width={30}
        height={30}
        fill={Colors.MonochromeBlue100}></PlusIcon>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    marginTop: 20,
    backgroundColor: Colors.Secondary3,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 8,
    marginLeft: 200,
  },
});

export default AddMoreBtn;
