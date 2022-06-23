import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

// local imports
import {Colors} from '../../../DesignSystem/Colors';

const ChatHeader = props => {
  return (
    <View style={styles.container}>
      {/* Back btn */}
      <TouchableOpacity style={styles.backBtn}>
        <Ionicons name="chevron-back" size={30} color={'#484848'} />
      </TouchableOpacity>

      {/* Receiver name */}
      <Text style={styles.receiver}>
        {props?.user?.userName ? props?.user?.userName : 'default name'}
      </Text>

      {/* Icons */}
      <View style={styles.callControllers}>
        <TouchableOpacity
          style={styles.controller}
          onPress={() => {
            props.makeCall(false);
          }}>
          <Ionicons name="call" size={20} color={'#808080'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controller}
          onPress={() => {
            props.makeCall(true);
          }}>
          <Ionicons name="videocam" size={20} color={'#808080'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.Primary3,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  receiver: {
    fontFamily: 'Inter',
    fontSize: 20,
    color: '#484848',
    // backgroundColor: Colors.Primary1,
    paddingLeft: 30,
  },

  callControllers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  controller: {
    paddingHorizontal: 10,
  },
});
