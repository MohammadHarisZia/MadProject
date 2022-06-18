import 'react-native-gesture-handler';
import React from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Header from './Components/Header';
import SignInScreen from './Screens/SignInScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
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
