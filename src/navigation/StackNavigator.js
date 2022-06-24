import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// local imports
import ChatHistory from '../screens/ChatHistoryScreen/ChatHistory';
import Chat from '../screens/ChatScreen/Chat';
import Calling from '../screens/CallingScreen/Calling';
import IncomingCall from '../screens/IncomingCallScreen/IncomingCall';
import VoiceCall from '../screens/VoiceCallScreen/VoiceCall';
import VideoCall from '../screens/VideoCallScreen/VideoCall';
import Login from '../screens/login/login';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="History" component={ChatHistory} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Calling" component={Calling} />
        <Stack.Screen name="IncomingCall" component={IncomingCall} />
        <Stack.Screen name="VoiceCall" component={VoiceCall} />
        <Stack.Screen name="VideoCall" component={VideoCall} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigator;
