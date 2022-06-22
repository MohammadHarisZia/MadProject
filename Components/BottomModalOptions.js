import React, {useState, useEffect} from 'react';
import Typography from '../DesignSystem/Typography';
import {Colors} from '../DesignSystem/Colors';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const BottomModalOptions = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text
        style={[Typography.Header_20pt, styles.text, {textAlign: 'center'}]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: Colors.MonochromeGreen300,
    borderRadius: 5,
    width: 330,
    marginTop: 20,
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  text: {
    color: Colors.MonochromeBlue1000,
    margin: 20,
  },
});
export default BottomModalOptions;
