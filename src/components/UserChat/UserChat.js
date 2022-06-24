import {View, TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// local imports
import {Colors} from '../../../DesignSystem/Colors';

const UserChat = props => {
  // initializing navigation instance to navigate to the chat screen
  const navigation = useNavigation();

  // fetching data from the props
  const {loggedUser, user, recent, isRead, time} = props;


  const openChat = async () => {
    // const stored = await storeData();

    navigation.navigate('Chat', {
      loggedUser: loggedUser,
      user: user,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={openChat}>
      <View style={styles.chatContainer}>
        {/* User information container to diplay displayName and the recent message */}
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>
            {user?.displayName ? user?.displayName : 'Default user'}
          </Text>
          <Text style={styles.recentMessage}>
            {recent ? recent : 'This is a message'}
          </Text>
        </View>

        {/* Time and new message indicator */}
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{time ? time : '00:00'}</Text>
          {isRead === false && <View style={styles.notification} />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: Colors.Secondary3,
  },

  chatContainer: {
    width: '100%',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },

  userName: {
    fontSize: 24,
    marginBottom: 5,
    fontFamily: 'Inter',
    color: '#484848',
  },

  recentMessage: {fontFamily: 'Inter', fontSize: 10, color: '#808080'},

  time: {
    fontFamily: 'Inter',
    fontSize: 15,
    marginBottom: 12,
    color: '#808080',
  },

  notification: {
    width: 10,
    height: 10,
    borderRadius: 15,
    backgroundColor: Colors.Ascent1,
    alignSelf: 'flex-end',
  },
});

export default UserChat;
