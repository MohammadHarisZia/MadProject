import React, {useState, useEffect} from 'react';
import Typography from '../DesignSystem/Typography';
import {Colors} from '../DesignSystem/Colors';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const template = ({navigation, route}) => {
  return (
    <View>
      <Text style={{color: 'black'}}>template</Text>
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

export default template;
