import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';

const OutgoingCall = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn}>
        <Ionicons name="chevron-back" size={30} color={'#484848'} />
      </TouchableOpacity>
      <View style={styles.userInfo}>
        <Text style={styles.username}>
          {props?.username ? props?.username : 'Default user'}
        </Text>
        <Text style={styles.ringing}>Ringing....</Text>
      </View>
      <View style={styles.hangupContainer}>
        <TouchableOpacity style={styles.hangup}>
          <Material name="call-end" size={30} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OutgoingCall;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backBtn: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 2,
  },

  userInfo: {
    backgroundColor: '#eeeeee',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  username: {
    color: '#484848',
    fontFamily: 'Inter',
    fontSize: 32,
    textAlign: 'center',
    // marginVertical: "auto"
  },

  ringing: {
    color: '#808080',
    padding: 20,
    fontFamily: 'Inter',
    fontSize: 20,
  },

  hangupContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  hangup: {
    padding: 20,
    backgroundColor: '#990000',
    borderRadius: 50,
  },
});
