import {View, Text, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ref, onValue, push} from 'firebase/database';
import {Voximplant} from 'react-native-voximplant';

// local imports
import UserChat from '../../components/UserChat/UserChat';
import Options from '../../components/Options/Options';
import UserCall from '../../components/UserCall/UserCall';
import HistoryHeader from '../../components/HistoryHeader/HistoryHeader';
import {users} from '../../../DummyData/users';
import {db} from '../../../Fire';
import {voximplant, showError, convertCodeMessage, login} from '../../../Vox';

const ChatHistory = ({navigation, route}) => {
  const [option, setOption] = useState('chat');
  const id = route.params?.uID;
  const loggedUser = users[id];
  const [fetchRooms, setFetchRooms] = useState([]);

  let latestMessage = '';
  let latestMessageTime = '';
  let latestMessageReadStatus = true;

  /*******************************CODE SEGMENT FOR THE CALLING FUNCTIONALITY SUCH AS INSTANTIATION*********/
  // THIS ENTIRE SEGMENT WILL BE MOVED TO THE HOME SCREEN ONCE MERGED.

  // onComponentMount useEffect to connect to the voximplant, get the client state, log in the user
  useEffect(() => {
    // function to connect and login the user to the voximplant sdk
    login(loggedUser.userName, loggedUser.password);
  }, [loggedUser]);

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

  // onComponentDidMount event to get the data from the database
  useEffect(() => {
    return onValue(ref(db, `/chat`), querySnapShot => {
      let data = querySnapShot.val();
      if (data) {
        setFetchRooms(Object.values(data).map(room => Object.values(room)));
      }
    });
  }, []);

  /**************************************VOXIMPLANT CODE ENDING************************ */

  // function to convert date into time
  const getTime = date => {
    return (
      date.split(' ')[4].split(':')[0] + ':' + date.split(' ')[4].split(':')[1]
    );
  };

  // function to get the latest message information such as time, read status, message payload etc.
  const getLatestMessageInfo = user => {
    for (let i = 0; i < fetchRooms.length; i++) {
      const lastMessageIndex = fetchRooms[i].length - 1;
      if (
        fetchRooms[i][lastMessageIndex].receiverId === loggedUser.id &&
        fetchRooms[i][lastMessageIndex].senderId === user.id
      ) {
        latestMessage = fetchRooms[i][lastMessageIndex].message;
        latestMessageTime = getTime(fetchRooms[i][lastMessageIndex].date);
        latestMessageReadStatus = fetchRooms[i][lastMessageIndex].isRead;
        break;
      } else if (
        fetchRooms[i][lastMessageIndex].senderId === loggedUser.id &&
        fetchRooms[i][lastMessageIndex].receiverId === user.id
      ) {
        latestMessage = 'You: ' + fetchRooms[i][lastMessageIndex].message;
        latestMessageTime = getTime(fetchRooms[i][lastMessageIndex].date);
        latestMessageReadStatus = true;
        break;
      } else {
        latestMessage = 'click to start a conversation';
        latestMessageTime = '';
        latestMessageReadStatus = true;
      }
    }
    return;
  };

  const onPressCall = () => {
    setOption('call');
  };

  const onPressChat = () => {
    setOption('chat');
  };

  return (
    <View style={styles.container}>
      <HistoryHeader />
      <Options
        onPressChat={onPressChat}
        onPressCall={onPressCall}
        option={option}
      />
      {option === 'chat' ? (
        <View style={styles.chatContainer}>
          {users.map(user => {
            if (user !== loggedUser) {
              getLatestMessageInfo(user);
              return (
                <UserChat
                  user={user}
                  loggedUser={loggedUser}
                  key={user.id}
                  recent={latestMessage}
                  time={latestMessageTime}
                  isRead={latestMessageReadStatus}
                />
              );
            }
          })}
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

export default ChatHistory;
