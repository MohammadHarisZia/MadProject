import React from 'react';
import Typography from '../DesignSystem/Typography';
import {Colors} from '../DesignSystem/Colors';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const TextColors = ({navigation, route}) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.flex}
        onPress={() => {
          navigation.navigate('TextColors2');
        }}>
        <Text style={[Typography.Header_24pt, {color: Colors.Secondary1}]}>
          Doctor
        </Text>
        <Text style={[Typography.Header_24pt, {color: Colors.Secondary2}]}>
          Doctor
        </Text>
        <Text style={[Typography.Header_24pt, {color: Colors.Secondary3}]}>
          Doctor
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

export default TextColors;
