import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';

// local imports
import UserChat from '../../components/UserChat/UserChat';
import ChatHeader from '../../components/ChatHeader/ChatHeader';
import Options from '../../components/Options/Options';
import UserCall from '../../components/UserCall/UserCall';

const ChatScreen = () => {
  const [option, setOption] = useState('chat');

  const onPressCall = () => {
    setOption('call');
  };

  const onPressChat = () => {
    setOption('chat');
  };

  return (
    <View style={styles.container}>
      <ChatHeader />
      <Options
        onPressChat={onPressChat}
        onPressCall={onPressCall}
        option={option}
      />
      {option === 'chat' ? (
        <View style={styles.chatContainer}>
          <UserChat />
          <UserChat />
          <UserChat />
          <UserChat />
          <UserChat />
        </View>
      ) : (
        <View style={styles.callContainer}>
          <UserCall />
        </View>
      )}
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

  callContainer: {
    paddingHorizontal: 15,
  },
});

export default ChatScreen;
