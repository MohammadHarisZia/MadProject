import 'react-native-gesture-handler';
import React from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Header from './Components/Header';
import SignInScreen from './Screens/SignInScreen';
import SignUpScreen from './Screens/SignUpScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { LogBox } from 'react-native';


const Stack = createStackNavigator();

export default function App() {
  LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core and will be removed in a future release."]);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
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
