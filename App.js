import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

// local imports
import Back from './assets/Icons/back-btn.svg';
import Typography from './DesignSystem/Typography';
import {Colors} from './DesignSystem/Colors';
import LightTheme from './DesignSystem/LightTheme';
import ChatHistory from './src/screens/ChatHistoryScreen/ChatHistory';
import Chat from './src/screens/ChatScreen/Chat';
import OutgoingCall from './src/screens/OutgoingCallScreen/OutgoingCall';
import IncomingCall from './src/screens/IncomingCallScreen/IncomingCall';
import VoiceReceived from './src/screens/VoiceCallScreen/VoiceCall';
import VideoCall from './src/screens/VideoCallScreen/VideoCall';

export default function App() {
  return (
    <View style={LightTheme.Light}>
      {/* <ChatHistory /> */}
      {/* <Chat /> */}
      {/* <OutgoingCall /> */}
      {/* <IncomingCall /> */}
      {/* <VoiceReceived /> */}
      <VideoCall />
    </View>
  );
}
