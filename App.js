import 'react-native-gesture-handler';
import React from 'react';

import {ActivityIndicator,View, Text, StyleSheet, TouchableOpacity} from 'react-native';


import SignInScreen from './Screens/SignInScreen';
import SignUpScreen from './Screens/SignUpScreen';
import TabStack from './Screens/TabStack';
import ProfileScreen from './Screens/ProfileScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { LogBox } from 'react-native';
import {Colors} from './DesignSystem/AppColors';

import { AuthContext } from './Components/context';

//import auth from './firebase'

import Auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

export default function App() {
  LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core and will be removed in a future release.",
"Can't perform a React state update on an unmounted component."]);

  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  
  const authContext = React.useMemo(() => ({
    signIn: (foundUser) => {
      setUserToken(foundUser);
      //setIsLoading(false);
      console.log('user token: ', userToken);
    },
    signOut: () => {
      setUserToken(null);
      //setIsLoading(false);
      console.log("User SignedOut");
    },
    signUp: (CreatedUser) => {
      setUserToken(CreatedUser);
      //setIsLoading(false);
      //console.log('user token: ', userToken.uid);
    },
  }), []);

  React.useEffect(() => {
    setTimeout(() => {
      Auth().onAuthStateChanged(user => {
        if (user) {
          setUserToken(user.uid)
          console.log("Logged In User:",user.email)
        }
      })
      setIsLoading(false);
    }, 1500);
  }, []);

  if( isLoading ) {
      return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator size="large"/>
        </View>
      );
    }
  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer >
    { userToken !== null ? 
    (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="TabStack" component={TabStack} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen}/>
      </Stack.Navigator>
      ): (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        </Stack.Navigator>
      )
    }
    </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
});
