import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

// local imports
import LightTheme from './DesignSystem/LightTheme';
import StackNavigator from './src/navigation/StackNavigator';

export default function App() {
  return (
    <View style={LightTheme.Light}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </View>
  );
}
