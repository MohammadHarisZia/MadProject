import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

// local imports
import {Colors} from '../../../DesignSystem/Colors';

const UserChat = props => {
  return (
    <View style={styles.container}>
      <View style={styles.chatContainer}>
        {/* User information container to diplay username and the recent message */}
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>
            {props?.username ? props?.username : 'Default user'}
          </Text>
          <Text style={styles.recentMessage}>
            {props?.recent ? props?.recent : 'This is a message'}
          </Text>
        </View>

        {/* Time and new message indicator */}
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{props?.time ? props?.time : '00:00'}</Text>
          <View style={styles.notification} />
        </View>
      </View>

      {/* Seperator */}
    </View>
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
