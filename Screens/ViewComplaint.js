import React, {useState, useEffect} from 'react';
import Typography from '../DesignSystem/Typography';
import {Colors} from '../DesignSystem/Colors';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import Heading from '../Components/Heading';

const ViewComplaint = props => {
  const {ticketID} = props.route?.params || {};
  console.log(props.route.params);
  return (
    <View>
      <Heading
        title={`Ticket # ${ticketID}`}
        navigation={props.navigation}
        navigate="ComplaintDesk"></Heading>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
});

export default ViewComplaint;
