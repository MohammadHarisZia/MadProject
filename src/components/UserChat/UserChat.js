import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

// local imports
import {styles} from './styles';

const UserChat = props => {
  return (
    <View style={styles.container}>
      <View style={styles.chatContainer}>
        {/* User information container to diplay username and the recent message */}
        <View style={styles.userInfoContainer}>
          <Text style={styles.username}>
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

export default UserChat;
