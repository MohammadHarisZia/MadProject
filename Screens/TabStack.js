import 'react-native-gesture-handler';
import React from 'react';

import {ActivityIndicator,View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import HomeScreen from './HomeScreen';
import FinanceScreen from './FinanceScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../DesignSystem/AppColors';

const Tab =createBottomTabNavigator();

const TabStack = () => {
    return(
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
    )
}
export default TabStack