import React, {useState, useEffect} from 'react';
import Typography from '../DesignSystem/Typography';
import {Colors} from '../DesignSystem/Colors';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {ref, onValue, push, update, remove} from 'firebase/database';

import {db} from '../Firebase';

const DbOperations = ({navigation, route}) => {
  useEffect(() => {});
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

export default DbOperations;
