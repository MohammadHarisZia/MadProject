import React, {useState, useEffect, useRef} from 'react';
import Typography from '../DesignSystem/Typography';
import {Colors} from '../DesignSystem/Colors';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import Heading from '../Components/Heading';
import ComplaintDeskBar from '../Components/ComplaintDeskBar';
import AddMoreBtn from '../Components/AddMoreBtn';

import DropDown from '../assets/Icons/DropDown.svg';
import SearchIcon from '../assets/Icons/Search.svg';

import ComplaintCart from '../Components/ComplaintCart';

const ComplaintDesk = (props, {navigation, route}) => {
  return (
    <View style={styles.container}>
      <Heading></Heading>
      <ComplaintDeskBar></ComplaintDeskBar>
      <AddMoreBtn></AddMoreBtn>
      <ComplaintCart
        ticketID={10}
        complaint="I lost my dog and i hate it here"
        status="On Hold"></ComplaintCart>
      <ComplaintCart
        ticketID={10}
        complaint="I lost my dog and i hate it here"
        status="Reviewed"></ComplaintCart>
      <ComplaintCart
        ticketID={10}
        complaint="I lost my dog and i hate it here"
        status="In Progress"></ComplaintCart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  },
  bar: {
    marginLeft: 10,
    width: 340,
  },
});

export default ComplaintDesk;
