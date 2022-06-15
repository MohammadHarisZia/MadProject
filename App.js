import React from 'react';
import Typography from './DesignSystem/Typography';
import {Colors} from './DesignSystem/Colors';
import LightTheme from './DesignSystem/LightTheme';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Back from './assets/Icons/back-btn.svg';

import ChatHistory from './src/screens/ChatHistory/ChatHistory';

export default function App() {
  return (
    <View style={LightTheme.Light}>
      <ChatHistory />
    </View>
  );
}
