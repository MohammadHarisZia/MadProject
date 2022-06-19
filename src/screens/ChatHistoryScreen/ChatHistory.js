import {View, Text, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ref, onValue, push} from 'firebase/database';

// local imports
import UserChat from '../../components/UserChat/UserChat';
import Options from '../../components/Options/Options';
import UserCall from '../../components/UserCall/UserCall';
import HistoryHeader from '../../components/HistoryHeader/HistoryHeader';
import {users} from '../../../DummyData/users';
import {db} from '../../../Fire';

const ChatScreen = () => {
  const [option, setOption] = useState('chat');
  const [defaultUser, setDefaultUser] = useState(users[1]);
  const [fetchRooms, setFetchRooms] = useState([]);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    return onValue(ref(db, `/chat`), querySnapShot => {
      let data = querySnapShot.val();
      if (data) {
        console.log(Object.values(data).map(room => Object.values(room)));
        setFetchRooms(Object.values(data).map(room => Object.values(room)));
      }
    });
  }, []);

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
            if (user !== defaultUser) {
              return (
                <UserChat user={user} defaultUser={defaultUser} key={user.id} />
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

export default ChatScreen;
