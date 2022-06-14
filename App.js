import React from 'react';
import Typography from './DesignSystem/Typography';
import {Colors} from './DesignSystem/Colors';
import LightTheme from './DesignSystem/LightTheme';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Header from './Components/Header';

export default function App() {
  return (
    <View style={LightTheme.Light}>
      <Header></Header>
      <View style={styles.flex}>
        <Text style={[Typography.Header_24pt, {color: Colors.Primary1}]}>
          Hello
        </Text>
        <Text style={[Typography.Header_24pt, {color: Colors.Primary2}]}>
          Hello
        </Text>
        <Text style={[Typography.Header_24pt, {color: Colors.Primary3}]}>
          Hello
        </Text>
      </View>
      <View style={styles.flex}>
        <Text style={[Typography.Header_24pt, {color: Colors.Secondary1}]}>
          Doctor
        </Text>
        <Text style={[Typography.Header_24pt, {color: Colors.Secondary2}]}>
          Doctor
        </Text>
        <Text style={[Typography.Header_24pt, {color: Colors.Secondary3}]}>
          Doctor
        </Text>
      </View>

      <View style={styles.flex}>
        <Text style={[Typography.Header_24pt, {color: Colors.Ascent1}]}>
          Haris
        </Text>
        <Text style={[Typography.Header_24pt, {color: Colors.Ascent2}]}>
          Haris
        </Text>
        <Text style={[Typography.Header_24pt, {color: Colors.Ascent3}]}>
          Haris
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
});
