import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ref, onValue, push, update} from 'firebase/database';
import {Voximplant} from 'react-native-voximplant';
import AsyncStorage from '@react-native-async-storage/async-storage';

// local imports
import ChatHeader from '../../components/ChatHeader/ChatHeader';
import Message from '../../components/Message/Message';
import {db} from '../../../Fire';
import {requestPermissions, voximplant} from '../../../Vox';

const Chat = ({navigation, route}) => {
  // getting the passed data of the user from the parent component
  // const [user, setUser] = useState([]);
  const user = route.params?.user;
  const loggedUser = route.params?.loggedUser;

  console.log(loggedUser);

  const [message, setMessage] = useState('');
  const [messageAdded, setMessageAdded] = useState(true);
  const [fetchMessages, setFetchMessages] = useState([]);
  const [readMessages, setReadMessages] = useState(true);

  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [videoCall, setVideoCall] = useState(false);

  // // onComponentMount hook to get the user from asyncStorage
  // useEffect(() => {
  //   // function to get the user
  //   const getData = async () => {
  //     try {
  //       const jsonUser = await AsyncStorage.getItem('user');
  //       console.log('HEHE', jsonUser);
  //       const userObject = await JSON.parse(jsonUser);
  //       console.log('get data method', userObject);
  //       return jsonUser;
  //     } catch (e) {
  //       Alert.alert(e.message, 'failed to get the user from async storage', [
  //         {
  //           text: 'OK',
  //           onPress: () => {
  //             navigation.navigate('History', {uID: loggedUser.id});
  //           },
  //         },
  //         {
  //           text: 'RETRY',
  //           onPress: () => {
  //             getData();
  //           },
  //         },
  //       ]);
  //     }
  //   };

  //   const data = getData();
  //   console.log('outside', data);
  //   setUser(data);
  // }, []);

  /**CALLING FUNCTIONALITIES SECTION*/

  // makeCall function to call the user and get the device permissions from the user
  const makeCall = isVideoCall => {
    setPermissionsGranted(requestPermissions(isVideoCall));
    setVideoCall(isVideoCall);
  };

  // onComponentUpdate event based on the state of setPermissionsGranted Hook to make a call or not
  useEffect(() => {
    console.log(videoCall);
    if (permissionsGranted) {
      navigation.navigate('Calling', {
        isVideoCall: videoCall,
        user: user,
        isIncomingCall: false,
        loggedUser: loggedUser,
      });
    } else {
      console.log('permissions not granted');
    }
  }, [permissionsGranted]);

  // THIS PIECE OF CODE WILL BE USED EVERYWHERE
  // onComponentDidMount and onComponentUpdate event useEffect to constantly check if there is an incoming call
  useEffect(() => {
    //navigate to the incoming call screen if the
    voximplant.on(Voximplant.ClientEvents.IncomingCall, incomingCallEvent => {
      navigation.navigate('IncomingCall', {
        call: incomingCallEvent.call,
        callee: loggedUser,
      });
    });

    return () => {
      voximplant.off(Voximplant.ClientEvents.IncomingCall);
    };
  });

  /*----------------------------------------------------------------*/

  // function to update the read status of the message in the database
  const updateReadStatus = data => {
    Object.keys(data).forEach(key => {
      const updates = {};
      updates[
        `/chat/room-${
          loggedUser.id > user.id
            ? `${loggedUser.id}${user.id}`
            : `${user.id}${loggedUser.id}`
        }/` + key
      ] = {
        ...data[key],
        isRead:
          data[key].receiverId === loggedUser.id ? true : data[key].isRead,
      };

      update(ref(db), updates);
    });
  };

  // onComponentDidMount event to get all the messages from a specific room and populate the state with the data
  useEffect(() => {
    // console.log('USER EFFCET', user);

    if (messageAdded) {
      return onValue(
        ref(
          db,
          `/chat/room-${
            loggedUser.id > user.id
              ? `${loggedUser.id}${user.id}`
              : `${user.id}${loggedUser.id}`
          }`,
        ),
        querySnapShot => {
          let data = querySnapShot.val() || {};
          if (readMessages) updateReadStatus(data);
          setFetchMessages(() => Object.values(data));
          setMessageAdded(false);
          setReadMessages(false);
        },
      );
    }
  }, [messageAdded]);

  // send message function to store the message on the database
  const sendMessage = async () => {
    const res = await push(
      ref(
        db,
        `/chat/room-${
          loggedUser.id > user.id
            ? `${loggedUser.id}${user.id}`
            : `${user.id}${loggedUser.id}`
        }`,
      ),
      {
        loggedUserId: loggedUser.id,
        receiverId: user.id,
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
      <ChatHeader user={user} loggedUser={loggedUser} makeCall={makeCall} />
      <View style={styles.messagesContainer}>
        {fetchMessages.map(fetchMessage => {
          fetchMessage.isRead = true;
          // console.log(fetchMessage);
          return (
            <Message
              key={fetchMessage.messageID}
              id={fetchMessage.senderId}
              senderID={loggedUser.id}
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
