import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

// local imports
import {Colors} from '../../../DesignSystem/Colors';

const UserCall = props => {
  return (
    <View style={styles.container}>
      <View style={styles.callContainer}>
        {/* Call information */}
        <View style={styles.infoContainer}>
          <Text style={styles.userName}>
            {props?.userName ? props?.userName : 'Default User'}
          </Text>
          <Text style={styles.dateTime}>
            {props?.dateTime ? props?.dateTime : 'Yesterday, 00:00'}
          </Text>
        </View>

        {/* Call type icon */}
        <TouchableOpacity style={styles.callType}>
          <Ionicons
            name={props.calltype === 'video' ? 'videocam' : 'call'}
            size={25}
            color={Colors.Ascent3}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserCall;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: Colors.Secondary3,
  },

  callContainer: {
    width: '100%',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },

  userName: {
    fontSize: 24,
    marginBottom: 5,
    fontFamily: 'Inter',
    color: '#484848',
  },

  dateTime: {fontFamily: 'Inter', fontSize: 10, color: '#808080'},
});
