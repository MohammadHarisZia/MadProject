import React, {useState, useEffect} from 'react';
import Typography from '../DesignSystem/Typography';
import {Colors} from '../DesignSystem/Colors';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const Status = ({navigation, route}) => {
  if (props.status === 'On Hold')
    return (
      <View>
        <Text
          style={[
            styles.text,
            Typography.Header_14pt,
            {marginTop: 10, marginRight: 25, width: 70},
          ]}>
          {props.status}
        </Text>
      </View>
    );
  else if (props.status === 'In Progress')
    return (
      <View>
        <Text
          style={[
            styles.text,
            Typography.Header_14pt,
            {marginTop: 10, marginRight: 25, width: 70},
          ]}>
          {props.status}
        </Text>
      </View>
    );
  else if (props.status === 'Reviewed')
    return (
      <View>
        <Text
          style={[
            styles.text,
            Typography.Header_14pt,
            {marginTop: 10, marginRight: 25, width: 70},
          ]}>
          {props.status}
        </Text>
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

export default Status;
