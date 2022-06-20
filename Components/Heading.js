import React, {useState, useEffect} from 'react';
import Typography from '../DesignSystem/Typography';
import {Colors} from '../DesignSystem/Colors';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import BackBtn from '../assets/Icons/BackBtn.svg';

import TextColors2 from '../Screens/TextColors2';

const Heading = props => {
  console.log(props.navigate);
  return (
    <View style={styles.flex}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate(props.navigate);
        }}>
        <BackBtn width={40} height={40} fill={Colors.Secondary1} />
      </TouchableOpacity>

      <Text style={[Typography.Header_20pt, styles.heading]}>
        {props.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  heading: {
    color: Colors.MonochromeBlue1000,
    marginRight: 90,
    marginBottom: 6,
  },
});

export default Heading;
