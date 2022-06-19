import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ref, onValue, push, update} from 'firebase/database';

// local imports
import ChatHeader from '../../components/ChatHeader/ChatHeader';
import Message from '../../components/Message/Message';
// import {messages} from '../../../DummyData/messages';
import {db} from '../../../Fire';
import {DrawerActions} from '@react-navigation/native';

const Chat = ({navigation, route}) => {
  // getting the passed data of the receiver from the parent component
  // const receiver = route.params?.receiver;
  const receiver = route.params?.user;
  const sender = route.params?.defaultUser;

  // console.log(receiver);
  console.log(sender);
  // getting the passed data of the sender from the parent component
  // const sender = route.params?.sender;

  const [message, setMessage] = useState('');
  const [messageAdded, setMessageAdded] = useState(true);
  const [fetchMessages, setFetchMessages] = useState([]);

  const updateReadStatus = data => {
    Object.keys(data).forEach(key => {
      const updates = {};
      updates[
        `/chat/room-${
          sender.id > receiver.id
            ? `${sender.id}${receiver.id}`
            : `${receiver.id}${sender.id}`
        }/-${key}`
      ] = {isRead: true};

      update(db, updates);
    });
  };

  useEffect(() => {
    // console.log(messageAdded, 'useEffect hehe');
    if (messageAdded) {
      return onValue(
        ref(
          db,
          `/chat/room-${
            sender.id > receiver.id
              ? `${sender.id}${receiver.id}`
              : `${receiver.id}${sender.id}`
          }`,
        ),
        querySnapShot => {
          let data = querySnapShot.val() || {};
          updateReadStatus(data);
          setFetchMessages(() => Object.values(data));
          setMessageAdded(false);
        },
      );
    }
  }, [messageAdded]);

  const sendMessage = async () => {
    const res = await push(
      ref(
        db,
        `/chat/room-${
          sender.id > receiver.id
            ? `${sender.id}${receiver.id}`
            : `${receiver.id}${sender.id}`
        }`,
      ),
      {
        senderId: sender.id,
        receiverId: receiver.id,
        message: message,
        messageID: Math.random(),
        date: new Date().toUTCString(),
        isRead: false,
      },
    );
    setMessageAdded(true);
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <ChatHeader receiverName={receiver.displayName} />
      <View style={styles.messagesContainer}>
        {fetchMessages.map(fetchMessage => {
          fetchMessage.isRead = true;
          return (
            <Message
              key={fetchMessage.messageID}
              id={fetchMessage.senderId}
              senderID={sender.id}
              message={fetchMessage.message}
              messageType={fetchMessage.messageType}
            />
          );
        })}
      </View>

      <View style={styles.messageFieldContainer}>
        <TextInput
          style={styles.messageField}
          placeholder="Type something..."
          onChangeText={text => {
            setMessage(text);
          }}
          placeholderTextColor={'#808080'}
          value={message}
        />
        <TouchableOpacity
          style={styles.sendBtn}
          disabled={message.length === 0}
          onPress={sendMessage}>
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
