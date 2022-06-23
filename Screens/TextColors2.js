import React, {useEffect} from 'react';
import Typography from '../DesignSystem/Typography';
import {Colors} from '../DesignSystem/Colors';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const TextColors2 = props => {
  useEffect(() => {});
  return (
    <View>
      <TouchableOpacity
        style={styles.flex}
        onPress={() => {
          props.navigation.navigate('ComplaintDesk');
        }}>
        <Text style={[Typography.Header_24pt, {color: Colors.Primary1}]}>
          Complaint
        </Text>
        <Text style={[Typography.Header_24pt, {color: Colors.Primary2}]}>
          Complaint
        </Text>
        <Text style={[Typography.Header_24pt, {color: Colors.Primary3}]}>
          Complaint
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.flex}
        onPress={() => {
          props.navigation.navigate('Finance');
        }}>
        <Text style={[Typography.Header_24pt, {color: Colors.Primary1}]}>
          Hello
        </Text>
        <Text style={[Typography.Header_24pt, {color: Colors.Primary2}]}>
          Hello
        </Text>
        <Text style={[Typography.Header_24pt, {color: Colors.Primary3}]}>
          Hello
        </Text>
      </TouchableOpacity>
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

export default TextColors2;
