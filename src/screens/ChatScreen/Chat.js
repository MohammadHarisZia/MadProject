import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

// local imports
import {Colors} from '../../../DesignSystem/Colors';
import ChatHeader from '../../components/ChatHeader/ChatHeader';
import Message from '../../components/Message/Message';
import {messages} from '../../../DummyData/messages';

const Chat = () => {
  return (
    <View style={styles.container}>
      <ChatHeader />
      <View style={styles.messagesContainer}>
        <Message
          message={messages[0].message}
          messageType={messages[0].messageType}
        />
        <Message
          message={messages[1].message}
          messageType={messages[1].messageType}
        />
        <Message
          message={messages[2].message}
          messageType={messages[2].messageType}
        />
      </View>

      <View style={styles.messageFieldContainer}>
        <TextInput
          style={styles.messageField}
          placeholder="Type something..."
          onChangeText={() => {}}
          placeholderTextColor={'#808080'}
        />
        <TouchableOpacity style={styles.sendBtn}>
          <Ionicons name="send" color="#484848" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  messagesContainer: {
    paddingTop: 20,
  },

  messageFieldContainer: {
    width: '90%',
    backgroundColor: '#eeeeee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
    zIndex: 2,
  },

  messageField: {
    width: '80%',
    height: '100%',
    color: '#484848',
  },
});
