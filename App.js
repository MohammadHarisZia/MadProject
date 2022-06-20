import 'react-native-gesture-handler';
import React from 'react';

import {ActivityIndicator,View, Text, StyleSheet, TouchableOpacity} from 'react-native';


import SignInScreen from './Screens/SignInScreen';
import SignUpScreen from './Screens/SignUpScreen';
import HomeScreen from './Screens/HomeScreen';
import FinanceScreen from './Screens/FinanceScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LogBox } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from './DesignSystem/AppColors';

import { AuthContext } from './Components/context';

import auth from './firebase'

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

export default function App() {
  LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core and will be removed in a future release."]);

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
      console.log('user token: ', userToken);
    },
  }), []);

  React.useEffect(() => {
    setTimeout(() => {
      auth.onAuthStateChanged(user => {
        if (user) {
          setUserToken(user.uid);
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
    <NavigationContainer>
    { userToken !== null ? 
    (
      <Tab.Navigator screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeScreen') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (route.name === 'FinanceScreen') {
            iconName = focused ? 'card' : 'card-outline';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} style={{margin: 2}}/>;
        },
        tabBarActiveTintColor: Colors.Secondary1,
          tabBarInactiveTintColor: Colors.Secondary1,
          tabBarActiveBackgroundColor: Colors.Primary1,
          tabBarInactiveBackgroundColor: Colors.Primary1,

          tabBarLabel: ()=>{
            if(route.name === 'HomeScreen'){
              return(
                <Text style={{margin:2,fontSize:12,color:Colors.Secondary1}}>Home</Text>
              )
            }else if(route.name === 'FinanceScreen'){
              return(
                <Text style={{margin:2,fontSize:12,color:Colors.Secondary1}}>Finance</Text>
              )
            }
          },
          tabBarStyle: {
            height: 50,
          },
        })}>

        <Tab.Screen name="HomeScreen" component={HomeScreen} /> 
        <Tab.Screen name="FinanceScreen" component={FinanceScreen} /> 

      </Tab.Navigator>
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
