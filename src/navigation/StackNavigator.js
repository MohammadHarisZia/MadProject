import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// local imports
import ChatHistory from '../screens/ChatHistoryScreen/ChatHistory';
import Chat from '../screens/ChatScreen/Chat';
import OutgoingCall from '../screens/OutgoingCallScreen/OutgoingCall';
import IncomingCall from '../screens/IncomingCallScreen/IncomingCall';
import VoiceReceived from '../screens/VoiceCallScreen/VoiceCall';
import VideoCall from '../screens/VideoCallScreen/VideoCall';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="History" component={ChatHistory} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigator;
