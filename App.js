import 'react-native-gesture-handler';
import React from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';


import SignInScreen from './Screens/SignInScreen';
import SignUpScreen from './Screens/SignUpScreen';
import HomeScreen from './Screens/HomeScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { LogBox } from 'react-native';

import auth from './firebase'

const Stack = createStackNavigator();

export default function App() {
  LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core and will be removed in a future release."]);
  const [user, setUser] = React.useState();
  
  
  const onAuthStateChange=(User) => {
    if (User) {
      console.log(User.uid," ",User.email);
       setUser(User)
    } else {
      console.log('not logged in');
    }
  }
  React.useEffect(() => {
     auth.onAuthStateChanged(onAuthStateChange);
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
        <React.Fragment>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </React.Fragment>): 
        (<React.Fragment>
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          </React.Fragment>)
        }
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
