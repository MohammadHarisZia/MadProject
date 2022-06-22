import 'react-native-gesture-handler';
import React from 'react';
import Typography from './DesignSystem/Typography';
import {Colors} from './DesignSystem/Colors';
import LightTheme from './DesignSystem/LightTheme';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Header from './Components/Header';
import ComplaintDesk from './Screens/ComplaintDesk';
import TextColors2 from './Screens/TextColors2';
import ViewComplaint from './Screens/ViewComplaint';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App({route, navigation}) {
  return (
    <NavigationContainer>
      <Header></Header>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen
          name="TextColors2"
          component={TextColors2}
          navigation={navigation}
        /> */}
        <Stack.Screen
          name="ComplaintDesk"
          component={ComplaintDesk}
          navigation={navigation}
          route={route}
        />
        <Stack.Screen
          name="ViewComplaint"
          component={ViewComplaint}
          navigation={navigation}
          route={route}
        />
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
