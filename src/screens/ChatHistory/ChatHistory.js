import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

// local imports
import UserChat from '../../components/UserChat/UserChat';
import ChatHeader from '../../components/ChatHeader/ChatHeader';

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <ChatHeader />
      <View style={styles.chatContainer}>
        <UserChat />
        <UserChat />
        <UserChat />
        <UserChat />
        <UserChat />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  chatContainer: {
    paddingHorizontal: 15,
  },
});

export default ChatScreen;
