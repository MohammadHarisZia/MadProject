import 'react-native-gesture-handler';
import React from 'react';
import Typography from './DesignSystem/Typography';
import {Colors} from './DesignSystem/Colors';
import LightTheme from './DesignSystem/LightTheme';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Header from './Components/Header';
import TextColors from './Screens/TextColors';
import TextColors2 from './Screens/TextColors2';
import ComplaintDesk from './Screens/ComplaintDesk';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Header></Header>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="ComplaintDesk" component={ComplaintDesk} />
        <Stack.Screen name="TextColors" component={TextColors} />
        <Stack.Screen name="TextColors2" component={TextColors2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
});
